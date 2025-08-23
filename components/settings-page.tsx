"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Bell,
  Users,
  Brain,
  Database,
  Mail,
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle,
  Save,
  RotateCcw,
} from "lucide-react"

export function SettingsPage() {
  // AI Model Settings
  const [riskThreshold, setRiskThreshold] = useState([75])
  const [autoBlock, setAutoBlock] = useState(true)
  const [aiSensitivity, setAiSensitivity] = useState([85])
  const [modelVersion, setModelVersion] = useState("v2.1")

  // Alert Settings
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [alertFrequency, setAlertFrequency] = useState("immediate")

  // Security Settings
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [ipWhitelist, setIpWhitelist] = useState(true)

  // System Settings
  const [dataRetention, setDataRetention] = useState("90")
  const [apiRateLimit, setApiRateLimit] = useState("1000")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  const handleSaveSettings = () => {
    console.log("[v0] Saving settings...")
    // Here you would typically save settings to backend
  }

  const handleResetSettings = () => {
    console.log("[v0] Resetting settings to defaults...")
    // Reset all settings to default values
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Configure AI FraudShield system preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="glow-blue" onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Model Configuration */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Model Version</Label>
              <Select value={modelVersion} onValueChange={setModelVersion}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v2.1">
                    v2.1 (Latest)
                    <Badge className="ml-2 glow-green">Recommended</Badge>
                  </SelectItem>
                  <SelectItem value="v2.0">v2.0 (Stable)</SelectItem>
                  <SelectItem value="v1.9">v1.9 (Legacy)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Risk Threshold: {riskThreshold[0]}%</Label>
              <Slider
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Transactions above this threshold will be flagged as suspicious
              </p>
            </div>

            <div className="space-y-2">
              <Label>AI Sensitivity: {aiSensitivity[0]}%</Label>
              <Slider
                value={aiSensitivity}
                onValueChange={setAiSensitivity}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher sensitivity detects more potential fraud but may increase false positives
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-block High Risk Transactions</Label>
                <p className="text-xs text-muted-foreground">Automatically block transactions above 90% risk score</p>
              </div>
              <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
            </div>
          </CardContent>
        </Card>

        {/* Alert & Notification Settings */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              Alert & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Alert Frequency</Label>
              <Select value={alertFrequency} onValueChange={setAlertFrequency}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <Label>Email Alerts</Label>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <Label>SMS Alerts</Label>
                </div>
                <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Push Notifications</Label>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>

            {emailAlerts && (
              <div className="space-y-2">
                <Label>Email Recipients</Label>
                <Input placeholder="admin@company.com, security@company.com" className="bg-muted/50 border-border/50" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-xs text-muted-foreground">Require 2FA for all admin users</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                {twoFactorAuth && <CheckCircle className="h-4 w-4 text-secondary" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>IP Whitelist</Label>
                <p className="text-xs text-muted-foreground">Restrict access to approved IP addresses</p>
              </div>
              <Switch checked={ipWhitelist} onCheckedChange={setIpWhitelist} />
            </div>

            {ipWhitelist && (
              <div className="space-y-2">
                <Label>Allowed IP Addresses</Label>
                <Input placeholder="192.168.1.0/24, 10.0.0.0/8" className="bg-muted/50 border-border/50" />
              </div>
            )}

            <div className="space-y-2">
              <Label>API Keys</Label>
              <div className="flex gap-2">
                <Input value="sk-1234567890abcdef..." readOnly className="bg-muted/50 border-border/50 font-mono" />
                <Button variant="outline" size="icon">
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-destructive" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Data Retention Period (days)</Label>
              <Select value={dataRetention} onValueChange={setDataRetention}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>API Rate Limit (requests/hour)</Label>
              <Select value={apiRateLimit} onValueChange={setApiRateLimit}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1,000</SelectItem>
                  <SelectItem value="5000">5,000</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-xs text-muted-foreground">Temporarily disable fraud detection</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                {maintenanceMode && <AlertTriangle className="h-4 w-4 text-destructive" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>System Status</Label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span className="text-sm">All systems operational</span>
                <Badge className="ml-auto glow-green">Healthy</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Database Connection</Label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-sm">Connected to primary database</span>
                <Badge className="ml-auto glow-blue">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Section */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Admin Users</h4>
                <p className="text-sm text-muted-foreground">Manage system administrators</p>
              </div>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Active Admins</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Pending Invites</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
