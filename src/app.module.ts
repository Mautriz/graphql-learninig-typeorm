import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { genericDataLoader, Comment } from './database/models/comment.model';
import { Request, Response } from 'express';
import { Post } from './database/models/post.model';

export interface MyContext {
  req: Request;
  res: Response;
  commentDataLoader: ReturnType<typeof genericDataLoader>;
  postDataLoader: ReturnType<typeof genericDataLoader>;
}

@Module({
  imports: [
    PostModule,
    CommentModule,
    UserModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req, res }) => ({
        req,
        res,
        commentDataLoader: genericDataLoader(Comment, 'postId'),
        postDataLoader: genericDataLoader(Post, 'userId'),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
