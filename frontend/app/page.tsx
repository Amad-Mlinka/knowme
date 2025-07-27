import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Showcase } from "@/components/sections/showcase"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { BackToTop } from "@/components/ui/back-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <ProgressIndicator />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
