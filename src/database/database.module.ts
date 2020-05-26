import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReposModule } from './repos.module';
import { Comment } from './models/comment.model';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import { FriendShip } from 'src/friendship/friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'postgres',
      host: 'localhost',
      port: 5444,
      username: 'postgres',
      password: 'postgres',
      entities: [Comment, User, Post, FriendShip],
      synchronize: true,
      logging: 'all',
    }),
    ReposModule,
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
