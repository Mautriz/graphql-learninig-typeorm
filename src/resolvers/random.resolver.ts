import {
  Resolver,
  ObjectType,
  Field,
  Int,
  Query,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
pubsub.subscribe('myObj', args => console.log('args =>', args));

@ObjectType()
export class MyObj {
  static number = 1;

  @Field(() => Int, { nullable: true })
  randomAge: number;

  constructor() {
    this.randomAge = MyObj.number++;
  }
}

@Resolver()
export class RandomResolver {
  @Mutation(() => MyObj)
  async createObj() {
    const obj = new MyObj();
    console.log(obj);
    pubsub.publish('myObj', { myobj: obj });

    return obj;
  }

  @Subscription(() => MyObj)
  async myobj() {
    console.log('Sono nella subscription');
    return pubsub.asyncIterator<MyObj>('myObj');
  }
}
