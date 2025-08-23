"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { FileUploadModal } from "./file-upload-modal"

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
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Monitor and analyze all transaction activity</p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <FileUploadModal />
          <Button className="glow-blue flex-1 sm:flex-none">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, user, merchant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:glow-blue transition-all w-full"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full bg-muted/50 border-border/50">
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
              <SelectTrigger className="w-full bg-muted/50 border-border/50">
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
      <Card className="bg-card/50 border-border/50 w-full">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {mockTransactions.length} transactions
          </p>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="w-full overflow-x-auto">
            <div className="rounded-md border border-border/50 min-w-full">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="min-w-[120px]">Transaction ID</TableHead>
                    <TableHead className="min-w-[100px]">Amount</TableHead>
                    <TableHead className="min-w-[180px] hidden sm:table-cell">User</TableHead>
                    <TableHead className="min-w-[150px]">Merchant</TableHead>
                    <TableHead className="min-w-[120px] hidden md:table-cell">Location</TableHead>
                    <TableHead className="min-w-[120px] hidden lg:table-cell">Date</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">Risk Score</TableHead>
                    <TableHead className="min-w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono font-medium text-xs sm:text-sm">{transaction.id}</TableCell>
                      <TableCell className="font-mono font-semibold text-xs sm:text-sm">
                        ${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{transaction.user}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{transaction.merchant}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">{transaction.location}</TableCell>
                      <TableCell className="text-xs sm:text-sm font-mono hidden lg:table-cell">
                        {transaction.date}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 sm:gap-2">
                          {getStatusIcon(transaction.status)}
                          {getStatusBadge(transaction.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                          <span className="font-mono text-xs sm:text-sm">{transaction.riskScore}</span>
                          {getRiskBadge(transaction.riskScore)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent text-xs">
                          <Eye className="h-3 w-3" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
