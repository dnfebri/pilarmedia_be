import { AuthUserModule } from 'src/auth/auth-user/auth-user.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

export const AppUserModule = [AuthUserModule, UserModule, PostModule];
