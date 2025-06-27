import { Injectable } from '@nestjs/common';
import { Posts } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { PostCreateDto } from './dto/postCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async findAllByUser(user: User) {
    return await this.postRepository.find({
      where: {
        author: { id: user.id },
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async createPost(postDto: PostCreateDto, user: User) {
    return await this.postRepository.save(
      this.postRepository.create({
        like: JSON.stringify([]),
        ...postDto,
        author: user,
      }),
    );
  }
}
