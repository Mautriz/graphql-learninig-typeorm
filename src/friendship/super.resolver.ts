import { Resolver, Mutation } from '@nestjs/graphql';
import { RoleGuard } from 'src/role.guard';
import { UseGuards } from '@nestjs/common';
import { ResponseMessage } from 'src/user/user.resolver';

@Resolver()
@UseGuards(RoleGuard)
export class SuperResolver {
  @UseGuards(RoleGuard)
  @Mutation(() => ResponseMessage)
  async doStuff() {
    return new ResponseMessage({ response: 'ciao' });
  }
}
