"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChartIcon,
  Activity,
  Globe,
  Shield,
  AlertTriangle,
  Download,
} from "lucide-react"

// Mock data for charts
const riskTrendData = [
  { date: "Jan 1", highRisk: 12, mediumRisk: 28, lowRisk: 156, total: 196 },
  { date: "Jan 2", highRisk: 8, mediumRisk: 34, lowRisk: 189, total: 231 },
  { date: "Jan 3", highRisk: 15, mediumRisk: 42, lowRisk: 203, total: 260 },
  { date: "Jan 4", highRisk: 23, mediumRisk: 38, lowRisk: 178, total: 239 },
  { date: "Jan 5", highRisk: 18, mediumRisk: 45, lowRisk: 234, total: 297 },
  { date: "Jan 6", highRisk: 11, mediumRisk: 29, lowRisk: 198, total: 238 },
  { date: "Jan 7", highRisk: 19, mediumRisk: 52, lowRisk: 267, total: 338 },
]

const transactionVolumeData = [
  { hour: "00:00", volume: 45, suspicious: 2 },
  { hour: "04:00", volume: 23, suspicious: 1 },
  { hour: "08:00", volume: 189, suspicious: 8 },
  { hour: "12:00", volume: 267, suspicious: 12 },
  { hour: "16:00", volume: 234, suspicious: 15 },
  { hour: "20:00", volume: 156, suspicious: 6 },
]

const geographicRiskData = [
  { region: "North America", transactions: 1247, riskScore: 23, color: "#10b981" },
  { region: "Europe", transactions: 892, riskScore: 34, color: "#3b82f6" },
  { region: "Asia Pacific", transactions: 634, riskScore: 45, color: "#8b5cf6" },
  { region: "Latin America", transactions: 423, riskScore: 67, color: "#f59e0b" },
  { region: "Africa", transactions: 156, riskScore: 89, color: "#ef4444" },
  { region: "Middle East", transactions: 89, riskScore: 78, color: "#ec4899" },
]

const alertTypeData = [
  { type: "High Risk Transaction", count: 45, percentage: 32 },
  { type: "Unusual Location", count: 38, percentage: 27 },
  { type: "Velocity Check", count: 29, percentage: 21 },
  { type: "Merchant Risk", count: 18, percentage: 13 },
  { type: "Pattern Anomaly", count: 10, percentage: 7 },
]

const aiPerformanceData = [
  { metric: "Accuracy", value: 94.2, trend: "up", change: "+2.1%" },
  { metric: "Precision", value: 91.8, trend: "up", change: "+1.5%" },
  { metric: "Recall", value: 89.3, trend: "down", change: "-0.8%" },
  { metric: "F1 Score", value: 90.5, trend: "up", change: "+0.9%" },
]

const chartConfig = {
  highRisk: {
    label: "High Risk",
    color: "hsl(var(--destructive))",
  },
  mediumRisk: {
    label: "Medium Risk",
    color: "hsl(var(--accent))",
  },
  lowRisk: {
    label: "Low Risk",
    color: "hsl(var(--secondary))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--primary))",
  },
  suspicious: {
    label: "Suspicious",
    color: "hsl(var(--destructive))",
  },
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics & Reports</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Comprehensive fraud detection analytics and insights
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="7d">
            <SelectTrigger className="w-full sm:w-32 bg-muted/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="glow-blue flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 w-full">
        {aiPerformanceData.map((metric) => {
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={metric.metric} className="bg-card/50 border-border/50 w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  AI {metric.metric}
                </CardTitle>
                <Shield className="h-4 w-4 text-primary flex-shrink-0" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{metric.value}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendIcon
                    className={`h-3 w-3 mr-1 flex-shrink-0 ${metric.trend === "up" ? "text-secondary" : "text-destructive"}`}
                  />
                  <span className="truncate">{metric.change} from last period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Risk Trends Chart */}
      <Card className="bg-card/50 border-border/50 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BarChart3 className="h-5 w-5 flex-shrink-0" />
            Risk Trends Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 sm:h-80 w-full">
            <AreaChart data={riskTrendData} width="100%" height="100%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="highRisk"
                stackId="1"
                stroke="hsl(var(--destructive))"
                fill="hsl(var(--destructive))"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="mediumRisk"
                stackId="1"
                stroke="hsl(var(--accent))"
                fill="hsl(var(--accent))"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="lowRisk"
                stackId="1"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2 w-full">
        {/* Transaction Volume by Hour */}
        <Card className="bg-card/50 border-border/50 w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 flex-shrink-0" />
              Transaction Volume by Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 sm:h-64 w-full">
              <BarChart data={transactionVolumeData} width="100%" height="100%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="suspicious" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Alert Types Distribution */}
        <Card className="bg-card/50 border-border/50 w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChartIcon className="h-5 w-5 flex-shrink-0" />
              Alert Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {alertTypeData.map((item, index) => (
                <div key={item.type} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
                    />
                    <span className="text-sm truncate">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-mono">{item.count}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Risk Distribution */}
      <Card className="bg-card/50 border-border/50 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5 flex-shrink-0" />
            Geographic Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {geographicRiskData.map((region) => (
              <div key={region.region} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-medium">{region.region}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">{region.transactions.toLocaleString()} txns</span>
                    <Badge
                      variant={
                        region.riskScore >= 70 ? "destructive" : region.riskScore >= 40 ? "outline" : "secondary"
                      }
                      className={region.riskScore >= 70 ? "glow-red" : region.riskScore >= 40 ? "" : "glow-green"}
                    >
                      Risk: {region.riskScore}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((region.riskScore / 100) * 100, 100)}%`,
                      backgroundColor: region.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitoring */}
      <Card className="bg-card/50 border-border/50 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 flex-shrink-0" />
            Real-time Risk Monitoring
            <Badge className="ml-2 glow-green">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 w-full">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-primary">1,247</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Transactions/Hour</div>
              <div className="flex items-center justify-center gap-1 text-xs text-secondary mt-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-destructive">23</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Active Alerts</div>
              <div className="flex items-center justify-center gap-1 text-xs text-destructive mt-1">
                <AlertTriangle className="h-3 w-3" />
                Critical
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="text-xl sm:text-2xl font-bold text-accent">94.2%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">AI Accuracy</div>
              <div className="flex items-center justify-center gap-1 text-xs text-secondary mt-1">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
