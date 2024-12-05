import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateAdmin(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    if (!user || user.role !== 'Admin') {
      throw new UnauthorizedException('Accès refusé : utilisateur non admin.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    return true;
  }
}
