import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { OkTransform, TOkResponse } from 'src/shared/utils/ok-response';
import { NullableType } from 'src/types/nullable.type';
import { Admin } from 'src/entities/admin.entity';

@ApiTags('Admin')
@Controller({ path: '/admin', version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/me')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async admin(
    @SessionUser() user: Admin,
  ): Promise<TOkResponse<NullableType<Admin>>> {
    return OkTransform(await this.adminService.findOne({ id: user.id }));
  }
}
