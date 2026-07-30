import type { IAuthUser } from '@portfoliomanuca/types';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './auth.service';
type AuthRequest = Request & {
    user?: JwtPayload;
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, res: Response): Promise<{
        user: IAuthUser;
    }>;
    logout(res: Response): {
        ok: boolean;
    };
    me(req: AuthRequest): Promise<IAuthUser>;
}
export {};
