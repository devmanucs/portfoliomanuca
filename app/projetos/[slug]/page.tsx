import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { focusLabels, getProjectBySlug } from "@/lib/projects-data";
import { ArrowLeft, ArrowUpRight, Figma, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <h2 className="font-serif text-2xl text-foreground mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-sage/5 via-transparent to-terracotta/5" />

      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Voltar para projetos
          </Link>

          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-sage/50 hover:text-sage transition-all"
              >
                Ver ao vivo
                <ArrowUpRight size={16} />
              </a>
            ) : null}

            {project.figmaUrl ? (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-sage/50 hover:text-sage transition-all"
              >
                Abrir no Figma
                <Figma size={16} />
              </a>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-sage/50 hover:text-sage transition-all"
              >
                Ver codigo
                <Github size={16} />
              </a>
            ) : null}
          </div>
        </div>

        <header>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <p className="text-sm uppercase tracking-widest text-sage">
              {project.category}
            </p>
            <span className="px-3 py-1 text-xs rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20">
              {focusLabels[project.focus]}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </header>

        <CaseSection title="Contexto">
          <p className="text-muted-foreground leading-relaxed">
            {project.context}
          </p>
        </CaseSection>

        <CaseSection title="Problema">
          <p className="text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </CaseSection>

        <CaseSection title="Processo">
          <ul className="space-y-3">
            {project.process.map((step) => (
              <li
                key={step}
                className="flex gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {step}
              </li>
            ))}
          </ul>
        </CaseSection>

        <section className="rounded-3xl border border-sage/30 bg-sage/5 p-6 md:p-8">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Resultado
          </h2>
          <p className="text-foreground leading-relaxed">{project.result}</p>
        </section>

        <CaseSection title="Meu papel">
          <p className="text-muted-foreground leading-relaxed">
            {project.myRole}
          </p>
        </CaseSection>

        {project.designDecisions ? (
          <CaseSection title="Decisões de design">
            <ul className="space-y-3">
              {project.designDecisions.map((decision) => (
                <li
                  key={decision}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {decision}
                </li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        {project.technicalHighlights ? (
          <CaseSection title="Destaques técnicos">
            <ul className="space-y-3">
              {project.technicalHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {highlight}
                </li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl text-foreground mb-6">
            Galeria
          </h2>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={`${project.slug}-${index}`}>
                  <div className="mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-2">
                    <Image
                      src={image}
                      alt={`${project.title} - imagem ${index + 1}`}
                      width={1400}
                      height={900}
                      className="h-auto w-auto max-h-[65vh] max-w-full object-contain rounded-2xl"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4" />
            <CarouselNext className="right-2 md:right-4" />
          </Carousel>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Stacks
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-sage/10 text-sage border border-sage/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
