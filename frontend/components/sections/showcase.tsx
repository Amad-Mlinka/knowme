"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Eye, Heart, Share } from "lucide-react"
import { motion } from "framer-motion"

const showcaseItems = [
  {
    name: "Sarah Chen",
    role: "UX Designer",
    category: "Portfolio",
    url: "sarah-chen.knowme.site",
    image: "/placeholder.svg?height=400&width=600",
    views: "12.5K",
    likes: "847",
    description: "Minimalist portfolio showcasing UI/UX projects with interactive prototypes",
    tags: ["Design", "Portfolio", "Interactive"],
  },
  {
    name: "Marcus Rodriguez",
    role: "Life Coach",
    category: "Business",
    url: "coachwithmarcus.com",
    image: "/placeholder.svg?height=400&width=600",
    views: "8.2K",
    likes: "623",
    description: "Professional coaching site with booking system and resource downloads",
    tags: ["Business", "Coaching", "Booking"],
  },
  {
    name: "Emma Thompson",
    role: "Food Blogger",
    category: "Blog",
    url: "emmaeats.knowme.site",
    image: "/placeholder.svg?height=400&width=600",
    views: "25.1K",
    likes: "1.2K",
    description: "Vibrant food blog with recipe galleries and cooking video tutorials",
    tags: ["Food", "Blog", "Recipes"],
  },
  {
    name: "David Kim",
    role: "Photographer",
    category: "Gallery",
    url: "davidkimphoto.com",
    image: "/placeholder.svg?height=400&width=600",
    views: "18.7K",
    likes: "956",
    description: "Stunning photography portfolio with full-screen galleries and client booking",
    tags: ["Photography", "Gallery", "Art"],
  },
  {
    name: "Lisa Park",
    role: "Tech Consultant",
    category: "Professional",
    url: "lisaparkconsulting.knowme.site",
    image: "/placeholder.svg?height=400&width=600",
    views: "6.8K",
    likes: "445",
    description: "Corporate consulting site with case studies and client testimonials",
    tags: ["Consulting", "Corporate", "Tech"],
  },
  {
    name: "Alex Johnson",
    role: "Musician",
    category: "Creative",
    url: "alexjohnsonmusic.com",
    image: "/placeholder.svg?height=400&width=600",
    views: "31.4K",
    likes: "2.1K",
    description: "Interactive music site with streaming player and tour date integration",
    tags: ["Music", "Creative", "Entertainment"],
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 text-lg px-6 py-2">
              Featured Creations
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Inspiring sites built by
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                our community
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how creators, professionals, and businesses are using Know Me to build their unique digital
              presence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden border-2 hover:border-primary/20 transition-all duration-500 bg-background/80 backdrop-blur-sm hover:shadow-2xl">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={`${item.name}'s site`}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {item.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes}
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="opacity-90">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-medium">
                      {item.category}
                    </Badge>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.role}</p>
                  <p className="text-sm mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground font-mono">{item.url}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 bg-background/50 backdrop-blur-sm border-2 hover:bg-background/80 rounded-2xl"
          >
            View More Examples
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
