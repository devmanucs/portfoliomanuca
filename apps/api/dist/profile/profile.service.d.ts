import type { IProfile } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(): Promise<IProfile>;
    updateProfile(dto: UpdateProfileDto): Promise<IProfile>;
}
