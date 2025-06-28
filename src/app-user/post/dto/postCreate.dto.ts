import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostCreateDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'content' })
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: `convert field array to string separated by ","`,
    example: [...Object.values(['news', 'article', 'blog'])],
  })
  @IsNotEmpty({ message: 'tags is required' })
  tags: string[];
}
