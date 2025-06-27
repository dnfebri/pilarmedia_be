import { AuthUserModule } from 'src/auth/auth-user/auth-user.module';
import { UserModule } from './user/user.module';

export const AppUserModule = [AuthUserModule, UserModule];
