import { Module } from '@nestjs/common';
import { AuthUserModule } from './auth-user/auth-user.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';

@Module({ imports: [AuthAdminModule, AuthUserModule] })
export class AuthModule {}
