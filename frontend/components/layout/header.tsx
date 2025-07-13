import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/features/auth/user-dropdown"
import { useAuth } from "@/components/features/auth/auth-context"

export function Header() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground">Know Me</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <UserDropdown user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Login
                </Button>
                <Button>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}