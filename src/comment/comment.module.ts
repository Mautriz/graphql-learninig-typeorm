import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { ReposModule } from 'src/database/repos.module';
import { CommentDataLoader } from './comment.dataloader';

@Module({
  imports: [ReposModule],
  providers: [CommentResolver, CommentService, CommentDataLoader],
  exports: [CommentService, CommentDataLoader],
})
export class CommentModule {}
