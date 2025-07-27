"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  Globe,
  Eye,
  UserPlus,
  Star,
  Download,
  TrendingUp,
  BarChart3,
  Settings,
  Palette,
  Shield,
  Zap,
} from "lucide-react"
import { AdminHeader } from "./admin-header"
import { motion } from "framer-motion"

const stats = [
  {
    title: "Total Users",
    value: "52,847",
    change: "+23%",
    icon: Users,
    trend: "up",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Active Sites",
    value: "38,234",
    change: "+18%",
    icon: Globe,
    trend: "up",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Page Views",
    value: "12.4M",
    change: "+32%",
    icon: Eye,
    trend: "up",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Avg. Rating",
    value: "4.9",
    change: "+0.1",
    icon: Star,
    trend: "up",
    color: "from-yellow-500 to-orange-500",
  },
]

const recentUsers = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    plan: "Creator",
    status: "Active",
    site: "sarah-chen.knowme.site",
    joined: "2 days ago",
    views: "1.2K",
  },
  {
    name: "Marcus Rodriguez",
    email: "marcus@example.com",
    plan: "Business",
    status: "Active",
    site: "coachwithmarcus.com",
    joined: "5 days ago",
    views: "847",
  },
  {
    name: "Emma Thompson",
    email: "emma@example.com",
    plan: "Creator",
    status: "Active",
    site: "emmaeats.knowme.site",
    joined: "1 week ago",
    views: "2.1K",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    plan: "Personal",
    status: "Active",
    site: "davidkimphoto.com",
    joined: "2 weeks ago",
    views: "956",
  },
]

const popularTemplates = [
  { name: "Creative Portfolio", uses: 2134, category: "Portfolio", growth: "+15%" },
  { name: "Business Professional", uses: 1987, category: "Business", growth: "+23%" },
  { name: "Food & Lifestyle", uses: 1756, category: "Blog", growth: "+8%" },
  { name: "Photography Showcase", uses: 1654, category: "Gallery", growth: "+19%" },
  { name: "Minimalist Personal", uses: 1432, category: "Personal", growth: "+12%" },
]

export function AdminDashboard() {
  const [settings, setSettings] = useState({
    siteName: "Know Me",
    siteDescription: "Create stunning personal websites that showcase your unique story",
    maintenanceMode: false,
    allowRegistrations: true,
    featuredTemplate: "Creative Portfolio",
    maxSitesPerUser: 5,
    enableAnalytics: true,
    enableCustomDomains: true,
  })

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage the Know Me platform and monitor user activity across all sites
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users & Sites</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <p
                        className={`text-sm flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Users
                  </CardTitle>
                  <CardDescription>Latest user registrations and their sites</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.site}</p>
                          <p className="text-xs text-muted-foreground">Joined {user.joined}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">{user.views}</p>
                            <p className="text-xs text-muted-foreground">views</p>
                          </div>
                          <Badge variant="outline">{user.plan}</Badge>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Popular Templates
                  </CardTitle>
                  <CardDescription>Most used templates this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {popularTemplates.map((template, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{template.uses.toLocaleString()}</p>
                        <p className="text-xs text-green-600">{template.growth}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User & Site Management
                </CardTitle>
                <CardDescription>Manage user accounts and their personal sites</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Input placeholder="Search users, emails, or sites..." className="max-w-md" />
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Invite User
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-muted/50">
                      <div>User</div>
                      <div>Site URL</div>
                      <div>Plan</div>
                      <div>Views</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {recentUsers.map((user, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-6 gap-4 p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="text-sm text-muted-foreground font-mono">{user.site}</div>
                        <div>
                          <Badge variant="outline">{user.plan}</Badge>
                        </div>
                        <div className="font-medium">{user.views}</div>
                        <div>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Template Management
                </CardTitle>
                <CardDescription>Manage available templates and themes for users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <Input placeholder="Search templates..." className="max-w-sm" />
                    <select className="px-3 py-2 border rounded-md">
                      <option>All Categories</option>
                      <option>Portfolio</option>
                      <option>Business</option>
                      <option>Blog</option>
                      <option>Gallery</option>
                    </select>
                  </div>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Add New Template
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularTemplates.map((template, index) => (
                    <Card key={index} className="border hover:border-primary/20 transition-colors">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-t-lg" />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription>{template.category}</CardDescription>
                          </div>
                          <Badge variant="secondary">{template.growth}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{template.uses.toLocaleString()} uses</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Platform Analytics
                  </CardTitle>
                  <CardDescription>Overall platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">98.7%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-500">1.2s</div>
                        <div className="text-sm text-muted-foreground">Avg Load Time</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Site Creation Rate</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>User Retention</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Growth Metrics
                  </CardTitle>
                  <CardDescription>Platform growth and user engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-500">+23%</div>
                        <div className="text-sm text-muted-foreground">Monthly Growth</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-500">4.9</div>
                        <div className="text-sm text-muted-foreground">User Rating</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Premium Conversion</span>
                          <span>34%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "34%" }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Feature Adoption</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription>Configure Know Me platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Platform Name</Label>
                    <Input
                      id="site-name"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Platform Description</Label>
                    <Textarea
                      id="site-description"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured-template">Featured Template</Label>
                    <Input
                      id="featured-template"
                      value={settings.featuredTemplate}
                      onChange={(e) => setSettings({ ...settings, featuredTemplate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-sites">Max Sites Per User</Label>
                    <Input
                      id="max-sites"
                      type="number"
                      value={settings.maxSitesPerUser}
                      onChange={(e) => setSettings({ ...settings, maxSitesPerUser: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Feature Controls
                  </CardTitle>
                  <CardDescription>Enable or disable platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New User Registrations</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to create accounts</p>
                    </div>
                    <Switch
                      checked={settings.allowRegistrations}
                      onCheckedChange={(checked) => setSettings({ ...settings, allowRegistrations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics Tracking</Label>
                      <p className="text-sm text-muted-foreground">Enable user analytics and tracking</p>
                    </div>
                    <Switch
                      checked={settings.enableAnalytics}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Custom Domains</Label>
                      <p className="text-sm text-muted-foreground">Allow users to connect custom domains</p>
                    </div>
                    <Switch
                      checked={settings.enableCustomDomains}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableCustomDomains: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode for platform updates</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button size="lg" className="bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                <Zap className="mr-2 h-4 w-4" />
                Save All Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
