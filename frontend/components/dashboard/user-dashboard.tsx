"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Eye,
  Share2,
  Edit,
  BarChart3,
  Camera,
  FileText,
  Download,
  Users,
  Palette,
  Heart,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { motion } from "framer-motion"

const userStats = [
  {
    title: "Total Views",
    value: "12.5k",
    icon: Eye,
    description: "This month",
    change: "+23%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Unique Visitors",
    value: "3.2k",
    icon: Users,
    description: "Monthly visitors",
    change: "+18%",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Social Clicks",
    value: "847",
    icon: Share2,
    description: "Link clicks",
    change: "+12%",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Downloads",
    value: "234",
    icon: Download,
    description: "File downloads",
    change: "+31%",
    color: "from-orange-500 to-red-500",
  },
]

const mySites = [
  {
    name: "My Portfolio",
    url: "john-doe.knowme.site",
    status: "Live",
    views: 12534,
    template: "Creative Portfolio",
    lastUpdated: "2 hours ago",
    performance: 94,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
  {
    name: "Photography Studio",
    url: "johnphotos.com",
    status: "Live",
    views: 8967,
    template: "Photography Showcase",
    lastUpdated: "1 day ago",
    performance: 87,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
  {
    name: "Personal Blog",
    url: "john-blog.knowme.site",
    status: "Draft",
    views: 0,
    template: "Minimalist Blog",
    lastUpdated: "3 days ago",
    performance: 0,
    thumbnail: "/placeholder.svg?height=100&width=150",
  },
]

export function UserDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage your digital presence and track your online performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-xl">
                      <Globe className="h-5 w-5 mr-2" />
                      My Sites
                    </CardTitle>
                    <CardDescription>Manage and monitor your personal websites</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90">
                    <Globe className="mr-2 h-4 w-4" />
                    Create New Site
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mySites.map((site, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="border-2 rounded-xl p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={site.thumbnail || "/placeholder.svg"}
                            alt={site.name}
                            className="w-24 h-16 object-cover rounded-lg border"
                          />
                          {site.status === "Live" && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {site.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant={site.status === "Live" ? "default" : "secondary"}>{site.status}</Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground font-mono mb-3">{site.url}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Template:</span>
                              <p className="font-medium">{site.template}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Views:</span>
                              <p className="font-medium">{site.views.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Performance:</span>
                              <p className="font-medium">{site.performance}%</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Updated:</span>
                              <p className="font-medium">{site.lastUpdated}</p>
                            </div>
                          </div>

                          {site.status === "Live" && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Performance Score</span>
                                <span>{site.performance}%</span>
                              </div>
                              <Progress value={site.performance} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest site updates and visitor interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New visitor from LinkedIn", time: "2 minutes ago", icon: Eye, color: "text-blue-500" },
                    { action: "Portfolio image uploaded", time: "1 hour ago", icon: Camera, color: "text-green-500" },
                    { action: "Blog post published", time: "3 hours ago", icon: FileText, color: "text-purple-500" },
                    { action: "Resume downloaded", time: "5 hours ago", icon: Download, color: "text-orange-500" },
                    { action: "Site theme updated", time: "1 day ago", icon: Palette, color: "text-pink-500" },
                    { action: "Contact form submission", time: "2 days ago", icon: Heart, color: "text-red-500" },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90">
                  <Globe className="mr-2 h-4 w-4" />
                  Create New Site
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-muted/50">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photos
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-muted/50">
                  <FileText className="mr-2 h-4 w-4" />
                  Write Blog Post
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-muted/50">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-muted/50">
                  <Palette className="mr-2 h-4 w-4" />
                  Customize Theme
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Plan</span>
                  <Badge className="bg-gradient-to-r from-primary via-purple-500 to-pink-500">Creator Pro</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sites Used</span>
                  <span className="text-sm text-muted-foreground">2 of 5</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm text-muted-foreground">2.4GB of 10GB</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Bandwidth</span>
                    <span className="text-sm text-muted-foreground">156GB of 500GB</span>
                  </div>
                  <Progress value={31} className="h-2" />
                </div>
                <Button variant="outline" className="w-full bg-transparent hover:bg-muted/50">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">This Month</span>
                    <span className="text-lg font-bold text-green-600">+23%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">12,534 total views</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Top Referrer</span>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </div>
                    <div className="text-xs text-muted-foreground">42% of traffic</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Avg. Session</span>
                      <span className="text-sm font-medium">4.2 min</span>
                    </div>
                    <div className="text-xs text-green-600">+18% from last month</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Bounce Rate</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <div className="text-xs text-green-600">-8% improvement</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
