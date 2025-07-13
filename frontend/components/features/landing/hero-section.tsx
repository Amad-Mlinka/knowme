import { Button } from "@/components/ui/button"
import { Box } from "lucide-react"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="pt-24 pb-16 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Share Your Story,
              <span className="text-blue-200"> Connect</span> with the World
            </h1>
            <p className="text-xl text-blue-100 mt-6 leading-relaxed">
              Create a beautiful, personalized profile that showcases who you are. 
              Connect with others and build meaningful relationships in the digital age.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-large p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Know Me helped me create a professional online presence that truly represents who I am."
              </p>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}