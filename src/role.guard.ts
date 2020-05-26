import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { MyContext } from './app.module';
import { intersection } from 'lodash';
import * as jwt from 'jsonwebtoken';

type Role = 'admin' | 'user' | 'supreme';

type JwtPayload = {
  roles: Role[];
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const handler = ctx.getHandler();
    const roles = this.reflector.get<Role[]>('roles', handler);

    if (!roles || roles.length > 0) return true;

    const myContext = ctx.getContext<MyContext>();
    console.log('CIAOOOOOOOOOO');
    console.log('super =>', myContext.role);
    myContext.role = 'ciao';

    const accessToken = this.exctratJwtFromContext(myContext);
    const decoded = jwt.verify(accessToken, 'token') as JwtPayload;

    if (!decoded) {
      throw new HttpException('ciao', HttpStatus.BAD_REQUEST);
    }

    const isAdmitted = this.isRoleAdmitted(decoded, roles);
    return true;
  }

  exctratJwtFromContext(ctx: MyContext) {
    const bearerToken = ctx.req.headers.authorization;
    return bearerToken.split(' ')[1];
  }

  isRoleAdmitted(decoded: JwtPayload, roles: Role[]): boolean {
    return intersection(decoded.roles, roles).length > 0;
  }
}
