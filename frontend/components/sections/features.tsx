"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Camera,
  FileText,
  Share2,
  Download,
  BarChart3,
  Smartphone,
  Zap,
  Globe,
  Code,
  Shield,
  Headphones,
} from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Palette,
    title: "Advanced Customization",
    description: "Complete control over your site's appearance with custom CSS, fonts, colors, and layouts.",
    badge: "Design",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Camera,
    title: "Interactive Galleries",
    description: "Showcase your work with stunning photo galleries, lightboxes, and slideshow effects.",
    badge: "Media",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: FileText,
    title: "Content Management",
    description: "Built-in blog, portfolio sections, and rich text editor for all your content needs.",
    badge: "Content",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Connect all your social profiles with custom icons and automated content sharing.",
    badge: "Social",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Download,
    title: "File Management",
    description: "Secure file hosting for resumes, portfolios, and digital products with download tracking.",
    badge: "Files",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed insights into visitor behavior, traffic sources, and engagement metrics.",
    badge: "Analytics",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Excellence",
    description: "Pixel-perfect mobile experience with touch gestures and app-like interactions.",
    badge: "Mobile",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Performance Optimized",
    description: "Lightning-fast loading with CDN delivery, image optimization, and caching.",
    badge: "Speed",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Professional custom domains with SSL certificates and DNS management included.",
    badge: "Domain",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "API access, webhooks, custom integrations, and advanced embedding options.",
    badge: "API",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SSL encryption, backup systems, and privacy controls.",
    badge: "Security",
    color: "from-pink-500 to-red-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team with live chat, tutorials, and personalized assistance.",
    badge: "Support",
    color: "from-purple-500 to-indigo-500",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 text-lg px-6 py-2">
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need to
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                stand out online
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professional tools and features designed to help you create, customize, and manage your digital presence
              with ease and sophistication.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-primary/20 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
