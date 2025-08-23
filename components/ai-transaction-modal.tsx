"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Shield, CheckCircle, Brain } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  merchant: string
  date: string
  location: string
  category: string
}

interface AITransactionModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  suspiciousReasons: string[]
}

export function AITransactionModal({ isOpen, onClose, transaction, suspiciousReasons }: AITransactionModalProps) {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFlag = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Auto close after success
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      setReason("")
    }, 2000)
  }

  const handleClose = () => {
    onClose()
    setIsSubmitted(false)
    setReason("")
  }

  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">AI Detected Suspicious Activity</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Review and flag this transaction for security
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!isSubmitted ? (
          <>
            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{transaction.merchant}</span>
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Suspicious
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium">{transaction.date}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{transaction.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <p className="font-medium">{transaction.category}</p>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-medium">AI Analysis</Label>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {suspiciousReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Add any additional context or concerns..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose}>
                Dismiss
              </Button>
              <Button onClick={handleFlag} disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Flagging...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    Flag Transaction
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Transaction Flagged Successfully</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Our security team has been notified and will review this transaction within 24 hours.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
