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
    /** Key of a live counter the dashboard shows next to the item (e.g. 'urgent-orders'). */
    badge?: string;
    children?: SidebarMenuItem[];
}

export interface SidebarMenuSection {
    id: string;
    /** Section heading; empty = no heading. */
    title: string;
    /** 'footer' pins the section to the bottom of the sidebar, above the user card. */
    placement?: 'main' | 'footer';
    items: SidebarMenuItem[];
}

/**
 * Grouped by the job being done: daily order work first, then the catalogue,
 * customer conversations, and looking back. Settings is rarely used, so it is
 * pinned to the bottom rather than competing with the daily items.
 */
export const SIDEBAR_MENU: SidebarMenuSection[] = [
    {
        id: 'overview',
        title: '',
        items: [
            { id: 'dashboard', title: 'Dashboard', icon: 'HomeIcon', path: '/dashboard' },
        ],
    },
    {
        id: 'sales',
        title: 'Sales',
        items: [
            { id: 'orders', title: 'Orders', icon: 'ShoppingCartIcon', path: '/orders', permission: 'order:read' },
            {
                id: 'urgent-orders',
                title: 'Urgent orders',
                icon: 'ExclamationTriangleIcon',
                path: '/orders/urgent',
                permission: 'order:read',
                badge: 'urgent-orders',
            },
            { id: 'returns', title: 'Returns', icon: 'ArrowUturnLeftIcon', path: '/returns', permission: 'order:read' },
            { id: 'customers', title: 'Customers', icon: 'UsersIcon', path: '/customers', permission: 'customer:read' },
        ],
    },
    {
        id: 'catalog',
        title: 'Catalog',
        items: [
            { id: 'product-list', title: 'Products', icon: 'ArchiveBoxIcon', path: '/products', permission: 'product:read' },
            { id: 'categories', title: 'Categories', icon: 'Squares2X2Icon', path: '/categories', permission: 'category:read' },
            { id: 'inventory', title: 'Inventory', icon: 'CubeIcon', path: '/inventory', permission: 'product:update' },
            { id: 'flash-sale', title: 'Flash Sale', icon: 'BoltIcon', path: '/flash-sale', permission: 'catalog:manage' },
        ],
    },
    {
        id: 'customer-care',
        title: 'Customer care',
        items: [
            { id: 'messages', title: 'Messages', icon: 'ChatBubbleLeftRightIcon', path: '/messages', permission: 'message:read' },
            { id: 'emails', title: 'Emails', icon: 'EnvelopeIcon', path: '/emails', permission: 'message:read' },
            { id: 'reviews', title: 'Reviews', icon: 'StarIcon', path: '/reviews', permission: 'review:read' },
        ],
    },
    {
        id: 'insights',
        title: 'Insights',
        items: [
            { id: 'reports', title: 'Reports', icon: 'ChartBarIcon', path: '/reports', permission: 'analytics:read' },
            { id: 'activity', title: 'Activity Log', icon: 'ClockIcon', path: '/activity', permission: 'user:read' },
        ],
    },
    {
        id: 'system',
        title: '',
        placement: 'footer',
        items: [
            { id: 'settings', title: 'Settings', icon: 'Cog6ToothIcon', path: '/settings' },
        ],
    },
];
