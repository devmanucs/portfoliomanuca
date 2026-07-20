import { LandingFeature } from "@/features/landing";
import { loadLandingContent } from "@/lib/content";

export default async function HomePage() {
  const content = await loadLandingContent();

  return <LandingFeature content={content} />;
}
