import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { OkTransform, TOkResponse } from 'src/shared/utils/ok-response';
import { Admin } from 'src/entities/admin.entity';
import { AuthAdminGuard } from 'src/shared/guards/auth.guard';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { NullableType } from 'src/types/nullable.type';

@ApiTags('Auth Admin')
@Controller({ path: '/auth/admin', version: '1' })
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<TOkResponse<{ token: string; admin: Admin }>> {
    return OkTransform(await this.authAdminService.validateLogin(loginDto));
  }

  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Get('/me')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.OK)
  async admin(
    @SessionUser() user: Admin,
  ): Promise<TOkResponse<NullableType<Admin>>> {
    return OkTransform(await this.authAdminService.me(user.id));
  }

  @ApiBearerAuth()
  @Post('/logout')
  @UseGuards(AuthAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: Admin): Promise<TOkResponse<void>> {
    return OkTransform(await this.authAdminService.logout(user.id));
  }
}
