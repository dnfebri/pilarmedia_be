import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityCondition } from 'src/types/entity-condition.type';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(condition: EntityCondition<User>): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: condition,
    });
    return user;
  }

  async create(createDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(createDto));
  }
}
