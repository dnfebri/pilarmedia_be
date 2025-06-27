import { EntityHelper } from 'src/shared/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CommentsPost } from './commentsPost.entity';

@Entity()
export class Posts extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ type: 'text' })
  like: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToMany(() => CommentsPost, (comment) => comment.post)
  comments: CommentsPost[];
}
