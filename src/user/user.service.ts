import { Injectable } from '@nestjs/common';
import { UserRepo, User } from 'src/database/models/user.model';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser: User = await this.userRepo.save(createUserDto);
    return newUser;
  }

  async findUserById(userId: number) {
    return await this.userRepo.findOne({ id: userId });
  }

  async findAllUsers(limit: number) {
    return await this.userRepo.find({
      take: limit || null,
    });
  }
}
