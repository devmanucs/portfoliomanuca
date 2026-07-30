"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
const projects_util_1 = require("../projects/projects.util");
const experiences_util_1 = require("../experiences/experiences.util");
let ResumeService = class ResumeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getResume() {
        const profile = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        const [experiences, projects, skills, education] = await Promise.all([
            this.prisma.experience.findMany({
                where: { includeInResume: true },
                include: experiences_util_1.experienceInclude,
                orderBy: { order: 'asc' },
            }),
            this.prisma.project.findMany({
                where: { includeInResume: true, status: client_1.ProjectStatus.PUBLISHED },
                include: projects_util_1.projectInclude,
                orderBy: [{ featured: 'desc' }, { order: 'asc' }],
            }),
            this.prisma.skill.findMany({ orderBy: { order: 'asc' } }),
            this.prisma.education.findMany({ orderBy: { order: 'asc' } }),
        ]);
        return {
            profile: (0, entity_mappers_1.mapProfile)(profile),
            experiences: experiences.map(entity_mappers_1.mapExperience),
            projects: projects.map(entity_mappers_1.mapProject),
            skills: skills.map(entity_mappers_1.mapSkill),
            education: education.map(entity_mappers_1.mapEducation),
        };
    }
    buildResumeHtml(resume) {
        const esc = (v) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const list = (items) => items.map((i) => `<li>${esc(i)}</li>`).join('');
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
            .map((e) => `<div><strong>${esc(e.role)}</strong> — ${esc(e.company)}<br/><span class="muted">${esc(e.periodLabel ?? '')}</span><p>${esc(e.description)}</p><ul>${list(e.highlights)}</ul></div>`)
            .join('')}
      <h2>Projects</h2>
      ${resume.projects
            .map((p) => `<div><strong>${esc(p.title)}</strong><p>${esc(p.description)}</p></div>`)
            .join('')}
      <h2>Skills</h2>
      <p>${resume.skills.map((s) => esc(s.name)).join(', ')}</p>
      <h2>Education</h2>
      ${resume.education
            .map((ed) => `<div><strong>${esc(ed.degree)}</strong> — ${esc(ed.institution)} <span class="muted">${esc(ed.periodLabel ?? '')}</span></div>`)
            .join('')}
    </body></html>`;
    }
    async renderPdf(html) {
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
        }
        finally {
            await browser.close();
        }
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResumeService);
//# sourceMappingURL=resume.service.js.map