import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Post } from 'src/database/models/post.model';
import { PostService } from './post.service';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/database/models/comment.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @Query(() => Post, { nullable: true })
  async post(@Args('postId') postId: number) {
    return await this.postService.findPostById(postId);
  }

  @Query(() => [Post], { nullable: 'items' })
  async posts(@Args('limit') limit?: number) {
    return await this.postService.findAllPosts(limit);
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Args('userId') userId: number,
    @Args('title') title: string,
  ) {
    return await this.postService.createPost(userId, title);
  }

  @ResolveField(() => [Comment], { nullable: 'items' })
  async comments(@Parent() parent: Post) {
    return await this.commentService.findCommentsByPostId(parent.id);
  }
}
