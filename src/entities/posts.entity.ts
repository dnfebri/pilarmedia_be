import { EntityHelper } from 'src/shared/utils/entity-helper';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CommentsPost } from './commentsPost.entity';
import { generateRandomString } from 'src/shared/utils/random-string';
import { Expose } from 'class-transformer';

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
  tags: string;

  @Expose({ groups: ['me'] })
  @Column({ type: 'text' })
  like: string;

  @BeforeInsert()
  slugify() {
    this.slug = `${this.title.toLowerCase().replace(/ /g, '-')}-${generateRandomString(5)}`;
  }

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @OneToMany(() => CommentsPost, (comment) => comment.post)
  comments: CommentsPost[];
}
