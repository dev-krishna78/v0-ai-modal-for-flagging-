"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  LayoutDashboard,
  CreditCard,
  AlertTriangle,
  FileText,
  Settings,
  Search,
  Bell,
  Shield,
  Menu,
  X,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function DashboardLayout({ children, activeTab = "dashboard", onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: "3" },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center px-4 gap-4">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary glow-blue">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI FraudShield
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md ml-auto mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions, users, alerts..."
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:glow-blue transition-all"
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive glow-red">
              3
            </Badge>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
          top-16
        `}
        >
          <div className="flex flex-col h-full pt-6">
            <nav className="flex-1 px-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`
                      w-full justify-start gap-3 h-11 transition-all
                      ${
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground glow-blue"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }
                    `}
                    onClick={() => {
                      onTabChange?.(item.id)
                      setSidebarOpen(false)
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto h-5 px-2 text-xs bg-destructive glow-red">{item.badge}</Badge>
                    )}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
