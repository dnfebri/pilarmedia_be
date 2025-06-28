import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostCreateDto } from './dto/postCreate.dto';
import { AuthUserGuard } from 'src/shared/guards/auth.guard';
import { SessionUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { Posts } from 'src/entities/posts.entity';
import { OkTransform, TOkResponse } from 'src/shared/utils/ok-response';

@ApiBearerAuth()
@UseGuards(AuthUserGuard)
@ApiTags('Posts')
@Controller({ path: '/post', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllByUser(
    @SessionUser() user: User,
  ): Promise<TOkResponse<Posts[]>> {
    return OkTransform(
      await this.postService.findAllByUser({ author: { id: user.id } }),
    );
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<TOkResponse<{ likeAmount: number & Posts }[]>> {
    return OkTransform(await this.postService.findAll({}));
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async findOneBySlug(
    @Query('slug') slug: string,
  ): Promise<TOkResponse<Posts>> {
    return OkTransform(await this.postService.findOne({ slug }));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body() postDto: PostCreateDto,
    @SessionUser() user: User,
  ): Promise<TOkResponse<Posts>> {
    return OkTransform(
      await this.postService.createPost(postDto, user),
      undefined,
      HttpStatus.CREATED,
    );
  }

  @Post(':id/like')
  @HttpCode(HttpStatus.OK)
  async likePost(
    @SessionUser() user: User,
    @Query('id') id: number,
  ): Promise<TOkResponse<Posts>> {
    return OkTransform(await this.postService.likePost(id, user));
  }
}
