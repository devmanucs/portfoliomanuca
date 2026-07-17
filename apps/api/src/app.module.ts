import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { EducationModule } from './education/education.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { InterestsModule } from './interests/interests.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectsModule } from './projects/projects.module';
import { ResumeModule } from './resume/resume.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    ExperiencesModule,
    SkillsModule,
    EducationModule,
    InterestsModule,
    ResumeModule,
  ],
})
export class AppModule {}
