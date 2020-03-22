import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { ReposModule } from 'src/database/repos.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [ReposModule, CommentModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
