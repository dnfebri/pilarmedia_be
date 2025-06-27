import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppCacheModule } from 'src/core/cache/cache.module';
import { AdminModule } from 'src/app-admin/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { IsExist } from 'src/shared/validators/is-exists.validator';
import { IsNotExist } from 'src/shared/validators/is-not-exists.validator';
import { JWTAdminStrategy } from '../strategies/jwt-admin.strategy';

@Module({
  imports: [
    AdminModule,
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
  providers: [IsExist, IsNotExist, AuthAdminService, JWTAdminStrategy],
  controllers: [AuthAdminController],
})
export class AuthAdminModule {}
