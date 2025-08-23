"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionTable } from "@/components/transaction-table"
import { AlertsPanel } from "@/components/alerts-panel"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { SettingsPage } from "@/components/settings-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, DollarSign, Users, Activity } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Transactions",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Suspicious Transactions",
      value: "23",
      change: "-8.2%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Alerts Today",
      value: "7",
      change: "+2",
      trend: "up",
      icon: Shield,
      color: "text-secondary",
    },
    {
      title: "Active Users",
      value: "1,429",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      color: "text-accent",
    },
  ]

  const recentAlerts = [
    {
      id: "ALT-001",
      type: "High Risk Transaction",
      amount: "$2,847.99",
      user: "john.doe@email.com",
      time: "2 minutes ago",
      risk: "High",
    },
    {
      id: "ALT-002",
      type: "Unusual Location",
      amount: "$156.50",
      user: "jane.smith@email.com",
      time: "15 minutes ago",
      risk: "Medium",
    },
    {
      id: "ALT-003",
      type: "Velocity Check Failed",
      amount: "$4,200.00",
      user: "mike.wilson@email.com",
      time: "1 hour ago",
      risk: "High",
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return <TransactionTable />
      case "alerts":
        return <AlertsPanel />
      case "reports":
        return <AnalyticsDashboard />
      case "settings":
        return <SettingsPage />
      case "dashboard":
      default:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Real-time fraud detection and transaction monitoring</p>
              </div>
              <Button className="glow-blue">
                <Activity className="h-4 w-4 mr-2" />
                Live Monitor
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

                return (
                  <Card key={stat.title} className="bg-card/50 border-border/50 hover:bg-card/80 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendIcon
                          className={`h-3 w-3 mr-1 ${stat.trend === "up" ? "text-secondary" : "text-destructive"}`}
                        />
                        {stat.change} from last month
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Alerts */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <div className="font-medium">{alert.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.user} • {alert.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-mono font-semibold">{alert.amount}</div>
                          <Badge
                            variant={alert.risk === "High" ? "destructive" : "secondary"}
                            className={alert.risk === "High" ? "glow-red" : ""}
                          >
                            {alert.risk} Risk
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
