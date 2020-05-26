import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  EntityRepository,
  Repository,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/database/models/user.model';

@ObjectType()
@Entity()
export class FriendShip {
  @Field(() => Int)
  @Column({ primary: true, type: 'integer' })
  userId1: number;

  @Field(() => Int)
  @Column({ primary: true, type: 'integer' })
  userId2: number;

  @ManyToOne(
    () => User,
    user => user.id,
    { primary: true },
  )
  @JoinColumn({ name: 'userId1' })
  user1?: User;

  @ManyToOne(
    () => User,
    user => user.id,
    { primary: true },
  )
  @JoinColumn({ name: 'userId2' })
  user2?: User;

  @Field(() => User)
  friend: User;
}

@EntityRepository(FriendShip)
export class FriendShipRepository extends Repository<FriendShip> {
  async findFriendsOf(userId: number) {
    // console.log(userId);
    // return this.find({ where: [{userId1: userId }, { userId2: userId}], join: {
    //     alias: 'friendship',
    //     innerJoinAndSelect: {
    //         friend1: "friendship.userId"
    //     }
    // }})
    const users: FriendShip[] = await this.createQueryBuilder('f')
      .where('f.userId1 = :userId')
      .orWhere('f.userId2 = :userId')
      .leftJoinAndSelect('f.user1', 'user1', 'user1.id = :userId')
      .leftJoinAndSelect('f.user2', 'user2', 'user2.id = :userId')
      .setParameter('userId', userId)
      .getMany();
    return this.unifyFriends(users);
  }

  private unifyFriends(friendships: FriendShip[]) {
    friendships.forEach((fr, i) => {
      fr.friend = fr.user1 || fr.user2;
    });

    return friendships;
  }
}
