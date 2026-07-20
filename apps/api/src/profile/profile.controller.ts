import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import type { IProfile } from '@portfoliomanuca/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(): Promise<IProfile> {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateProfile(@Body() dto: UpdateProfileDto): Promise<IProfile> {
    return this.profileService.updateProfile(dto);
  }
}
