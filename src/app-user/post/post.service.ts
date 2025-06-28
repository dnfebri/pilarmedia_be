import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from 'src/entities/posts.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostCreateDto } from './dto/postCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async findAllByUser(where: FindOptionsWhere<Posts>): Promise<Posts[]> {
    return await this.postRepository.find({
      where,
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(where: FindOptionsWhere<Posts>): Promise<Posts> {
    const post = await this.postRepository.findOne({
      where,
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async createPost(postDto: PostCreateDto, user: User): Promise<Posts> {
    const tags = postDto.tags.join(',');
    return await this.postRepository.save(
      this.postRepository.create({
        like: JSON.stringify([]),
        ...postDto,
        author: user,
        tags,
      }),
    );
  }
}
