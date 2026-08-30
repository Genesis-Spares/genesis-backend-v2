// apps/auth-service/prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma/client'
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/genesis_auth';

// Create adapter
const adapter = new PrismaPg({
    connectionString: databaseUrl,
});

// Create client with adapter
const prisma = new PrismaClient({ adapter });
// Define default permissions
const defaultPermissions = [
    // User Management
    { resource: 'user', action: 'create' },
    { resource: 'user', action: 'read' },
    { resource: 'user', action: 'update' },
    { resource: 'user', action: 'delete' },

    // Role Management
    { resource: 'role', action: 'create' },
    { resource: 'role', action: 'read' },
    { resource: 'role', action: 'update' },
    { resource: 'role', action: 'delete' },

    // Customer Management
    { resource: 'customer', action: 'create' },
    { resource: 'customer', action: 'read' },
    { resource: 'customer', action: 'update' },
    { resource: 'customer', action: 'delete' },

    // Product/Catalog Management
    { resource: 'catalog', action: 'manage' },
    { resource: 'product', action: 'create' },
    { resource: 'product', action: 'read' },
    { resource: 'product', action: 'update' },
    { resource: 'product', action: 'delete' },

    // Notes Management
    { resource: 'notes', action: 'create' },
    { resource: 'notes', action: 'read' },
    { resource: 'notes', action: 'update' },
    { resource: 'notes', action: 'delete' },

    // Category Management
    { resource: 'category', action: 'create' },
    { resource: 'category', action: 'read' },
    { resource: 'category', action: 'update' },
    { resource: 'category', action: 'delete' },

    // Order Management
    { resource: 'order', action: 'create' },
    { resource: 'order', action: 'read' },
    { resource: 'order', action: 'update' },
    { resource: 'order', action: 'delete' },
    { resource: 'order', action: 'manage' },

    // Payment Management
    { resource: 'payment', action: 'create' },
    { resource: 'payment', action: 'read' },
    { resource: 'payment', action: 'update' },

    // Shipment Management
    { resource: 'shipment', action: 'create' },
    { resource: 'shipment', action: 'read' },
    { resource: 'shipment', action: 'update' },

    // Cart Management
    { resource: 'cart', action: 'create' },
    { resource: 'cart', action: 'read' },
    { resource: 'cart', action: 'update' },
    { resource: 'cart', action: 'delete' },

    // Review Management
    { resource: 'review', action: 'create' },
    { resource: 'review', action: 'read' },
    { resource: 'review', action: 'update' },
    { resource: 'review', action: 'delete' },

    // Wishlist Management
    { resource: 'wishlist', action: 'create' },
    { resource: 'wishlist', action: 'read' },
    { resource: 'wishlist', action: 'update' },
    { resource: 'wishlist', action: 'delete' },

    // Analytics
    { resource: 'analytics', action: 'read' },
    { resource: 'analytics', action: 'manage' },

    // Settings
    { resource: 'settings', action: 'read' },
    { resource: 'settings', action: 'update' },
    { resource: 'settings', action: 'manage' },

    // Admin
    { resource: 'admin', action: 'access' },
    { resource: 'admin', action: 'manage' },
];

// Define roles with their permissions
const roles = {
    // Customer - Basic user role
    customer: {
        name: 'customer',
        description: 'Default storefront customer',
        permissions: [
            { resource: 'product', action: 'read' },
            { resource: 'category', action: 'read' },
            { resource: 'cart', action: 'create' },
            { resource: 'cart', action: 'read' },
            { resource: 'cart', action: 'update' },
            { resource: 'cart', action: 'delete' },
            { resource: 'order', action: 'create' },
            { resource: 'order', action: 'read' },
            { resource: 'payment', action: 'create' },
            { resource: 'payment', action: 'read' },
            { resource: 'shipment', action: 'read' },
            { resource: 'review', action: 'create' },
            { resource: 'review', action: 'read' },
            { resource: 'review', action: 'update' },
            { resource: 'wishlist', action: 'create' },
            { resource: 'wishlist', action: 'read' },
            { resource: 'wishlist', action: 'update' },
            { resource: 'wishlist', action: 'delete' },
            { resource: 'user', action: 'read' },
            { resource: 'user', action: 'update' },
        ],
    },

    // Staff - Store staff with limited admin capabilities
    staff: {
        name: 'staff',
        description: 'Store staff member',
        permissions: [
            { resource: 'product', action: 'create' },
            { resource: 'product', action: 'read' },
            { resource: 'product', action: 'update' },
            { resource: 'category', action: 'read' },
            { resource: 'category', action: 'update' },
            { resource: 'order', action: 'read' },
            { resource: 'order', action: 'update' },
            { resource: 'payment', action: 'read' },
            { resource: 'shipment', action: 'create' },
            { resource: 'shipment', action: 'read' },
            { resource: 'shipment', action: 'update' },
            { resource: 'review', action: 'read' },
            { resource: 'review', action: 'update' },
            { resource: 'user', action: 'read' },
        ],
    },

    // Manager - Store manager with broader permissions
    manager: {
        name: 'manager',
        description: 'Store manager',
        permissions: [
            { resource: 'product', action: 'create' },
            { resource: 'product', action: 'read' },
            { resource: 'product', action: 'update' },
            { resource: 'product', action: 'delete' },
            { resource: 'category', action: 'create' },
            { resource: 'category', action: 'read' },
            { resource: 'category', action: 'update' },
            { resource: 'category', action: 'delete' },
            { resource: 'order', action: 'read' },
            { resource: 'order', action: 'update' },
            { resource: 'order', action: 'manage' },
            { resource: 'payment', action: 'read' },
            { resource: 'payment', action: 'update' },
            { resource: 'shipment', action: 'create' },
            { resource: 'shipment', action: 'read' },
            { resource: 'shipment', action: 'update' },
            { resource: 'review', action: 'read' },
            { resource: 'review', action: 'update' },
            { resource: 'review', action: 'delete' },
            { resource: 'user', action: 'read' },
            { resource: 'user', action: 'update' },
            { resource: 'analytics', action: 'read' },
            { resource: 'settings', action: 'read' },
        ],
    },

    // Admin - Full system access
    admin: {
        name: 'admin',
        description: 'System administrator',
        permissions: [
            // All permissions - admin has everything
            ...defaultPermissions,
        ],
    },

    // Super Admin - Complete system control
    super_admin: {
        name: 'super_admin',
        description: 'Super administrator with full system control',
        permissions: [
            // All permissions
            ...defaultPermissions,
        ],
    },
};

async function main() {
    console.log('🌱 Starting database seeding...');

    // 1. Create all permissions
    console.log('📝 Creating permissions...');
    const permissionMap = new Map();

    for (const perm of defaultPermissions) {
        const created = await prisma.permission.upsert({
            where: {
                resource_action: {
                    resource: perm.resource,
                    action: perm.action,
                },
            },
            update: {},
            create: perm,
        });
        permissionMap.set(`${perm.resource}:${perm.action}`, created.id);
    }
    console.log(`✅ Created ${defaultPermissions.length} permissions`);

    // 2. Create roles with their permissions
    console.log('👤 Creating roles...');

    for (const [roleKey, roleData] of Object.entries(roles)) {
        // Create or update role
        const role = await prisma.role.upsert({
            where: { name: roleData.name },
            update: {
                description: roleData.description,
            },
            create: {
                name: roleData.name,
                description: roleData.description,
            },
        });

        // Get permission IDs for this role
        const permissionIds = roleData.permissions.map((perm: any) => {
            const key = `${perm.resource}:${perm.action}`;
            return permissionMap.get(key);
        }).filter(Boolean);

        // Connect permissions to role
        for (const permissionId of permissionIds) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: role.id,
                        permissionId: permissionId,
                    },
                },
                update: {},
                create: {
                    roleId: role.id,
                    permissionId: permissionId,
                },
            });
        }

        console.log(`✅ Created role: ${roleData.name} with ${permissionIds.length} permissions`);
    }

    // 3. Create default admin user
    console.log('👤 Creating default admin user...');

    const adminEmail = 'admin@genesis.com';
    const adminPassword = await bcrypt.hash('Admin123!@#', 12);

    const adminUser = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: adminPassword,
            firstname: 'Admin',
            lastName: 'User',
            isActive: true,
            isEmailVerified: true,
        },
    });

    // Get admin role
    const adminRole = await prisma.role.findUnique({
        where: { name: 'admin' },
    });

    if (adminRole) {
        await prisma.userRole.upsert({
            where: {
                userId_roleId: {
                    userId: adminUser.id,
                    roleId: adminRole.id,
                },
            },
            update: {},
            create: {
                userId: adminUser.id,
                roleId: adminRole.id,
            },
        });
        console.log(`✅ Admin user created: ${adminEmail}`);
    }

    // 4. Create default staff user (optional)
    console.log('👤 Creating default staff user...');

    const staffEmail = 'staff@genesis.com';
    const staffPassword = await bcrypt.hash('Staff123!@#', 12);

    const staffUser = await prisma.user.upsert({
        where: { email: staffEmail },
        update: {},
        create: {
            email: staffEmail,
            password: staffPassword,
            firstname: 'Staff',
            lastName: 'User',
            isActive: true,
            isEmailVerified: true,
        },
    });

    const staffRole = await prisma.role.findUnique({
        where: { name: 'staff' },
    });

    if (staffRole) {
        await prisma.userRole.upsert({
            where: {
                userId_roleId: {
                    userId: staffUser.id,
                    roleId: staffRole.id,
                },
            },
            update: {},
            create: {
                userId: staffUser.id,
                roleId: staffRole.id,
            },
        });
        console.log(`✅ Staff user created: ${staffEmail}`);
    }

    console.log('✅ Database seeding completed!');
    console.log(`
  📋 Default Users:
  - Admin: admin@genesis.com / Admin123!@#
  - Staff: staff@genesis.com / Staff123!@#
  
  📋 Default Roles:
  - super_admin: Full system control
  - admin: System administrator
  - manager: Store manager
  - staff: Store staff
  - customer: Default customer
  `);
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });