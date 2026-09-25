import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../libs/prisma/prisma.service';
import {
    CreateCustomerDto,
    CustomerQueryDto,
    SyncUserDataDto,
    UpdateCustomerDto,
    AddressDto,
    UpdateAddressDto,
    CreateNoteDto,
    CustomerPreferenceDto,
    UpdateNoteDto,
} from './dto/customer.dto';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from './generated/prisma';

@Injectable()
export class CustomerService {
    private readonly logger = new Logger(CustomerService.name);

    constructor(private readonly prisma: PrismaService) { }

    // ============================================
    // CUSTOMER CRUD
    // ============================================

    async createCustomer(dto: CreateCustomerDto) {
        try {
            // Check if customer already exists
            const existing = await this.prisma.customer.findUnique({
                where: { userId: dto.userId },
            });

            if (existing) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'Customer already exists for this user',
                    error: 'Bad Request',
                });
            }

            // Check if email already exists
            const existingEmail = await this.prisma.customer.findFirst({
                where: { email: dto.email },
            });

            if (existingEmail) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'Customer with this email already exists',
                    error: 'Bad Request',
                });
            }

            const customer = await this.prisma.customer.create({
                data: {
                    userId: dto.userId,
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    phone: dto.phone,
                    avatar: dto.avatar,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                    gender: dto.gender,
                    language: dto.language || 'en',
                    timezone: dto.timezone || 'UTC',
                    currency: dto.currency || 'KES',
                    // Create default preferences
                    preferences: {
                        create: {
                            emailNotifications: true,
                            smsNotifications: false,
                            pushNotifications: true,
                            marketingEmails: true,
                            dataSharingConsent: true,
                            cookieConsent: true,
                            preferredCategories: [],
                            preferredBrands: [],
                        },
                    },
                },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                    },
                },
            });

            // Log activity
            await this.logActivity({
                customerId: customer.id,
                action: 'CUSTOMER_CREATED',
                resource: 'CUSTOMER',
                resourceId: customer.id,
                metadata: {
                    email: customer.email,
                    source: 'api',
                },
            });

            this.logger.log(`Customer created: ${customer.id} for user ${customer.userId}`);
            return customer;
        } catch (error) {
            this.logger.error('Error creating customer:', error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to create customer',
                error: 'Internal Server Error',
            });
        }
    }

    async createCustomerFromAuthData(data: {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        phone?: string;
    }) {
        try {
            // Check if customer already exists
            const existing = await this.prisma.customer.findUnique({
                where: { userId: data.userId },
            });

            if (existing) {
                // Update if exists
                return this.syncUserData(data);
            }

            const customer = await this.prisma.customer.create({
                data: {
                    userId: data.userId,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    language: 'en',
                    timezone: 'UTC',
                    currency: 'KES',
                    preferences: {
                        create: {
                            emailNotifications: true,
                            smsNotifications: false,
                            pushNotifications: true,
                            marketingEmails: true,
                            dataSharingConsent: true,
                            cookieConsent: true,
                            preferredCategories: [],
                            preferredBrands: [],
                        },
                    },
                },
                include: {
                    preferences: true,
                },
            });

            this.logger.log(`Customer auto-created from auth: ${customer.id} for user ${data.userId}`);

            await this.logActivity({
                customerId: customer.id,
                action: 'CUSTOMER_CREATED',
                resource: 'AUTH',
                resourceId: customer.id,
                metadata: {
                    email: data.email,
                    source: 'auth_verification',
                },
            });

            return customer;
        } catch (error) {
            this.logger.error('Error creating customer from auth data:', error);
            throw error;
        }
    }

    async syncUserData(data: SyncUserDataDto) {
        try {
            const customer = await this.prisma.customer.update({
                where: { userId: data.userId },
                data: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                },
            });

            this.logger.log(`Customer synced for user ${data.userId}`);
            return customer;
        } catch (error) {
            this.logger.error('Error syncing user data:', error);
            return null;
        }
    }

    async findAllCustomers(query: CustomerQueryDto) {
        try {
            const {
                search,
                loyaltyTier,
                isActive,
                sortBy = 'createdAt',
                sortOrder = 'desc',
                page = 1,
                limit = 20,
            } = query;

            const where: Prisma.CustomerWhereInput = {};

            if (search) {
                where.OR = [
                    { email: { contains: search, mode: 'insensitive' } },
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                ];
            }

            if (loyaltyTier) {
                where.loyaltyTier = loyaltyTier;
            }

            if (isActive !== undefined) {
                where.isActive = isActive;
            }

            const orderBy: Prisma.CustomerOrderByWithRelationInput = {};
            orderBy[sortBy] = sortOrder;

            const skip = (page - 1) * limit;

            const [customers, total] = await Promise.all([
                this.prisma.customer.findMany({
                    where,
                    orderBy,
                    skip,
                    take: limit,
                    include: {
                        preferences: true,
                        _count: {
                            select: {
                                addresses: true,
                                communications: true,
                                notes: true,
                                activities: true,
                            },
                        },
                    },
                }),
                this.prisma.customer.count({ where }),
            ]);

            return {
                data: customers,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            this.logger.error('Error finding customers:', error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch customers',
                error: 'Internal Server Error',
            });
        }
    }

    async findCustomerById(id: string) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { id },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                        orderBy: { isDefault: 'desc' },
                    },
                    _count: {
                        select: {
                            addresses: true,
                            communications: true,
                            notes: true,
                            activities: true,
                        },
                    },
                },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            return customer;
        } catch (error) {
            this.logger.error(`Error finding customer ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch customer',
                error: 'Internal Server Error',
            });
        }
    }

    async findCustomerByUserId(userId: string) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { userId },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                        orderBy: { isDefault: 'desc' },
                    },
                    _count: {
                        select: {
                            addresses: true,
                            communications: true,
                            notes: true,
                            activities: true,
                        },
                    },
                },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            return customer;
        } catch (error) {
            this.logger.error(`Error finding customer by userId ${userId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch customer',
                error: 'Internal Server Error',
            });
        }
    }

    async findCustomerByEmail(email: string) {
        try {
            const customer = await this.prisma.customer.findFirst({
                where: { email },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                        orderBy: { isDefault: 'desc' },
                    },
                },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            return customer;
        } catch (error) {
            this.logger.error(`Error finding customer by email ${email}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch customer',
                error: 'Internal Server Error',
            });
        }
    }

    async updateCustomer(id: string, dto: UpdateCustomerDto) {
        try {
            const existing = await this.prisma.customer.findUnique({
                where: { id },
            });

            if (!existing) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            const customer = await this.prisma.customer.update({
                where: { id },
                data: {
                    avatar: dto.avatar,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                    gender: dto.gender,
                    language: dto.language,
                    timezone: dto.timezone,
                    currency: dto.currency,
                    isActive: dto.isActive,
                },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                    },
                },
            });

            await this.logActivity({
                customerId: customer.id,
                action: 'CUSTOMER_UPDATED',
                resource: 'CUSTOMER',
                resourceId: customer.id,
                metadata: {
                    updatedFields: Object.keys(dto),
                },
            });

            this.logger.log(`Customer updated: ${customer.id}`);
            return customer;
        } catch (error) {
            this.logger.error(`Error updating customer ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update customer',
                error: 'Internal Server Error',
            });
        }
    }

    async deleteCustomer(id: string) {
        try {
            const existing = await this.prisma.customer.findUnique({
                where: { id },
            });

            if (!existing) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            // Soft delete
            const customer = await this.prisma.customer.update({
                where: { id },
                data: { isActive: false },
            });

            await this.logActivity({
                customerId: customer.id,
                action: 'CUSTOMER_DELETED',
                resource: 'CUSTOMER',
                resourceId: customer.id,
            });

            this.logger.log(`Customer deleted (soft): ${customer.id}`);
            return {
                success: true,
                message: 'Customer deleted successfully',
                customer,
            };
        } catch (error) {
            this.logger.error(`Error deleting customer ${id}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete customer',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // CUSTOMER PROFILE (USER FACING)
    // ============================================

    async getMyProfile(userId: string) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { userId },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                        orderBy: { isDefault: 'desc' },
                    },
                    _count: {
                        select: {
                            addresses: true,
                            communications: true,
                            notes: true,
                            activities: true,
                        },
                    },
                },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer profile not found',
                    error: 'Not Found',
                });
            }

            return customer;
        } catch (error) {
            this.logger.error(`Error getting profile for user ${userId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to fetch profile',
                error: 'Internal Server Error',
            });
        }
    }

    async updateMyProfile(userId: string, dto: UpdateCustomerDto) {
        try {
            const existing = await this.prisma.customer.findUnique({
                where: { userId },
            });

            if (!existing) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer profile not found',
                    error: 'Not Found',
                });
            }

            const customer = await this.prisma.customer.update({
                where: { userId },
                data: {
                    avatar: dto.avatar,
                    dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                    gender: dto.gender,
                    language: dto.language,
                    timezone: dto.timezone,
                    currency: dto.currency,
                },
                include: {
                    preferences: true,
                    addresses: {
                        where: { isActive: true },
                    },
                },
            });

            await this.logActivity({
                customerId: customer.id,
                action: 'PROFILE_UPDATED',
                resource: 'CUSTOMER',
                resourceId: customer.id,
                metadata: {
                    updatedFields: Object.keys(dto),
                    source: 'user_self_service',
                },
            });

            this.logger.log(`Profile updated for user ${userId}`);
            return customer;
        } catch (error) {
            this.logger.error(`Error updating profile for user ${userId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update profile',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // ADDRESSES
    // ============================================

    private async assertLabelFree(customerId: string, label: string) {
        const clash = await this.prisma.address.findFirst({ where: { customerId, label, isActive: true } });
        if (clash) {
            throw new RpcException({ statusCode: 409, message: `You already have an address called "${label}"`, error: 'Conflict' });
        }
        // a soft-deleted address saved before labels were freed on delete may still hold it
        await this.prisma.address.deleteMany({ where: { customerId, label, isActive: false } });
    }

    async addAddress(customerId: string, dto: AddressDto) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { id: customerId },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            const label = dto.label?.trim() || 'Home';
            await this.assertLabelFree(customerId, label);

            // the first address is the default; a new default replaces the old one
            const hasAddresses = await this.prisma.address.count({ where: { customerId, isActive: true } });
            const isDefault = dto.isDefault === true || hasAddresses === 0;
            if (isDefault) {
                await this.prisma.address.updateMany({
                    where: { customerId },
                    data: { isDefault: false },
                });
            }

            const address = await this.prisma.address.create({
                data: {
                    customerId,
                    label,
                    type: dto.type || 'SHIPPING',
                    line1: dto.line1,
                    line2: dto.line2,
                    city: dto.city,
                    state: dto.state,
                    postalCode: dto.postalCode ?? '',
                    country: dto.country,
                    phone: dto.phone || customer.phone,
                    isDefault,
                    latitude: dto.latitude,
                    longitude: dto.longitude,
                    deliveryInstructions: dto.deliveryInstructions,
                },
            });

            await this.logActivity({
                customerId,
                action: 'ADDRESS_ADDED',
                resource: 'ADDRESS',
                resourceId: address.id,
            });

            return address;
        } catch (error) {
            this.logger.error(`Error adding address to customer ${customerId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to add address',
                error: 'Internal Server Error',
            });
        }
    }

    async getAddresses(customerId: string) {
        try {
            const addresses = await this.prisma.address.findMany({
                where: {
                    customerId,
                    isActive: true,
                },
                orderBy: [{ isDefault: 'desc' }, { updatedAt: 'desc' }],
            });

            return addresses;
        } catch (error) {
            this.logger.error(`Error getting addresses for customer ${customerId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to get addresses',
                error: 'Internal Server Error',
            });
        }
    }

    /** @param customerId when set (shopper self-service), the address must belong to this customer */
    async updateAddress(addressId: string, dto: UpdateAddressDto, customerId?: string) {
        try {
            const address = await this.prisma.address.findUnique({
                where: { id: addressId },
            });

            if (!address || !address.isActive || (customerId && address.customerId !== customerId)) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Address not found',
                    error: 'Not Found',
                });
            }

            const label = dto.label?.trim() || undefined;
            if (label && label !== address.label) await this.assertLabelFree(address.customerId, label);

            if (dto.isDefault) {
                await this.prisma.address.updateMany({
                    where: { customerId: address.customerId },
                    data: { isDefault: false },
                });
            }

            const updated = await this.prisma.address.update({
                where: { id: addressId },
                data: {
                    label,
                    type: dto.type,
                    line1: dto.line1,
                    line2: dto.line2,
                    city: dto.city,
                    state: dto.state,
                    postalCode: dto.postalCode,
                    country: dto.country,
                    phone: dto.phone,
                    // leaving isDefault out keeps the current value (it used to clear the default)
                    isDefault: dto.isDefault,
                    latitude: dto.latitude,
                    longitude: dto.longitude,
                    deliveryInstructions: dto.deliveryInstructions,
                },
            });

            await this.logActivity({
                customerId: address.customerId,
                action: 'ADDRESS_UPDATED',
                resource: 'ADDRESS',
                resourceId: addressId,
            });

            return updated;
        } catch (error) {
            this.logger.error(`Error updating address ${addressId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update address',
                error: 'Internal Server Error',
            });
        }
    }

    async deleteAddress(addressId: string, customerId?: string) {
        try {
            const address = await this.prisma.address.findUnique({
                where: { id: addressId },
            });

            if (!address || !address.isActive || (customerId && address.customerId !== customerId)) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Address not found',
                    error: 'Not Found',
                });
            }

            // Soft delete. The label is unique per customer, so free it for a new address.
            await this.prisma.address.update({
                where: { id: addressId },
                data: { isActive: false, isDefault: false, label: `${address.label} (deleted ${address.id.slice(0, 8)})` },
            });
            if (address.isDefault) {
                const next = await this.prisma.address.findFirst({
                    where: { customerId: address.customerId, isActive: true },
                    orderBy: { updatedAt: 'desc' },
                });
                if (next) await this.prisma.address.update({ where: { id: next.id }, data: { isDefault: true } });
            }

            await this.logActivity({
                customerId: address.customerId,
                action: 'ADDRESS_DELETED',
                resource: 'ADDRESS',
                resourceId: addressId,
            });

            return { success: true, message: 'Address deleted successfully' };
        } catch (error) {
            this.logger.error(`Error deleting address ${addressId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete address',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // PREFERENCES
    // ============================================

    async updatePreferences(customerId: string, dto: CustomerPreferenceDto) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { id: customerId },
                include: { preferences: true },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            const preferences = await this.prisma.customerPreference.upsert({
                where: { customerId },
                create: {
                    customerId,
                    ...dto,
                },
                update: dto,
            });

            await this.logActivity({
                customerId,
                action: 'PREFERENCES_UPDATED',
                resource: 'PREFERENCES',
                metadata: {
                    updatedFields: Object.keys(dto),
                },
            });

            return preferences;
        } catch (error) {
            this.logger.error(`Error updating preferences for customer ${customerId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update preferences',
                error: 'Internal Server Error',
            });
        }
    }

    async getPreferences(customerId: string) {
        try {
            const preferences = await this.prisma.customerPreference.findUnique({
                where: { customerId },
            });

            if (!preferences) {
                // Return default preferences if not found
                return {
                    emailNotifications: true,
                    smsNotifications: false,
                    pushNotifications: true,
                    marketingEmails: true,
                    dataSharingConsent: true,
                    cookieConsent: true,
                    preferredCategories: [],
                    preferredBrands: [],
                };
            }

            return preferences;
        } catch (error) {
            this.logger.error(`Error getting preferences for customer ${customerId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to get preferences',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // NOTES
    // ============================================

    async createNote(customerId: string, dto: CreateNoteDto) {
        try {
            const customer = await this.prisma.customer.findUnique({
                where: { id: customerId },
            });

            if (!customer) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Customer not found',
                    error: 'Not Found',
                });
            }

            // Validate that authorId is provided
            if (!dto.authorId) {
                throw new RpcException({
                    statusCode: 400,
                    message: 'authorId is required to create a note',
                    error: 'Bad Request',
                });
            }

            const note = await this.prisma.customerNote.create({
                data: {
                    customerId,
                    authorId: dto.authorId,  // Make sure this is included
                    content: dto.content,
                    type: dto.type || 'GENERAL',
                    isInternal: dto.isInternal ?? true,
                    isPinned: dto.isPinned ?? false,
                },
            });

            await this.logActivity({
                customerId,
                action: 'NOTE_ADDED',
                resource: 'NOTE',
                resourceId: note.id,
            });

            return note;
        } catch (error) {
            this.logger.error(`Error creating note for customer ${customerId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to create note',
                error: 'Internal Server Error',
            });
        }
    }


    async getNotes(customerId: string) {
        try {
            const notes = await this.prisma.customerNote.findMany({
                where: { customerId },
                orderBy: [
                    { isPinned: 'desc' },
                    { createdAt: 'desc' },
                ],
            });

            return notes;
        } catch (error) {
            this.logger.error(`Error getting notes for customer ${customerId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to get notes',
                error: 'Internal Server Error',
            });
        }
    }


    async updateNote(noteId: string, dto: UpdateNoteDto) {
        try {
            // Check if note exists
            const existingNote = await this.prisma.customerNote.findUnique({
                where: { id: noteId },
            });

            if (!existingNote) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Note not found',
                    error: 'Not Found',
                });
            }

            const note = await this.prisma.customerNote.update({
                where: { id: noteId },
                data: {
                    content: dto.content,
                    type: dto.type,
                    isPinned: dto.isPinned,
                    isInternal: dto.isInternal,
                },
            });

            // Log activity
            await this.logActivity({
                customerId: existingNote.customerId,
                action: 'NOTE_UPDATED',
                resource: 'NOTE',
                resourceId: noteId,
                metadata: {
                    updatedFields: Object.keys(dto),
                },
            });

            this.logger.log(`Note updated: ${noteId}`);
            return note;
        } catch (error) {
            this.logger.error(`Error updating note ${noteId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to update note',
                error: 'Internal Server Error',
            });
        }
    }

    async deleteNote(noteId: string) {
        try {
            // Check if note exists
            const existingNote = await this.prisma.customerNote.findUnique({
                where: { id: noteId },
            });

            if (!existingNote) {
                throw new RpcException({
                    statusCode: 404,
                    message: 'Note not found',
                    error: 'Not Found',
                });
            }

            await this.prisma.customerNote.delete({
                where: { id: noteId },
            });

            // Log activity
            await this.logActivity({
                customerId: existingNote.customerId,
                action: 'NOTE_DELETED',
                resource: 'NOTE',
                resourceId: noteId,
            });

            this.logger.log(`Note deleted: ${noteId}`);
            return { success: true, message: 'Note deleted successfully' };
        } catch (error) {
            this.logger.error(`Error deleting note ${noteId}:`, error);
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to delete note',
                error: 'Internal Server Error',
            });
        }
    }

    // ============================================
    // ACTIVITY LOGGING
    // ============================================

    async logActivity(data: {
        customerId: string;
        action: string;
        resource?: string;
        resourceId?: string;
        metadata?: any;
        ipAddress?: string;
        userAgent?: string;
    }) {
        try {
            const activity = await this.prisma.customerActivity.create({
                data: {
                    customerId: data.customerId,
                    action: data.action,
                    resource: data.resource,
                    resourceId: data.resourceId,
                    metadata: data.metadata,
                    ipAddress: data.ipAddress,
                    userAgent: data.userAgent,
                },
            });

            // Update last login if action is LOGIN
            if (data.action === 'LOGIN') {
                await this.prisma.customer.update({
                    where: { id: data.customerId },
                    data: {
                        lastLoginAt: new Date(),
                        loginCount: { increment: 1 },
                    },
                });
            }

            return activity;
        } catch (error) {
            this.logger.error(`Error logging activity:`, error);
            // Don't throw - just log
            return null;
        }
    }

    async getActivities(customerId: string, limit: number = 20) {
        try {
            const activities = await this.prisma.customerActivity.findMany({
                where: { customerId },
                orderBy: { createdAt: 'desc' },
                take: limit,
            });

            return activities;
        } catch (error) {
            this.logger.error(`Error getting activities for customer ${customerId}:`, error);
            throw new RpcException({
                statusCode: 500,
                message: 'Failed to get activities',
                error: 'Internal Server Error',
            });
        }
    }
}