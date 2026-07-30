import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { IAuthUser } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';

export type JwtPayload = { sub: string; email: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IAuthUser | null> {
    const user = await this.prisma.adminUser.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;
    return { id: user.id, email: user.email };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string; user: IAuthUser }> {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  async getMe(userId: string): Promise<IAuthUser> {
    const user = await this.prisma.adminUser.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, email: user.email };
  }
}
