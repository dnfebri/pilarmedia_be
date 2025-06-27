import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AuthUserEmailLoginDto } from 'src/auth/auth-user/dto/auth-user-email-login.dto';

export class CreateUserDto extends AuthUserEmailLoginDto {
  @ApiProperty({ example: 'Name User' })
  @IsNotEmpty()
  name: string;
}
