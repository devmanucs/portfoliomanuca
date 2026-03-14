import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Technologies } from "@/components/technologies"
import { Projects } from "@/components/projects"
import { Extras } from "@/components/extras"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Extras />
      <Contact />
      <Footer />
    </main>
  )
}
