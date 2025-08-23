"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileText, X, CheckCircle, AlertCircle, Download } from "lucide-react"

interface FileTransaction {
  id: string
  amount: number
  user: string
  location: string
  merchant: string
  date: string
  category: string
  status?: "valid" | "invalid" | "duplicate"
  error?: string
}

interface UploadedFile {
  name: string
  size: number
  type: string
  transactions: FileTransaction[]
  status: "processing" | "completed" | "error"
  errors: string[]
}

export function FileUploadModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type === "text/csv" || file.type === "application/vnd.ms-excel" || file.name.endsWith(".csv")) {
        processFile(file)
      }
    })
  }

  const processFile = async (file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      transactions: [],
      status: "processing",
      errors: [],
    }

    setUploadedFiles((prev) => [...prev, newFile])

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

      // Expected headers: id, amount, user, location, merchant, date, category
      const requiredHeaders = ["id", "amount", "user", "location", "merchant", "date", "category"]
      const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h))

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`)
      }

      const transactions: FileTransaction[] = []
      const errors: string[] = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim())

        try {
          const transaction: FileTransaction = {
            id: values[headers.indexOf("id")] || `TXN-${Date.now()}-${i}`,
            amount: Number.parseFloat(values[headers.indexOf("amount")]) || 0,
            user: values[headers.indexOf("user")] || "",
            location: values[headers.indexOf("location")] || "",
            merchant: values[headers.indexOf("merchant")] || "",
            date: values[headers.indexOf("date")] || new Date().toISOString(),
            category: values[headers.indexOf("category")] || "Unknown",
            status: "valid",
          }

          // Validation
          if (!transaction.user.includes("@")) {
            transaction.status = "invalid"
            transaction.error = "Invalid email format"
          }
          if (transaction.amount <= 0) {
            transaction.status = "invalid"
            transaction.error = "Invalid amount"
          }

          transactions.push(transaction)
        } catch (error) {
          errors.push(`Row ${i + 1}: ${error}`)
        }
      }

      setUploadedFiles((prev) =>
        prev.map((f) => (f.name === file.name ? { ...f, transactions, status: "completed", errors } : f)),
      )
    } catch (error) {
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.name === file.name
            ? { ...f, status: "error", errors: [error instanceof Error ? error.message : "Unknown error"] }
            : f,
        ),
      )
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName))
  }

  const importTransactions = () => {
    const validTransactions = uploadedFiles.flatMap((f) => f.transactions.filter((t) => t.status === "valid"))

    // Here you would typically send the data to your backend
    console.log("Importing transactions:", validTransactions)

    // Reset and close
    setUploadedFiles([])
    setIsOpen(false)
  }

  const downloadTemplate = () => {
    const csvContent =
      "id,amount,user,location,merchant,date,category\nTXN-001,100.50,user@example.com,New York USA,Sample Store,2024-01-15 10:30,Shopping\n"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transaction_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="glow-green">
          <Upload className="h-4 w-4 mr-2" />
          Import Transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Transaction Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Download */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Need a template?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={downloadTemplate} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Download CSV Template
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Required columns: id, amount, user, location, merchant, date, category
              </p>
            </CardContent>
          </Card>

          {/* File Upload Area */}
          <Card
            className={`bg-card/50 border-border/50 transition-all ${isDragging ? "border-primary glow-blue" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload Transaction Files</h3>
                  <p className="text-sm text-muted-foreground">Drag and drop CSV files here, or click to browse</p>
                </div>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
                  <FileText className="h-4 w-4" />
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="border border-border/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === "processing" && (
                          <Badge variant="outline" className="animate-pulse">
                            Processing...
                          </Badge>
                        )}
                        {file.status === "completed" && (
                          <Badge variant="secondary" className="glow-green">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                        {file.status === "error" && (
                          <Badge variant="destructive" className="glow-red">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Error
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => removeFile(file.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {file.status === "completed" && file.transactions.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex gap-4 text-sm">
                          <span className="text-green-400">
                            Valid: {file.transactions.filter((t) => t.status === "valid").length}
                          </span>
                          <span className="text-red-400">
                            Invalid: {file.transactions.filter((t) => t.status === "invalid").length}
                          </span>
                        </div>

                        <div className="max-h-48 overflow-y-auto border border-border/50 rounded">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/30">
                                <TableHead className="text-xs">ID</TableHead>
                                <TableHead className="text-xs">Amount</TableHead>
                                <TableHead className="text-xs">User</TableHead>
                                <TableHead className="text-xs">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {file.transactions.slice(0, 5).map((transaction, i) => (
                                <TableRow key={i}>
                                  <TableCell className="text-xs font-mono">{transaction.id}</TableCell>
                                  <TableCell className="text-xs">${transaction.amount}</TableCell>
                                  <TableCell className="text-xs">{transaction.user}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={transaction.status === "valid" ? "secondary" : "destructive"}
                                      className="text-xs"
                                    >
                                      {transaction.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          {file.transactions.length > 5 && (
                            <p className="text-xs text-muted-foreground p-2 text-center">
                              ... and {file.transactions.length - 5} more transactions
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {file.errors.length > 0 && (
                      <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded">
                        <p className="text-sm font-medium text-destructive mb-1">Errors:</p>
                        {file.errors.map((error, i) => (
                          <p key={i} className="text-xs text-destructive">
                            {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Import Button */}
          {uploadedFiles.some((f) => f.status === "completed" && f.transactions.some((t) => t.status === "valid")) && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={importTransactions} className="glow-green">
                Import Valid Transactions
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
