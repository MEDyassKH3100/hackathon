import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return false;
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'defaultSecretKey' });
      request.user = decoded; // Ajoute les informations de l'utilisateur au request
      return true;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return false;
    }
  }
}
