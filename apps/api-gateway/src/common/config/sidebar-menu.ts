/**
 * Canonical dashboard navigation — the single source of truth for what
 * shows up in the sidebar. GET /sidebar filters this per-user by their
 * JWT permissions (see ../utils/sidebar.util.ts) before returning it.
 *
 * Only routes that actually exist under genesis-dashboard's
 * src/app/(dashboard) are listed here — add an item once its page ships,
 * rather than linking to a route that 404s.
 *
 * `permission` follows the same "resource:action" strings the RBAC seed
 * (auth-service/prisma/seed.ts) grants roles. Leaving it undefined means
 * "visible to any authenticated user" (e.g. the Dashboard home link).
 * An array is an OR — any one of the listed permissions is enough to see
 * the item.
 */

export interface SidebarMenuItem {
    id: string;
    title: string;
    icon: string;
    path: string;
    permission?: string | string[];
    role?: string | string[];
    children?: SidebarMenuItem[];
}

export interface SidebarMenuSection {
    id: string;
    title: string;
    items: SidebarMenuItem[];
}

export const SIDEBAR_MENU: SidebarMenuSection[] = [
    {
        id: 'main',
        title: 'Main menu',
        items: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                icon: 'HomeIcon',
                path: '/dashboard',
            },
            {
                id: 'order-management',
                title: 'Order Management',
                icon: 'ShoppingCartIcon',
                path: '/orders',
                permission: 'order:read',
            },
            {
                id: 'returns',
                title: 'Returns',
                icon: 'ArrowUturnLeftIcon',
                path: '/returns',
                permission: 'order:read',
            },
            {
                id: 'messages',
                title: 'Messages',
                icon: 'ChatBubbleLeftRightIcon',
                path: '/messages',
                permission: 'message:read',
            },
            {
                id: 'emails',
                title: 'Emails',
                icon: 'EnvelopeIcon',
                path: '/emails',
                permission: 'message:read',
            },
            {
                id: 'activity',
                title: 'Activity Log',
                icon: 'ClipboardDocumentListIcon',
                path: '/activity',
                permission: 'user:read',
            },
            {
                id: 'reports',
                title: 'Reports',
                icon: 'ChartBarIcon',
                path: '/reports',
                permission: 'analytics:read',
            },
            {
                id: 'customers',
                title: 'Customers',
                icon: 'UsersIcon',
                path: '/customers',
                permission: 'customer:read',
            },
            {
                id: 'settings',
                title: 'Settings',
                icon: 'Cog6ToothIcon',
                path: '/settings',
            },
        ],
    },
    {
        id: 'catalog',
        title: 'Catalog',
        items: [
            {
                id: 'product-list',
                title: 'Products',
                icon: 'ArchiveBoxIcon',
                path: '/products',
                permission: 'product:read',
            },
            {
                id: 'inventory',
                title: 'Inventory',
                icon: 'ClipboardDocumentListIcon',
                path: '/inventory',
                permission: 'product:update',
            },
            {
                id: 'categories',
                title: 'Categories',
                icon: 'Squares2X2Icon',
                path: '/categories',
                permission: 'category:read',
            },
            {
                id: 'reviews',
                title: 'Reviews',
                icon: 'StarIcon',
                path: '/reviews',
                permission: 'review:read',
            },
            {
                id: 'flash-sale',
                title: 'Flash Sale',
                icon: 'BoltIcon',
                path: '/flash-sale',
                permission: 'catalog:manage',
            },
        ],
    },
];
