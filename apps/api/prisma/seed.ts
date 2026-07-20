import { PrismaClient, ProjectFocus, ProjectStatus, EmploymentType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { projects } from './seed-projects';

const prisma = new PrismaClient();

const focusMap: Record<string, ProjectFocus> = {
  design: ProjectFocus.DESIGN,
  development: ProjectFocus.DEVELOPMENT,
  hybrid: ProjectFocus.HYBRID,
};

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@portfolio.local';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'changeme';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash },
    update: { passwordHash },
  });

  await prisma.projectSkill.deleteMany();
  await prisma.experienceSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      fullName: 'Manuella Carvalho',
      headline: 'Front-end Developer & UI/UX Designer',
      bio: 'Desenvolvimento web e design de interfaces com foco em experiência do usuário.',
      email: 'manuhcsantos@gmail.com',
      location: 'Imperatriz — MA / Açailândia — MA',
      github: 'https://github.com/devmanucs',
      linkedin: 'https://linkedin.com/in/manuella-carvalho-7663352b0',
      avatarUrl: '/assets/eu.jpg',
      resumeSummary:
        'Front-end developer e UI/UX designer com experiência em React, Next.js e prototipação no Figma.',
    },
  });

  const techSkills: Array<{ name: string; category: string; iconKey?: string; color?: string; order: number }> = [
    { name: 'react', category: 'stack', iconKey: 'react', color: '#61DAFB', order: 1 },
    { name: 'next.js', category: 'stack', iconKey: 'nextdotjs', color: 'currentColor', order: 2 },
    { name: 'typescript', category: 'stack', iconKey: 'typescript', color: '#3178C6', order: 3 },
    { name: 'tailwind css', category: 'stack', iconKey: 'tailwindcss', color: '#06B6D4', order: 4 },
    { name: 'figma', category: 'stack', iconKey: 'figma', color: '#F24E1E', order: 5 },
    { name: 'javascript', category: 'stack', iconKey: 'javascript', color: '#F7DF1E', order: 6 },
    { name: 'html', category: 'stack', iconKey: 'html5', color: '#E34F26', order: 7 },
    { name: 'css', category: 'stack', iconKey: 'css3', color: '#1572B6', order: 8 },
  ];

  const additionalSkills = [
    'git', 'github', 'vs code', 'node.js', 'rest APIs', 'responsive design',
    'UI/UX', 'design systems', 'accessibility', 'performance', 'SEO', 'agile',
  ];

  for (const skill of techSkills) {
    await prisma.skill.create({ data: skill });
  }

  let order = 20;
  for (const name of additionalSkills) {
    await prisma.skill.create({ data: { name, category: 'additional', order: order++ } });
  }

  let projectOrder = 0;
  for (const project of projects) {
    const created = await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        focus: focusMap[project.focus],
        description: project.description,
        impact: project.impact,
        context: project.context,
        problem: project.problem,
        process: project.process,
        result: project.result,
        myRole: project.myRole,
        designDecisions: project.designDecisions ?? [],
        technicalHighlights: project.technicalHighlights ?? [],
        coverImage: project.image,
        gallery: project.images,
        liveUrl: project.liveUrl ?? null,
        githubUrl: project.githubUrl ?? null,
        figmaUrl: project.figmaUrl ?? null,
        featured: project.featured,
        order: projectOrder++,
        status: ProjectStatus.PUBLISHED,
        includeInResume: true,
      },
    });

    for (const tag of project.tags) {
      const skill = await prisma.skill.upsert({
        where: { name: tag },
        create: { name: tag, category: 'project', order: 100 },
        update: {},
      });
      await prisma.projectSkill.create({
        data: { projectId: created.id, skillId: skill.id },
      });
    }
  }

  const experiences = [
    {
      company: 'AVB',
      role: 'Desenvolvedora de Sistemas — Trainee',
      periodLabel: 'Atual',
      startDate: new Date('2025-01-01'),
      employmentType: EmploymentType.FULL_TIME,
      description: 'Interfaces com React, Next.js, TypeScript e Tailwind.',
      highlights: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      order: 0,
    },
    {
      company: 'Nexystem',
      role: 'UI/UX Designer e Desenvolvedora Front-end',
      periodLabel: 'Projetos recentes',
      startDate: new Date('2023-06-01'),
      employmentType: EmploymentType.FREELANCE,
      description: 'Protótipos no Figma e implementação responsiva.',
      highlights: ['Figma', 'UI/UX', 'Front-end responsivo'],
      order: 1,
    },
    {
      company: 'SCS — Robótica, UI/UX e Games',
      role: 'Membro de Empresa Júnior',
      periodLabel: 'Voluntariado',
      startDate: new Date('2022-01-01'),
      employmentType: EmploymentType.PART_TIME,
      description: 'Projetos técnicos e de design.',
      highlights: ['Robótica', 'UI/UX', 'Games'],
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: {
        company: exp.company,
        role: exp.role,
        periodLabel: exp.periodLabel,
        startDate: exp.startDate,
        employmentType: exp.employmentType,
        description: exp.description,
        highlights: exp.highlights,
        order: exp.order,
        includeInResume: true,
      },
    });
  }

  const educationRows = [
    {
      degree: 'Análise e Desenvolvimento de Sistemas',
      institution: 'Unifacimp Wyden',
      periodLabel: '2026',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2026-12-31'),
      order: 0,
    },
    {
      degree: 'Ensino Médio',
      institution: 'CEM — Tancredo de Almeida Neves',
      periodLabel: '2023',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2023-12-31'),
      order: 1,
    },
  ];

  for (const edu of educationRows) {
    await prisma.education.create({ data: edu });
  }

  const interests = ['Front-end', 'UI/UX', 'Robótica', 'Game Design', 'Pixel Art'];
  let interestOrder = 0;
  for (const name of interests) {
    await prisma.interest.create({ data: { name, order: interestOrder++ } });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err: unknown) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
