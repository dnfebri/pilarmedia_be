import { AuthAdminModule } from 'src/auth/auth-admin/auth-admin.module';
import { AdminModule } from './admin/admin.module';

export const AppAdminModule = [AuthAdminModule, AdminModule];
