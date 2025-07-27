"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Quote } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  site: string
  category: string
  stats: {
    views: string
    conversion: string
  }
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

/** Reusable testimonial card component (same design as original grid). */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div whileHover={{ y: -10, scale: 1.02 }} className="flex-none">
      <Card className="h-full border-2 hover:border-primary/20 transition-all duration-500 bg-background/80 backdrop-blur-sm hover:shadow-2xl relative overflow-hidden w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]">
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10 hover:opacity-20 transition-opacity">
          <Quote className="h-12 w-12 text-primary" />
        </div>

        <CardContent className="p-8">
          {/* Rating */}
          <div className="flex items-center mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Content */}
          <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>

          {/* Stats */}
          <div className="flex justify-between items-center mb-6 p-4 bg-muted/30 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{testimonial.stats.views}</div>
              <div className="text-xs text-muted-foreground">Monthly Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{testimonial.stats.conversion}</div>
              <div className="text-xs text-muted-foreground">Conversion Rate</div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full mr-4 border-2 border-primary/20"
              />
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-xs text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {testimonial.category}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs p-1 h-auto opacity-0 hover:opacity-100 transition-opacity"
                asChild
              >
                <Link href={`https://${testimonial.site}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Visit Site
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 