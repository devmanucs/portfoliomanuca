import { Controller, Get, Header, Res } from '@nestjs/common';
import type { IResume } from '@portfoliomanuca/types';
import type { Response } from 'express';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get()
  getResume(): Promise<IResume> {
    return this.resumeService.getResume();
  }

  @Get('pdf')
  @Header('Content-Type', 'application/pdf')
  async getResumePdf(@Res() res: Response): Promise<void> {
    const resume = await this.resumeService.getResume();
    const html = this.resumeService.buildResumeHtml(resume);
    try {
      const pdf = await this.resumeService.renderPdf(html);
      res.send(pdf);
    } catch {
      res.status(503).json({
        message: 'PDF generation unavailable',
        resume,
      });
    }
  }
}
