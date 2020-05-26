import { Injectable } from '@nestjs/common';
import { UserRepo, User } from 'src/database/models/user.model';
import { CreateUserDto } from './dtos';
import { FriendShipRepository } from 'src/friendship/friendship.entity';
import { FriendShipInput } from './user.resolver';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private friendshipRepo: FriendShipRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser: User = await this.userRepo.save(createUserDto);
    return newUser;
  }

  async findAllFriendships() {
    return await this.friendshipRepo.find();
  }

  async findUserById(userId: number) {
    return await this.userRepo.findOne({ id: userId });
  }

  async findAllUsers(limit: number) {
    return await this.userRepo.find({
      take: limit || null,
    });
  }

  async createFriendShip(createFriendshipInput: FriendShipInput) {
    const [userId1, userId2] = Object.values(createFriendshipInput).sort();
    const savedFriendship = await this.friendshipRepo.save({
      userId1,
      userId2,
    });

    console.log(savedFriendship);

    const res1 = await this.friendshipRepo.findFriendsOf(userId1);

    console.log(res1);

    return res1;
  }
}
