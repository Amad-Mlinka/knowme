"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ScrollingRow } from "@/components/ui/scrolling-row"
import { TestimonialCard, Testimonial } from "@/components/ui/testimonial-card"

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "UX Designer",
    company: "Design Studio",
    content:
      "Know Me transformed how I present my work. The interactive galleries and seamless mobile experience helped me land 3 major clients in the first month. The customization options are incredible!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "sarah-chen.knowme.site",
    category: "Designer",
    stats: { views: "12.5K", conversion: "23%" },
  },
  {
    name: "Marcus Rodriguez",
    role: "Life Coach",
    company: "Mindful Growth",
    content:
      "The booking integration and file download features are game-changers. My clients can easily schedule sessions and access resources. Revenue increased by 150% since launching my Know Me site.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "coachwithmarcus.com",
    category: "Coach",
    stats: { views: "8.2K", conversion: "31%" },
  },
  {
    name: "Emma Thompson",
    role: "Food Blogger",
    company: "Emma Eats",
    content:
      "The blog functionality and recipe galleries are perfect for my content. The SEO tools helped me rank #1 for my target keywords. My audience engagement has never been higher!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "emmaeats.knowme.site",
    category: "Blogger",
    stats: { views: "25.1K", conversion: "18%" },
  },
  {
    name: "David Kim",
    role: "Photographer",
    company: "Kim Photography",
    content:
      "The portfolio galleries showcase my work beautifully. The client proofing system and booking calendar streamlined my entire workflow. Best investment I've made for my business.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "davidkimphoto.com",
    category: "Photographer",
    stats: { views: "18.7K", conversion: "27%" },
  },
  {
    name: "Lisa Park",
    role: "Tech Consultant",
    company: "Park Consulting",
    content:
      "The professional templates and case study sections perfectly represent my expertise. The analytics dashboard provides insights that help me optimize for better client acquisition.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "lisaparkconsulting.knowme.site",
    category: "Consultant",
    stats: { views: "6.8K", conversion: "35%" },
  },
  {
    name: "Alex Johnson",
    role: "Musician",
    company: "Independent Artist",
    content:
      "The music player integration and event calendar are exactly what I needed. Fan engagement is through the roof, and merchandise sales have tripled since launching my site.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    site: "alexjohnsonmusic.com",
    category: "Musician",
    stats: { views: "31.4K", conversion: "12%" },
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 text-lg px-6 py-2">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by creators
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              See how professionals are using Know Me to build their online presence and grow their business with
              measurable results.
            </p>
          </motion.div>
        </div>

        {/* Scrolling testimonials */}
        <div className="space-y-12">
          <ScrollingRow direction="left" speed={35}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </ScrollingRow>

          {/* Second row scrolls opposite direction on md+ screens */}
          <ScrollingRow direction="right" speed={35} className="hidden md:block">
            {testimonials.map((t) => (
              <TestimonialCard key={"rev-" + t.name} testimonial={t} />
            ))}
          </ScrollingRow>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Join 50,000+ creators who chose Know Me to build their digital presence
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl"
          >
            <Link href="/auth">
              Start Your Success Story
              <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
