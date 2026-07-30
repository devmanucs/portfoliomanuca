import { JwtService } from '@nestjs/jwt';
import type { IAuthUser } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto } from './dto/login.dto';
export type JwtPayload = {
    sub: string;
    email: string;
};
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<IAuthUser | null>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: IAuthUser;
    }>;
    getMe(userId: string): Promise<IAuthUser>;
}
