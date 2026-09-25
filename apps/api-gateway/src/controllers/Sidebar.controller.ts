import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { type JwtPayload } from '../common/types/jwt-payload.type';
import { buildSidebarForUser } from '../common/utils/sidebar.util';

@Controller('sidebar')
export class SidebarController {
    // Any authenticated user can ask for their menu — what comes back is
    // already scoped to their own roles/permissions.
    @UseGuards(JwtAuthGuard)
    @Get()
    getSidebar(@CurrentUser() user: JwtPayload) {
        return { sections: buildSidebarForUser(user) };
    }
}
