import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Comment } from 'src/database/models/comment.model';
import { CommentService } from './comment.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  // @Query(() => [Comment], { nullable: 'items'})
  // async comments() {
  // }

  @Mutation(() => Comment)
  async createComment(
    @Args('text') text: string,
    @Args('postId') postId: number,
  ) {
    return await this.commentService.createComment({ postId, text });
  }
}
