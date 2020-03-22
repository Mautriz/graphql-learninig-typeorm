import { Post } from 'src/database/models/post.model';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostDto implements Partial<Post> {
  @Field()
  title: string;
  @Field(() => Int)
  userId: number;
}
