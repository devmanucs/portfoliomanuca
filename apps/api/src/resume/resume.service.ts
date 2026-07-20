import { Injectable, NotFoundException } from '@nestjs/common';
import type { IResume } from '@portfoliomanuca/types';
import { ProjectStatus as DbProjectStatus } from '@prisma/client';
import {
  mapEducation,
  mapExperience,
  mapProfile,
  mapProject,
  mapSkill,
} from '../common/mappers/entity.mappers';
import { PrismaService } from '../prisma/prisma.service';
import { projectInclude } from '../projects/projects.util';
import { experienceInclude } from '../experiences/experiences.util';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async getResume(): Promise<IResume> {
    const profile = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
    if (!profile) throw new NotFoundException('Profile not found');

    const [experiences, projects, skills, education] = await Promise.all([
      this.prisma.experience.findMany({
        where: { includeInResume: true },
        include: experienceInclude,
        orderBy: { order: 'asc' },
      }),
      this.prisma.project.findMany({
        where: { includeInResume: true, status: DbProjectStatus.PUBLISHED },
        include: projectInclude,
        orderBy: [{ featured: 'desc' }, { order: 'asc' }],
      }),
      this.prisma.skill.findMany({ orderBy: { order: 'asc' } }),
      this.prisma.education.findMany({ orderBy: { order: 'asc' } }),
    ]);

    return {
      profile: mapProfile(profile),
      experiences: experiences.map(mapExperience),
      projects: projects.map(mapProject),
      skills: skills.map(mapSkill),
      education: education.map(mapEducation),
    };
  }

  buildResumeHtml(resume: IResume): string {
    const esc = (v: string) =>
      v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const list = (items: string[]) =>
      items.map((i) => `<li>${esc(i)}</li>`).join('');

    return `<!DOCTYPE html><html><head><meta charset="utf-8" /><style>
      body{font-family:Arial,sans-serif;padding:32px;color:#111;line-height:1.45}
      h1{margin:0 0 4px;font-size:28px}h2{margin:24px 0 8px;font-size:16px;border-bottom:1px solid #ddd}
      .muted{color:#555;font-size:14px}ul{margin:8px 0 0 18px}
    </style></head><body>
      <h1>${esc(resume.profile.fullName)}</h1>
      <p class="muted">${esc(resume.profile.headline)} · ${esc(resume.profile.email)}</p>
      ${resume.profile.resumeSummary ? `<p>${esc(resume.profile.resumeSummary)}</p>` : `<p>${esc(resume.profile.bio)}</p>`}
      <h2>Experience</h2>
      ${resume.experiences
        .map(
          (e) => `<div><strong>${esc(e.role)}</strong> — ${esc(e.company)}<br/><span class="muted">${esc(e.periodLabel ?? '')}</span><p>${esc(e.description)}</p><ul>${list(e.highlights)}</ul></div>`,
        )
        .join('')}
      <h2>Projects</h2>
      ${resume.projects
        .map((p) => `<div><strong>${esc(p.title)}</strong><p>${esc(p.description)}</p></div>`)
        .join('')}
      <h2>Skills</h2>
      <p>${resume.skills.map((s) => esc(s.name)).join(', ')}</p>
      <h2>Education</h2>
      ${resume.education
        .map(
          (ed) => `<div><strong>${esc(ed.degree)}</strong> — ${esc(ed.institution)} <span class="muted">${esc(ed.periodLabel ?? '')}</span></div>`,
        )
        .join('')}
    </body></html>`;
  }

  async renderPdf(html: string): Promise<Buffer> {
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });
      const pdf = await page.pdf({ format: 'A4', printBackground: true });
      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }
}
