import {
  Entity,
  EntityRepository,
  Repository,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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
