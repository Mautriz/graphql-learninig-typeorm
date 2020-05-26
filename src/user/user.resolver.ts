import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Info,
  Parent,
  InputType,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { User, Config } from 'src/database/models/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos';
import { Post } from 'src/database/models/post.model';
import { PostLoader } from 'src/post/post.dataloader';
import { MinLength, IsOptional } from 'class-validator';
import { CustomValidationPipe } from 'src/pipes/custom-validation.pipe';
import {
  FriendShip,
  FriendShipRepository,
} from 'src/friendship/friendship.entity';
import { createWriteStream } from 'fs';
import { Roles } from 'src/roles.decorator';
import { RoleGuard } from 'src/role.guard';
import { UseGuards } from '@nestjs/common';

@ObjectType()
export class ResponseMessage {
  @Field()
  response: string;

  constructor(obj: ResponseMessage) {
    Object.assign(this, obj);
  }
}

@InputType()
export class FriendShipInput {
  @Field(() => Int)
  userId1: number;

  @Field(() => Int)
  userId2: number;
}

@InputType()
export class UserInput {
  @Field(() => Int)
  userId: number;

  @Field({ nullable: true })
  // @IsOptional()
  @MinLength(3)
  boh?: string;
}

@UseGuards(RoleGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postLoader: PostLoader,
  ) {}

  @Query(() => [FriendShip])
  async friendships() {
    return this.userService.findAllFriendships();
  }

  // @Mutation(() => ResponseMessage)
  // async fileUpload(
  //   @Args({ type: () => GraphQLUpload }) upload: FileUpload,
  // ): Promise<ResponseMessage> {
  //   console.log(upload);
  //   return new ResponseMessage({ response: 'Tutto ok bro' });
  // }

  @Query(() => User, { nullable: true })
  // @UseGuards(AdminGuard)
  async user(
    @Args('userInput', CustomValidationPipe) userInput: UserInput,
    @Info() info: any,
  ) {
    return await this.userService.findUserById(userInput.userId);
  }

  @Roles('utente')
  @Query(() => [User], { nullable: 'items' })
  @UseGuards(RoleGuard)
  async users(
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit?: number,
  ) {
    return await this.userService.findAllUsers(limit);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(RoleGuard)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return await this.userService.createUser({ ...createUserDto });
  }

  @Mutation(() => [FriendShip])
  async createFriendShip(
    @Args('friendshipInput') friendshipInput: FriendShipInput,
  ) {
    return this.userService.createFriendShip(friendshipInput);
  }

  @ResolveField(() => [Post], { nullable: 'items' })
  async posts(@Parent() parent: User) {
    return this.postLoader.generateDataLoader.load(parent.id);
  }

  @ResolveField(() => Int)
  async numberone() {
    return 3;
  }

  @ResolveField(() => Int)
  async asdsaf() {
    return 3;
  }
}
