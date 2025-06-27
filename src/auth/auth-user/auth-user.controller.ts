import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUserService } from './auth-user.service';
import { OkTransform, TOkResponse } from 'src/shared/utils/ok-response';
import { User } from 'src/entities/user.entity';
import { AuthUserEmailLoginDto } from './dto/auth-user-email-login.dto';
import { CreateUserDto } from 'src/app-user/user/dto/create-user.dto';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { NullableType } from 'src/types/nullable.type';

@ApiTags('Auth User')
@Controller({ path: '/auth/user', version: '1' })
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body() loginDto: AuthUserEmailLoginDto,
  ): Promise<TOkResponse<{ token: string; user: User }>> {
    return OkTransform(await this.authUserService.validateUser(loginDto));
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: CreateUserDto,
  ): Promise<TOkResponse<{ token: string }>> {
    await this.authUserService.register(registerDto);
    return OkTransform(await this.authUserService.validateUser(registerDto));
  }

  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Get('/me')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.OK)
  async user(
    @SessionUser() user: User,
  ): Promise<TOkResponse<NullableType<User>>> {
    return OkTransform(await this.authUserService.me(user.id));
  }

  @ApiBearerAuth()
  @Delete('/logout')
  @UseGuards(AuthUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@SessionUser() user: User): Promise<TOkResponse<void>> {
    return OkTransform(await this.authUserService.logout(user.id));
  }
}
