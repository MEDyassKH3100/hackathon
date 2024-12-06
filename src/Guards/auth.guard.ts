import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /*async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token non fourni ou invalide');
    }

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      request.user = payload; // Injecte les informations utilisateur dans req.user
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }*/
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token non fourni ou invalide');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const payload = this.jwtService.verify(token);
        request.user = payload; // Attach the user payload to the request object
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token invalide ou expiré');
      }
    }
    
    
}
