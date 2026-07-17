export { Hero } from "./components/hero";
export { About } from "./components/about";
export { Footer } from "./components/footer";
export { PortfolioFloatingNav } from "./components/portfolio-floating-nav";

import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Footer } from "./components/footer";
import { PortfolioFloatingNav } from "./components/portfolio-floating-nav";
import { ScrollProgressRail } from "./components/scroll-progress-rail";
import { Technologies } from "@/features/skills";
import { GithubActivity } from "@/features/skills/components/github-activity";
import { Projects } from "@/features/projects";
import { Extras } from "@/features/experiences";
import type { LandingContent } from "@/lib/content";

type LandingFeatureProps = {
  content: LandingContent;
};

export function LandingFeature({ content }: LandingFeatureProps) {
  return (
    <main className="min-h-screen">
      <PortfolioFloatingNav />
      <ScrollProgressRail />
      <Hero profile={content.profile} />
      <About />
      <Technologies
        skills={content.skills}
        additionalSkills={content.additionalSkills}
        activitySlot={<GithubActivity />}
      />
      <Projects projects={content.projects} />
      <Extras
        experiences={content.experiences}
        education={content.education}
        interests={content.interests}
      />
      <Footer profile={content.profile} />
    </main>
  );
}
