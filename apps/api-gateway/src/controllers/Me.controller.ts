import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';

@Controller('me')
export class MeController {
    // any authenticated user, no specific permission required
    @UseGuards(JwtAuthGuard)
    @Get()
    me(@CurrentUser() user: JwtPayload) {
        return user;
    }

    // requires the "product:manage" permission — only roles whose
    // RolePermission set includes it will pass
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('product:manage')
    @Get('admin-check')
    adminCheck(@CurrentUser() user: JwtPayload) {
        return { ok: true, checkedFor: user.email };
    }
}