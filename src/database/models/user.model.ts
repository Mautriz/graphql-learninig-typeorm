import {
  Entity,
  EntityRepository,
  Repository,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Post } from './post.model';
import {
  Field,
  Int,
  ObjectType,
  ResolveField,
  Directive,
} from '@nestjs/graphql';
import { FriendShip } from 'src/friendship/friendship.entity';

@ObjectType()
export class SubConfig {
  @Field()
  @Column({ default: 'submerda' })
  lol: string;
}

@ObjectType()
export class Config {
  @Field()
  @Column({ default: 'hey' })
  stats: string;

  @Directive('@auth')
  @Field(() => Int)
  @Column({ type: 'integer', default: 10 })
  amici: number;

  @Field(() => SubConfig)
  @Column(() => SubConfig)
  subconfig: SubConfig;
}

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email!: string;

  @Field(() => Config)
  @Column(() => Config)
  config: Config;

  @Field(() => Int)
  @Column('integer')
  age!: number;

  @OneToMany(
    () => Post,
    post => post.user,
  )
  posts!: Post[];

  @OneToMany(
    () => FriendShip,
    friendship => friendship.userId1,
  )
  friendship1: FriendShip[];

  @OneToMany(
    () => FriendShip,
    friendship => friendship.userId2,
  )
  friendship2: FriendShip[];
}

@EntityRepository(User)
export class UserRepo extends Repository<User> {}
