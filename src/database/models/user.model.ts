import {
  Entity,
  EntityRepository,
  Repository,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Post } from './post.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email!: string;

  @Field(() => Int)
  @Column('integer')
  age!: number;

  @OneToMany(
    () => Post,
    post => post.user,
  )
  posts!: Post[];
}

@EntityRepository(User)
export class UserRepo extends Repository<User> {}
