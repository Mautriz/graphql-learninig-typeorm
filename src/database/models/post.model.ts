import {
  Entity,
  EntityRepository,
  Repository,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  getCustomRepository,
  In,
} from 'typeorm';
import { User } from './user.model';
import { Comment } from './comment.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import DataLoader from 'dataloader';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column('integer')
  userId: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    () => Comment,
    comment => comment.post,
  )
  comments: Comment[];
}

@EntityRepository(Post)
export class PostRepo extends Repository<Post> {}
