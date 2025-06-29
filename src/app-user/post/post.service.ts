import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';
import { PostCreateDto } from './dto/postCreate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityCondition } from 'src/types/entity-condition.type';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async findAllByUser(where: EntityCondition<Posts>): Promise<Posts[]> {
    return await this.postRepository.find({
      where,
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(where: EntityCondition<Posts>): Promise<Posts> {
    const post = await this.postRepository.findOne({
      where,
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findAll(
    where: EntityCondition<Posts>,
  ): Promise<{ likeAmount: number & Posts }[]> {
    const posts = await this.postRepository.find({
      where,
      order: {
        id: 'DESC',
      },
    });

    return posts.map((post) => ({
      ...post,
      likeAmount: JSON.parse(post.like).length,
      like: undefined,
    }));
  }

  async createPost(postDto: PostCreateDto, user: User): Promise<Posts> {
    if (!Array.isArray(postDto.tags)) {
      throw new NotFoundException('tags is required as array');
    }
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

  async likePost(id: number, user: User): Promise<Posts> {
    const post = await this.findOne({ id });
    const like = JSON.parse(post.like);
    if (like.includes(user.id)) {
      like.splice(like.indexOf(user.id), 1);
    } else {
      like.push(user.id);
    }
    post.like = JSON.stringify(like);
    return await this.postRepository.save(post);
  }
}
