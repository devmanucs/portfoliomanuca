import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { IEducation } from '@portfoliomanuca/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';
import { EducationService } from './education.service';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  findAll(): Promise<IEducation[]> {
    return this.educationService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateEducationDto): Promise<IEducation> {
    return this.educationService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateEducationDto): Promise<IEducation> {
    return this.educationService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<{ ok: true }> {
    await this.educationService.remove(id);
    return { ok: true };
  }
}
