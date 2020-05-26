import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './models/user.model';
import { CommentRepo } from './models/comment.model';
import { PostRepo } from './models/post.model';
import { FriendShipRepository } from 'src/friendship/friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepo,
      CommentRepo,
      PostRepo,
      FriendShipRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ReposModule {}
