import { Injectable, Scope } from '@nestjs/common';
import { CommentService } from './comment.service';
import DataLoader from 'dataloader';
import { Comment } from '../database/models/comment.model';

@Injectable({ scope: Scope.REQUEST })
export class CommentDataLoader {
  loader = new DataLoader<number, Comment[]>(keys =>
    this.commentService.commentByPostIdLoader([...keys]),
  );
  constructor(private commentService: CommentService) {}
}
