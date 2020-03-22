import { Injectable } from '@nestjs/common';
import { CommentRepo } from 'src/database/models/comment.model';

export interface CreatePostDto {
  postId: number;
  text: string;
}

@Injectable()
export class CommentService {
  constructor(private commentRepo: CommentRepo) {}

  async findCommentsByPostId(postId: number) {
    return await this.commentRepo.find({ where: { postId } });
  }

  async createComment({ postId, text }: CreatePostDto) {
    return await this.commentRepo.save({ text, postId });
  }
}
