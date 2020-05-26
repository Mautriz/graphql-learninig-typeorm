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
import { Comment } from 'src/database/models/comment.model';
import { CommentDataLoader } from 'src/comment/comment.dataloader';
import { GraphQLJSON } from 'graphql-type-json';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ResponseMessage } from 'src/user/user.resolver';
import { UploadScalar } from 'src/upload.scalar';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private commentLoader: CommentDataLoader,
  ) {}

  @Query(() => Post, { nullable: true })
  async post(@Args('postId') postId: number) {
    return await this.postService.findPostById(postId);
  }

  @Query(() => [Post], { nullable: 'items' })
  async posts(@Args('limit') limit?: number) {
    return await this.postService.findAllPosts(limit);
  }

  @Query(() => GraphQLJSON)
  async scimmia() {
    return { ciaoo: 'xd' };
  }

  @Query(() => ResponseMessage)
  async rispostaACaso() {
    return new ResponseMessage({ response: 'grande bro' });
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Args('userId') userId: number,
    @Args('title') title: string,
  ) {
    return await this.postService.createPost(userId, title);
  }

  // @Mutation(() => ResponseMessage)
  // async uploadSigleFile(
  //   @Args({ type: () => UploadScalar, name: 'upload', nullable: true })
  //   upload: any,
  // ) {
  //   console.log(upload.filename, upload.mimetype);
  //   return new ResponseMessage({ response: 'ciao' });
  // }

  @ResolveField(() => [Comment], { nullable: true })
  async comments(@Parent() parent: Post) {
    return this.commentLoader.loader.load(parent.id);
  }
}
