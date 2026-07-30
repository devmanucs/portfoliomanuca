import type { Response } from 'express';
export declare function setAccessTokenCookie(res: Response, token: string): void;
export declare function clearAccessTokenCookie(res: Response): void;
