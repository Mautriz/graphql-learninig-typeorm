import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ReposModule } from 'src/database/repos.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [ReposModule, PostModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
