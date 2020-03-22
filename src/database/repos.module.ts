import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './models/user.model';
import { CommentRepo } from './models/comment.model';
import { PostRepo } from './models/post.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepo, CommentRepo, PostRepo])],
  exports: [TypeOrmModule],
})
export class ReposModule {}
