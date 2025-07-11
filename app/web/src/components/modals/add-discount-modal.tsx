"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Percent, DollarSign, Truck } from "lucide-react"
import { format } from "date-fns"

interface AddDiscountModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (discount: any) => void
}

export function AddDiscountModal({ isOpen, onClose, onSave }: AddDiscountModalProps) {
  const [discount, setDiscount] = useState({
    code: "",
    type: "percentage", // percentage, fixed, free_shipping
    value: "",
    description: "",
    startDate: new Date(),
    endDate: undefined as Date | undefined,
    usageLimit: {
      enabled: false,
      total: 0,
      perCustomer: 0,
    },
    minimumRequirements: {
      enabled: false,
      type: "amount", // amount, quantity
      value: 0,
    },
    customerEligibility: "all", // all, specific, groups
    status: "active",
  })

  const handleSave = () => {
    onSave(discount)
    onClose()
    setDiscount({
      code: "",
      type: "percentage",
      value: "",
      description: "",
      startDate: new Date(),
      endDate: undefined,
      usageLimit: {
        enabled: false,
        total: 0,
        perCustomer: 0,
      },
      minimumRequirements: {
        enabled: false,
        type: "amount",
        value: 0,
      },
      customerEligibility: "all",
      status: "active",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Discount</DialogTitle>
          <DialogDescription>Create a new discount code for your store</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="usage">Usage Limits</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                value={discount.code}
                onChange={(e) => setDiscount((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                placeholder="SAVE20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={discount.description}
                onChange={(e) => setDiscount((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="20% off all items"
              />
            </div>

            <div className="space-y-4">
              <Label>Discount Type</Label>
              <div className="grid grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer transition-colors ${discount.type === "percentage" ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setDiscount((prev) => ({ ...prev, type: "percentage" }))}
                >
                  <CardContent className="flex flex-col items-center p-4">
                    <Percent className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Percentage</h3>
                    <p className="text-sm text-gray-600 text-center">% off products</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${discount.type === "fixed" ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setDiscount((prev) => ({ ...prev, type: "fixed" }))}
                >
                  <CardContent className="flex flex-col items-center p-4">
                    <DollarSign className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Fixed Amount</h3>
                    <p className="text-sm text-gray-600 text-center">$ off order</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-colors ${discount.type === "free_shipping" ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setDiscount((prev) => ({ ...prev, type: "free_shipping" }))}
                >
                  <CardContent className="flex flex-col items-center p-4">
                    <Truck className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-gray-600 text-center">Free delivery</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {discount.type !== "free_shipping" && (
              <div className="space-y-2">
                <Label htmlFor="value">{discount.type === "percentage" ? "Percentage (%)" : "Amount ($)"}</Label>
                <Input
                  id="value"
                  type="number"
                  value={discount.value}
                  onChange={(e) => setDiscount((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder={discount.type === "percentage" ? "20" : "10.00"}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(discount.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={discount.startDate}
                      onSelect={(date) => date && setDiscount((prev) => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {discount.endDate ? format(discount.endDate, "PPP") : "No end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={discount.endDate}
                      onSelect={(date) => setDiscount((prev) => ({ ...prev, endDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="usageLimit"
                    checked={discount.usageLimit.enabled}
                    onCheckedChange={(checked) =>
                      setDiscount((prev) => ({
                        ...prev,
                        usageLimit: { ...prev.usageLimit, enabled: checked },
                      }))
                    }
                  />
                  <Label htmlFor="usageLimit">Limit number of times this discount can be used</Label>
                </div>

                {discount.usageLimit.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="totalLimit">Total usage limit</Label>
                      <Input
                        id="totalLimit"
                        type="number"
                        value={discount.usageLimit.total}
                        onChange={(e) =>
                          setDiscount((prev) => ({
                            ...prev,
                            usageLimit: { ...prev.usageLimit, total: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        placeholder="100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customerLimit">Limit per customer</Label>
                      <Input
                        id="customerLimit"
                        type="number"
                        value={discount.usageLimit.perCustomer}
                        onChange={(e) =>
                          setDiscount((prev) => ({
                            ...prev,
                            usageLimit: { ...prev.usageLimit, perCustomer: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        placeholder="1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Minimum Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="minimumRequirements"
                    checked={discount.minimumRequirements.enabled}
                    onCheckedChange={(checked) =>
                      setDiscount((prev) => ({
                        ...prev,
                        minimumRequirements: { ...prev.minimumRequirements, enabled: checked },
                      }))
                    }
                  />
                  <Label htmlFor="minimumRequirements">Set minimum requirements</Label>
                </div>

                {discount.minimumRequirements.enabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Requirement Type</Label>
                      <Select
                        value={discount.minimumRequirements.type}
                        onValueChange={(value) =>
                          setDiscount((prev) => ({
                            ...prev,
                            minimumRequirements: { ...prev.minimumRequirements, type: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="amount">Minimum purchase amount</SelectItem>
                          <SelectItem value="quantity">Minimum quantity of items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirementValue">
                        {discount.minimumRequirements.type === "amount" ? "Minimum Amount ($)" : "Minimum Quantity"}
                      </Label>
                      <Input
                        id="requirementValue"
                        type="number"
                        value={discount.minimumRequirements.value}
                        onChange={(e) =>
                          setDiscount((prev) => ({
                            ...prev,
                            minimumRequirements: {
                              ...prev.minimumRequirements,
                              value: Number.parseFloat(e.target.value) || 0,
                            },
                          }))
                        }
                        placeholder={discount.minimumRequirements.type === "amount" ? "50.00" : "2"}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={discount.customerEligibility}
                  onValueChange={(value) => setDiscount((prev) => ({ ...prev, customerEligibility: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All customers</SelectItem>
                    <SelectItem value="specific">Specific customers</SelectItem>
                    <SelectItem value="groups">Customer groups</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Discount</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
