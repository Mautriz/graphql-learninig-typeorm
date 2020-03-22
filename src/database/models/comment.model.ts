import DataLoader from 'dataloader';
import {
  Entity,
  EntityRepository,
  Repository,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  getRepository,
  getCustomRepository,
  In,
} from 'typeorm';
import { Post } from './post.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('integer')
  postId: number;

  @Field()
  @Column()
  text: string;

  @ManyToOne(
    () => Post,
    post => post.id,
  )
  @JoinColumn({ name: 'postId' })
  post: Post;
}

@EntityRepository(Comment)
export class CommentRepo extends Repository<Comment> {}

// export const commentDataLoader = () =>
//   new DataLoader<number, Comment[]>(async (keys: number[]) => {
//     const comments = await getCustomRepository(CommentRepo).find({
//       where: { postId: In(keys) },
//     });

//     // const res = keys.map(
//     //   id => commentsMap[id] || new Error(`No result for ${id}`),
//     // );

//     return keys.map(id => comments.filter(el => el.postId === id));
//   });

export const genericDataLoader = (t: any, keyField: string) =>
  new DataLoader<number, typeof t[]>(async (keys: number[]) => {
    const comments = await getRepository(t).find({
      where: { [keyField]: In(keys) },
    });

    return keys.map(id => comments.filter(el => el[keyField] === id));
  });
