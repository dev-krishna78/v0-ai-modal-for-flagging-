"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  X,
  Search,
  Filter,
  Eye,
  AlertCircle,
  TrendingUp,
  MapPin,
  CreditCard,
} from "lucide-react"

interface Alert {
  id: string
  type: "high_risk_transaction" | "unusual_location" | "velocity_check" | "merchant_risk" | "pattern_anomaly"
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "acknowledged" | "resolved" | "dismissed"
  transactionId: string
  amount: number
  user: string
  location: string
  merchant: string
  timestamp: string
  description: string
  riskScore: number
  aiConfidence: number
}

const mockAlerts: Alert[] = [
  {
    id: "ALT-001",
    type: "high_risk_transaction",
    severity: "critical",
    status: "active",
    transactionId: "TXN-001",
    amount: 2847.99,
    user: "john.doe@email.com",
    location: "Lagos, Nigeria",
    merchant: "UNKNOWN MERCHANT LLC",
    timestamp: "2024-01-15T03:47:00Z",
    description:
      "Transaction amount significantly exceeds user's typical spending pattern and originates from high-risk location",
    riskScore: 95,
    aiConfidence: 92,
  },
  {
    id: "ALT-002",
    type: "unusual_location",
    severity: "high",
    status: "active",
    transactionId: "TXN-003",
    amount: 4200.0,
    user: "mike.wilson@email.com",
    location: "London, UK",
    merchant: "Crypto Exchange Pro",
    timestamp: "2024-01-15T09:15:00Z",
    description: "User typically transacts from North America, this transaction originates from Europe",
    riskScore: 88,
    aiConfidence: 85,
  },
  {
    id: "ALT-003",
    type: "velocity_check",
    severity: "medium",
    status: "acknowledged",
    transactionId: "TXN-005",
    amount: 1250.0,
    user: "alex.brown@email.com",
    location: "Sydney, Australia",
    merchant: "Electronics Store XYZ",
    timestamp: "2024-01-15T11:45:00Z",
    description: "Multiple high-value transactions detected within short time window",
    riskScore: 67,
    aiConfidence: 78,
  },
  {
    id: "ALT-004",
    type: "merchant_risk",
    severity: "high",
    status: "resolved",
    transactionId: "TXN-007",
    amount: 890.5,
    user: "emma.davis@email.com",
    location: "Miami, USA",
    merchant: "SUSPICIOUS VENDOR INC",
    timestamp: "2024-01-14T22:30:00Z",
    description: "Merchant flagged in fraud database with multiple reported incidents",
    riskScore: 82,
    aiConfidence: 94,
  },
  {
    id: "ALT-005",
    type: "pattern_anomaly",
    severity: "medium",
    status: "dismissed",
    transactionId: "TXN-009",
    amount: 156.99,
    user: "david.kim@email.com",
    location: "Seoul, South Korea",
    merchant: "Gaming Platform Pro",
    timestamp: "2024-01-14T18:20:00Z",
    description: "Unusual transaction pattern detected based on user behavior analysis",
    riskScore: 45,
    aiConfidence: 71,
  },
]

export function AlertsPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSearch =
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesType = typeFilter === "all" || alert.type === typeFilter

    return matchesSearch && matchesSeverity && matchesStatus && matchesType
  })

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "high_risk_transaction":
        return <CreditCard className="h-5 w-5" />
      case "unusual_location":
        return <MapPin className="h-5 w-5" />
      case "velocity_check":
        return <TrendingUp className="h-5 w-5" />
      case "merchant_risk":
        return <Shield className="h-5 w-5" />
      case "pattern_anomaly":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: "destructive",
      high: "destructive",
      medium: "outline",
      low: "secondary",
    } as const

    const glowClass = severity === "critical" || severity === "high" ? "glow-red" : ""

    return (
      <Badge variant={variants[severity as keyof typeof variants]} className={glowClass}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "destructive",
      acknowledged: "outline",
      resolved: "secondary",
      dismissed: "secondary",
    } as const

    const glowClass = status === "active" ? "glow-red" : status === "resolved" ? "glow-green" : ""

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={glowClass}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      high_risk_transaction: "High Risk Transaction",
      unusual_location: "Unusual Location",
      velocity_check: "Velocity Check",
      merchant_risk: "Merchant Risk",
      pattern_anomaly: "Pattern Anomaly",
    }
    return labels[type as keyof typeof labels] || type
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`
    } else {
      return `${diffDays} days ago`
    }
  }

  const handleAlertAction = (alertId: string, action: string) => {
    console.log(`[v0] Alert ${alertId} action: ${action}`)
    // Here you would typically update the alert status
  }

  // Summary stats
  const activeAlerts = mockAlerts.filter((alert) => alert.status === "active").length
  const criticalAlerts = mockAlerts.filter((alert) => alert.severity === "critical").length
  const highRiskAlerts = mockAlerts.filter((alert) => alert.severity === "high").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Alerts</h2>
          <p className="text-muted-foreground">Monitor and manage fraud detection alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button className="glow-blue">
            <Shield className="h-4 w-4 mr-2" />
            Security Center
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Alerts</CardTitle>
            <Shield className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">Highest priority incidents</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{highRiskAlerts}</div>
            <p className="text-xs text-muted-foreground">Elevated risk transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Alert Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:glow-blue transition-all"
                />
              </div>
            </div>

            {/* Severity Filter */}
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="high_risk_transaction">High Risk Transaction</SelectItem>
                <SelectItem value="unusual_location">Unusual Location</SelectItem>
                <SelectItem value="velocity_check">Velocity Check</SelectItem>
                <SelectItem value="merchant_risk">Merchant Risk</SelectItem>
                <SelectItem value="pattern_anomaly">Pattern Anomaly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="bg-card/50 border-border/50 hover:bg-card/80 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Alert Icon */}
                  <div
                    className={`
                    flex items-center justify-center w-12 h-12 rounded-lg
                    ${
                      alert.severity === "critical" || alert.severity === "high"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-accent/20 text-accent"
                    }
                  `}
                  >
                    {getAlertIcon(alert.type)}
                  </div>

                  {/* Alert Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{getTypeLabel(alert.type)}</h3>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>

                    <p className="text-muted-foreground">{alert.description}</p>

                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Transaction:</span>
                        <span className="ml-1 font-mono">{alert.transactionId}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="ml-1 font-mono font-semibold">${alert.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">User:</span>
                        <span className="ml-1">{alert.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-1">{alert.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Risk Score:</span>
                        <span className="ml-1 font-mono font-semibold text-destructive">{alert.riskScore}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">AI Confidence:</span>
                        <span className="ml-1 font-mono font-semibold text-primary">{alert.aiConfidence}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <span className="ml-1">{formatTimestamp(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "view")}>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  {alert.status === "active" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "acknowledge")}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "dismiss")}>
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
            <p className="text-muted-foreground text-center">
              No alerts match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
