"use client";

import type { IResume } from "@portfoliomanuca/types";

type ResumePreviewProps = {
  resume: IResume;
};

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-sm leading-relaxed">
      <header className="border-b border-border pb-4">
        <h2 className="text-2xl font-medium text-foreground">
          {resume.profile.fullName}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {resume.profile.headline} · {resume.profile.email}
        </p>
        <p className="mt-3 text-foreground">
          {resume.profile.resumeSummary ?? resume.profile.bio}
        </p>
      </header>

      <section className="mt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-sage">
          Experiência
        </h3>
        <div className="space-y-4">
          {resume.experiences.map((item) => (
            <div key={item.id}>
              <p className="font-medium text-foreground">
                {item.role} — {item.company}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.periodLabel}
              </p>
              <p className="mt-1 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-sage">
          Projetos
        </h3>
        <div className="space-y-3">
          {resume.projects.map((item) => (
            <div key={item.id}>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-sage">
          Skills
        </h3>
        <p className="text-muted-foreground">
          {resume.skills.map((skill) => skill.name).join(", ")}
        </p>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-sage">
          Formação
        </h3>
        <div className="space-y-2">
          {resume.education.map((item) => (
            <p key={item.id} className="text-muted-foreground">
              <span className="text-foreground">{item.degree}</span> —{" "}
              {item.institution} ({item.periodLabel})
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
