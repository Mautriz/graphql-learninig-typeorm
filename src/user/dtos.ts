import { User } from 'src/database/models/user.model';
import { InputType, Field, Int } from '@nestjs/graphql';

export type ICreateUserDto = Required<Omit<User, 'posts' | 'id'>>;

@InputType()
export class CreateUserDto {
  @Field(() => Int)
  age: number;

  @Field()
  email: string;
}
