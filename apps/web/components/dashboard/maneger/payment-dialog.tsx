"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { CreditCard, DollarSign } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memo: any
  onPaymentRecorded: (memoId: string, amount: number, method: string) => void
}

export function PaymentDialog({ open, onOpenChange, memo, onPaymentRecorded }: PaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const paymentAmount = Number.parseFloat(amount)
    if (paymentAmount > memo.due) {
      alert("Payment amount cannot exceed the due amount")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      onPaymentRecorded(memo.id, paymentAmount, method)
      setIsLoading(false)
      onOpenChange(false)
      setAmount("")
      setMethod("")
    }, 1000)
  }

  const handleFullPayment = () => {
    setAmount(memo.due.toString())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Record Payment
          </DialogTitle>
          <DialogDescription>Record a payment for memo {memo?.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-lg font-bold">${memo?.total.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Paid</p>
              <p className="text-lg font-bold text-green-600">${memo?.paid.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Due</p>
              <p className="text-lg font-bold text-red-600">${memo?.due.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="payment-amount"
                      type="number"
                      step="0.01"
                      max={memo?.due}
                      className="pl-10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleFullPayment}
                    className="w-full bg-transparent"
                  >
                    Pay Full Amount (${memo?.due.toFixed(2)})
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="payment-method" className="text-right">
                  Method
                </Label>
                <Select value={method} onValueChange={setMethod} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="mobile-payment">Mobile Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !amount || !method}>
                {isLoading ? "Recording..." : "Record Payment"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
