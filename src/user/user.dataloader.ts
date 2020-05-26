import { Injectable, Scope } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader {
  constructor(private userService: UserService) {}
  // loader = new DataLoader<number, User>(keys => )
}
