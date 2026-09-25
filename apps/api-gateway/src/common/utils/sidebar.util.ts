import { JwtPayload } from '../types/jwt-payload.type';
import { SIDEBAR_MENU, SidebarMenuItem, SidebarMenuSection } from '../config/sidebar-menu';

/**
 * Same exact-match semantics as PermissionsGuard (see ../guards/permissions.guard.ts):
 * no wildcards, no implicit role bypass — admin/super_admin see everything
 * only because the RBAC seed grants them every literal permission.
 * An item with no `permission` is visible to any authenticated user.
 */
function canAccess(user: JwtPayload, item: Pick<SidebarMenuItem, 'permission' | 'role'>): boolean {
    const userPermissions = user.permissions ?? [];
    const userRoles = user.roles ?? [];

    if (item.role) {
        const required = Array.isArray(item.role) ? item.role : [item.role];
        if (!required.some((role) => userRoles.includes(role))) {
            return false;
        }
    }

    if (item.permission) {
        const required = Array.isArray(item.permission) ? item.permission : [item.permission];
        return required.some((perm) => userPermissions.includes(perm));
    }

    return true;
}

function filterItems(items: SidebarMenuItem[], user: JwtPayload): SidebarMenuItem[] {
    const result: SidebarMenuItem[] = [];

    for (const item of items) {
        if (!canAccess(user, item)) continue;

        if (item.children && item.children.length > 0) {
            const children = filterItems(item.children, user);
            if (children.length === 0) continue;
            result.push({ ...item, children });
        } else {
            result.push(item);
        }
    }

    return result;
}

/** Returns only the sections/items this user's roles & permissions allow. */
export function buildSidebarForUser(user: JwtPayload): SidebarMenuSection[] {
    return SIDEBAR_MENU
        .map((section) => ({ ...section, items: filterItems(section.items, user) }))
        .filter((section) => section.items.length > 0);
}
