import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app-user/user/user.service';
import { CacheService } from 'src/core/cache/cache.service';
import authConfig from 'src/shared/config/auth.config';
import { ErrorException } from 'src/shared/exceptions/error.exception';
import { AuthEmailLoginDto } from '../dto/auth-email-login.dto';
import { compare } from 'bcrypt';
import { formatString } from 'src/shared/utils/string';
import { parseTimeToSeconds } from 'src/shared/utils/date';
import { CACHE_KEY_AUTH } from 'src/shared/constants';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/app-user/user/dto/create-user.dto';
import { NullableType } from 'src/types/nullable.type';

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    private cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userService.findOne({ email: loginDto.email });

    if (!user) {
      throw new ErrorException({ email: 'notFound' }, HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await compare(loginDto.password, user.password);
    if (!isValidPassword) {
      throw new ErrorException(
        { password: 'incorrectPassword' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      access: 'user',
    });

    await this.cacheService.set(
      formatString(CACHE_KEY_AUTH.SESSION, user.id),
      true,
      parseTimeToSeconds(this.config.sessionExpires ?? '1h'),
    );

    return { token, user };
  }

  async register(registerDto: CreateUserDto): Promise<void> {
    const user = await this.userService.findOne({ email: registerDto.email });

    if (user) {
      throw new ErrorException({ email: 'alreadyExists' }, HttpStatus.CONFLICT);
    }

    await this.userService.create(registerDto);
  }

  async me(id: string): Promise<NullableType<User>> {
    return this.userService.findOne({ id });
  }

  async logout(token: string): Promise<void> {
    await this.cacheService.remove(formatString(CACHE_KEY_AUTH.SESSION, token));
  }
}
