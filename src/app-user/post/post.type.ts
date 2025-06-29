import { Posts } from 'src/entities/posts.entity';

export type TFindAllPost = Posts & {
  likeAmount: number;
  isLiked: boolean;
};
