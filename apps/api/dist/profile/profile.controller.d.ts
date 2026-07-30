import type { IProfile } from '@portfoliomanuca/types';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(): Promise<IProfile>;
    updateProfile(dto: UpdateProfileDto): Promise<IProfile>;
}
