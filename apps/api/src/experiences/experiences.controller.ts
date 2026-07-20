import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { IExperience } from '@portfoliomanuca/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { ExperiencesService } from './experiences.service';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  findAll(): Promise<IExperience[]> {
    return this.experiencesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateExperienceDto): Promise<IExperience> {
    return this.experiencesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto): Promise<IExperience> {
    return this.experiencesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<{ ok: true }> {
    await this.experiencesService.remove(id);
    return { ok: true };
  }
}
