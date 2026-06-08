import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Technologies } from "@/components/technologies"
import { Projects } from "@/components/projects"
import { Extras } from "@/components/extras"
import { Footer } from "@/components/footer"
import { PortfolioFloatingNav } from "@/components/portfolio-floating-nav"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioFloatingNav />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Extras />
      <Footer />
    </main>
  )
}
