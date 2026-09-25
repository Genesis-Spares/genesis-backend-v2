import { Controller } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
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

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  // ============================================
  // CUSTOMER MANAGEMENT (Admin)
  // ============================================

  @MessagePattern('customer.create')
  async createCustomer(@Payload() dto: CreateCustomerDto) {
    return this.customerService.createCustomer(dto);
  }

  @MessagePattern('customer.find.all')
  async findAllCustomers(@Payload() query: CustomerQueryDto) {
    return this.customerService.findAllCustomers(query);
  }

  @MessagePattern('customer.find.one')
  async findCustomerById(@Payload() data: { id: string }) {
    return this.customerService.findCustomerById(data.id);
  }

  @MessagePattern('customer.find.by.user')
  async findCustomerByUserId(@Payload() data: { userId: string }) {
    return this.customerService.findCustomerByUserId(data.userId);
  }

  @MessagePattern('customer.find.by.email')
  async findCustomerByEmail(@Payload() data: { email: string }) {
    return this.customerService.findCustomerByEmail(data.email);
  }

  @MessagePattern('customer.update')
  async updateCustomer(@Payload() data: { id: string; dto: UpdateCustomerDto }) {
    return this.customerService.updateCustomer(data.id, data.dto);
  }

  @MessagePattern('customer.delete')
  async deleteCustomer(@Payload() data: { id: string }) {
    return this.customerService.deleteCustomer(data.id);
  }

  // ============================================
  // CUSTOMER PROFILE (User Facing)
  // ============================================

  @MessagePattern('customer.profile.me')
  async getMyProfile(@Payload() data: { userId: string }) {
    return this.customerService.getMyProfile(data.userId);
  }

  @MessagePattern('customer.profile.update')
  async updateMyProfile(@Payload() data: { userId: string; dto: UpdateCustomerDto }) {
    return this.customerService.updateMyProfile(data.userId, data.dto);
  }

  // ============================================
  // ADDRESSES
  // ============================================

  @MessagePattern('customer.address.create')
  async addAddress(@Payload() data: { customerId: string; dto: AddressDto }) {
    return this.customerService.addAddress(data.customerId, data.dto);
  }

  @MessagePattern('customer.address.find.all')
  async getAddresses(@Payload() data: { customerId: string }) {
    return this.customerService.getAddresses(data.customerId);
  }

  @MessagePattern('customer.address.update')
  async updateAddress(@Payload() data: { addressId: string; dto: UpdateAddressDto }) {
    return this.customerService.updateAddress(data.addressId, data.dto);
  }

  @MessagePattern('customer.address.delete')
  async deleteAddress(@Payload() data: { addressId: string }) {
    return this.customerService.deleteAddress(data.addressId);
  }

  // ============================================
  // PREFERENCES
  // ============================================

  @MessagePattern('customer.preferences.update')
  async updatePreferences(@Payload() data: { customerId: string; dto: CustomerPreferenceDto }) {
    return this.customerService.updatePreferences(data.customerId, data.dto);
  }

  @MessagePattern('customer.preferences.find')
  async getPreferences(@Payload() data: { customerId: string }) {
    return this.customerService.getPreferences(data.customerId);
  }

  // ============================================
  // NOTES
  // ============================================

  @MessagePattern('customer.note.create')
  async createNote(@Payload() data: { customerId: string; dto: CreateNoteDto }) {
    // Validate that the DTO has authorId
    if (!data.dto.authorId) {
      throw new RpcException({
        statusCode: 400,
        message: 'authorId is required',
        error: 'Bad Request',
      });
    }
    return this.customerService.createNote(data.customerId, data.dto);
  }

  @MessagePattern('customer.note.find.all')
  async getNotes(@Payload() data: { customerId: string }) {
    return this.customerService.getNotes(data.customerId);
  }


  @MessagePattern('customer.note.update')
  async updateNote(@Payload() data: { noteId: string; dto: UpdateNoteDto }) {
    if (!data.noteId) {
      throw new RpcException({
        statusCode: 400,
        message: 'noteId is required',
        error: 'Bad Request',
      });
    }
    return this.customerService.updateNote(data.noteId, data.dto);
  }

  @MessagePattern('customer.note.delete')
  async deleteNote(@Payload() data: { noteId: string }) {
    if (!data.noteId) {
      throw new RpcException({
        statusCode: 400,
        message: 'noteId is required',
        error: 'Bad Request',
      });
    }
    return this.customerService.deleteNote(data.noteId);
  }
  // ============================================
  // ACTIVITIES
  // ============================================

  @MessagePattern('customer.activities.find')
  async getActivities(@Payload() data: { customerId: string; limit?: number }) {
    return this.customerService.getActivities(data.customerId, data.limit);
  }

  // ============================================
  // AUTH EVENTS (from Auth Service)
  // ============================================

  @EventPattern('auth.user.verified.customer')
  async handleCustomerVerified(@Payload() data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    console.log(`📥 Received customer creation event for: ${data.email}`);

    try {
      const customer = await this.customerService.createCustomerFromAuthData({
        userId: data.userId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });

      console.log(`✅ Customer created for: ${data.email} (ID: ${customer?.id})`);
      return customer;
    } catch (error) {
      console.error(`❌ Failed to create customer for ${data.email}:`, error);
      return null;
    }
  }

  @EventPattern('auth.user.registered')
  async handleUserRegistered(@Payload() data: SyncUserDataDto) {
    console.log(`📥 User registered: ${data.email} (pending verification)`);
    // Don't create customer yet - wait for verification
  }

  @EventPattern('auth.user.updated')
  async handleUserUpdated(@Payload() data: SyncUserDataDto) {
    await this.customerService.syncUserData(data);
  }
}