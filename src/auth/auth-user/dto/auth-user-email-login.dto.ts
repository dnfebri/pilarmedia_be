import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/shared/transformers/lower-case.transformer';

export class AuthUserEmailLoginDto {
  @ApiProperty({ example: 'user@user.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  password: string;
}
