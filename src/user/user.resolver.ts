import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Info,
  Parent,
  Context,
} from '@nestjs/graphql';
import { User } from 'src/database/models/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { Post } from 'src/database/models/post.model';
import { PostService } from 'src/post/post.service';
import { MyContext } from 'src/app.module';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query(() => User, { nullable: true })
  async user(@Args('userId') userId: number, @Info() info: any) {
    return await this.userService.findUserById(userId);
  }

  @Query(() => [User], { nullable: 'items' })
  async users(
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit?: number,
  ) {
    return await this.userService.findAllUsers(limit);
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @ResolveField(() => [Post], { nullable: 'items' })
  async posts(@Parent() parent: User, @Context() ctx: MyContext) {
    return ctx.postDataLoader.load(parent.id);
  }
}
