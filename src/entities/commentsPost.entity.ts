import { EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from './posts.entity';
import { User } from './user.entity';

@Entity()
export class CommentsPost extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ type: 'text' })
  like: string;

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
