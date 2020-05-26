import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { ReposModule } from 'src/database/repos.module';
import { CommentModule } from 'src/comment/comment.module';
import { PostLoader } from './post.dataloader';

@Module({
  imports: [ReposModule, CommentModule],
  providers: [PostResolver, PostService, PostLoader],
  exports: [PostService, PostLoader],
})
export class PostModule {}
