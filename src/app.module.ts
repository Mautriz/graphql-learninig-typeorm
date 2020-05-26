import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { Request, Response } from 'express';

import { join } from 'path';
import { AuthDirective } from './user/auth.directive';
import { RoleMiddleware } from './role.middleware';
import { SuperResolver } from './friendship/super.resolver';
import { RandomResolver } from './resolvers/random.resolver';

export interface MyContext {
  req: Request;
  res: Response;
  role: string;
}

@Module({
  imports: [
    PostModule,
    CommentModule,
    UserModule,
    GraphQLModule.forRoot({
      useGlobalPrefix: true,
      cors: true,
      schemaDirectives: {
        auth: AuthDirective,
      },
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      uploads: {
        maxFileSize: 100000000,
        maxFiles: 5,
      },
      context: ({ req, res }) => ({
        req,
        res,
        user: '>Bella nig',
        // commentDataLoader,
        // postDataLoader,
      }),
      // resolvers: { JSON: GraphQLJSON },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, SuperResolver, RandomResolver],
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(RoleMiddleware).forRoutes('graphql');
  }
}
