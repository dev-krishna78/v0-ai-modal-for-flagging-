"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  user: string
  location: string
  merchant: string
  date: string
  status: "completed" | "pending" | "flagged" | "blocked"
  riskScore: number
  category: string
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    amount: 2847.99,
    user: "john.doe@email.com",
    location: "Lagos, Nigeria",
    merchant: "UNKNOWN MERCHANT LLC",
    date: "2024-01-15 03:47",
    status: "flagged",
    riskScore: 95,
    category: "Online Purchase",
  },
  {
    id: "TXN-002",
    amount: 156.5,
    user: "jane.smith@email.com",
    location: "New York, USA",
    merchant: "Amazon.com",
    date: "2024-01-15 14:22",
    status: "completed",
    riskScore: 12,
    category: "E-commerce",
  },
  {
    id: "TXN-003",
    amount: 4200.0,
    user: "mike.wilson@email.com",
    location: "London, UK",
    merchant: "Crypto Exchange Pro",
    date: "2024-01-15 09:15",
    status: "blocked",
    riskScore: 88,
    category: "Cryptocurrency",
  },
  {
    id: "TXN-004",
    amount: 89.99,
    user: "sarah.johnson@email.com",
    location: "Toronto, Canada",
    merchant: "Netflix Inc.",
    date: "2024-01-15 16:30",
    status: "completed",
    riskScore: 5,
    category: "Subscription",
  },
  {
    id: "TXN-005",
    amount: 1250.0,
    user: "alex.brown@email.com",
    location: "Sydney, Australia",
    merchant: "Electronics Store XYZ",
    date: "2024-01-15 11:45",
    status: "pending",
    riskScore: 34,
    category: "Electronics",
  },
]

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    const matchesRisk =
      riskFilter === "all" ||
      (riskFilter === "high" && transaction.riskScore >= 70) ||
      (riskFilter === "medium" && transaction.riskScore >= 30 && transaction.riskScore < 70) ||
      (riskFilter === "low" && transaction.riskScore < 30)

    return matchesSearch && matchesStatus && matchesRisk
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-secondary" />
      case "pending":
        return <Clock className="h-4 w-4 text-accent" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "secondary",
      pending: "outline",
      flagged: "destructive",
      blocked: "destructive",
    } as const

    return (
      <Badge
        variant={variants[status as keyof typeof variants]}
        className={`${status === "flagged" || status === "blocked" ? "glow-red" : ""}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRiskBadge = (riskScore: number) => {
    if (riskScore >= 70) {
      return (
        <Badge variant="destructive" className="glow-red">
          High Risk
        </Badge>
      )
    } else if (riskScore >= 30) {
      return (
        <Badge variant="outline" className="border-accent text-accent">
          Medium Risk
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="glow-green">
          Low Risk
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">Monitor and analyze all transaction activity</p>
        </div>
        <Button className="glow-blue">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, user, merchant, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:glow-blue transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 bg-muted/50 border-border/50">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>

            {/* Risk Filter */}
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full md:w-48 bg-muted/50 border-border/50">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk (70+)</SelectItem>
                <SelectItem value="medium">Medium Risk (30-69)</SelectItem>
                <SelectItem value="low">Low Risk (0-29)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono font-medium">{transaction.id}</TableCell>
                    <TableCell className="font-mono font-semibold">${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{transaction.user}</TableCell>
                    <TableCell className="text-sm">{transaction.merchant}</TableCell>
                    <TableCell className="text-sm">{transaction.location}</TableCell>
                    <TableCell className="text-sm font-mono">{transaction.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {getStatusBadge(transaction.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{transaction.riskScore}</span>
                        {getRiskBadge(transaction.riskScore)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                        <Eye className="h-3 w-3" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
