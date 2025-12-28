import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { WorkSection } from "@/components/work-section"
import { ApproachSection } from "@/components/approach-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    // <CHANGE> Using proper Tailwind class for cream background
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <ApproachSection />
      <TestimonialSection />
      <FooterSection />
    </main>
  )
}
