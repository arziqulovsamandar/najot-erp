import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Admin unauthorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Admin unauthorized',
      });
    }
    async function verify(token: string, jwtService: JwtService) {
      const Admin: Partial<Admin> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!Admin) {
        throw new UnauthorizedException('invalid token provided');
      }
      if (!Admin.is_active) {
        throw new BadRequestException('Admin is not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
