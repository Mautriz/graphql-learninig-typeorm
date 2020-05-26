import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('MIDDLEWARE', req.url, req.ip, req.body);
    console.log('SONO NEL MIDDLEWARE');
    req.role = 'BELLA NIGGGGG';
    next();
  }
}
