"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Personal",
    price: "Free",
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      "1 personal site",
      "knowme.site subdomain",
      "5 page templates",
      "Basic customization",
      "Social media links",
      "Contact form",
      "Mobile responsive",
      "SSL certificate",
    ],
    popular: false,
    cta: "Start Free",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Creator",
    price: "$12",
    description: "For content creators and professionals",
    icon: Star,
    features: [
      "5 personal sites",
      "Custom domain support",
      "50+ premium templates",
      "Advanced customization",
      "Photo galleries (unlimited)",
      "Blog functionality",
      "File downloads (5GB)",
      "Basic analytics",
      "Remove Know Me branding",
      "Priority email support",
    ],
    popular: true,
    cta: "Start Creating",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Business",
    price: "$39",
    description: "For entrepreneurs and growing businesses",
    icon: Crown,
    features: [
      "Unlimited sites",
      "Multiple custom domains",
      "All premium templates",
      "White-label solution",
      "Team collaboration (5 users)",
      "Advanced analytics",
      "File downloads (50GB)",
      "E-commerce integration",
      "API access",
      "Custom integrations",
      "Priority phone support",
      "Dedicated account manager",
    ],
    popular: false,
    cta: "Scale Your Business",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    icon: Rocket,
    features: [
      "Everything in Business",
      "Unlimited team members",
      "Custom development",
      "Advanced security features",
      "SLA guarantee (99.9%)",
      "Dedicated infrastructure",
      "Custom integrations",
      "Training & onboarding",
      "24/7 phone support",
      "Success manager",
    ],
    popular: false,
    cta: "Contact Sales",
    color: "from-emerald-500 to-teal-500",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 text-lg px-6 py-2">
              Flexible Pricing
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose your perfect
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                growth plan
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Start free and scale as you grow. All plans include our core features with no hidden fees.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative ${plan.popular ? "lg:scale-110 z-10" : ""}`}
            >
              <Card
                className={`relative h-full flex flex-col border-2 transition-all duration-500 bg-background/80 backdrop-blur-sm hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary shadow-2xl bg-gradient-to-b from-primary/5 to-background"
                    : "hover:border-primary/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-2xl bg-gradient-to-r ${plan.color} shadow-lg mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <CardDescription className="mt-2 text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="px-6 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6 mt-auto">
                  <Button
                    className={`w-full py-6 text-lg font-medium rounded-xl transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 text-white shadow-lg hover:shadow-xl"
                        : "hover:bg-primary/10"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/auth">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            All plans include 30-day money-back guarantee • No setup fees • Cancel anytime
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              SSL Certificate
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              99.9% Uptime
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2" />
              24/7 Support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
