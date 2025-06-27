import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostCreateDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'content' })
  @IsNotEmpty()
  content: string;
}
