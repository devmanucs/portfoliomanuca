import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { ISkill } from '@portfoliomanuca/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll(): Promise<ISkill[]> {
    return this.skillsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSkillDto): Promise<ISkill> {
    return this.skillsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto): Promise<ISkill> {
    return this.skillsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<{ ok: true }> {
    await this.skillsService.remove(id);
    return { ok: true };
  }
}
