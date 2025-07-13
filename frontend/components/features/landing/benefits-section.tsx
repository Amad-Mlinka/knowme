import { Shield, Zap, Globe, User } from "lucide-react"

const benefits = [
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: "Secure & Private",
    description: "Your personal information is protected with enterprise-grade security and privacy controls."
  },
  {
    icon: <Zap className="w-8 h-8 text-green-600" />,
    title: "Lightning Fast",
    description: "Create and share your profile in seconds with our streamlined, intuitive interface."
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-600" />,
    title: "Global Reach",
    description: "Connect with people worldwide and share your story across all platforms seamlessly."
  },
  {
    icon: <User className="w-8 h-8 text-orange-600" />,
    title: "Personal Branding",
    description: "Build your digital presence with customizable profiles that reflect your unique identity."
  }
]

export function BenefitsSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Know Me?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make Know Me the perfect platform 
            for building your digital identity and connecting with others.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="bg-muted w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}