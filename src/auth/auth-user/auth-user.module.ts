import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { UserModule } from 'src/app-user/user/user.module';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';
import { JWTUserStrategy } from '../strategies/jwt-user.strategy';

@Module({
  imports: [
    UserModule,
    AppCacheModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: configService.get('auth.sessionExpires') },
      }),
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, IsExist, IsNotExist, JWTUserStrategy],
})
export class AuthUserModule {}
