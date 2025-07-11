"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Upload, Tag } from "lucide-react"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: any) => void
}

export function AddProductModal({ isOpen, onClose, onSave }: AddProductModalProps) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    barcode: "",
    category: "",
    tags: [] as string[],
    images: [] as string[],
    variants: [] as any[],
    inventory: {
      trackQuantity: false,
      quantity: 0,
      allowBackorder: false,
    },
    seo: {
      title: "",
      description: "",
    },
    status: "draft",
  })

  const [newTag, setNewTag] = useState("")
  const [newVariant, setNewVariant] = useState({ name: "", values: [""] })

  const handleAddTag = () => {
    if (newTag && !product.tags.includes(newTag)) {
      setProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleAddVariant = () => {
    if (newVariant.name && newVariant.values[0]) {
      setProduct((prev) => ({
        ...prev,
        variants: [...prev.variants, { ...newVariant }],
      }))
      setNewVariant({ name: "", values: [""] })
    }
  }

  const handleSave = () => {
    onSave(product)
    onClose()
    setProduct({
      name: "",
      description: "",
      price: "",
      comparePrice: "",
      sku: "",
      barcode: "",
      category: "",
      tags: [],
      images: [],
      variants: [],
      inventory: {
        trackQuantity: false,
        quantity: 0,
        allowBackorder: false,
      },
      seo: {
        title: "",
        description: "",
      },
      status: "draft",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a new product for your store</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={product.category}
                  onValueChange={(value) => setProduct((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={product.description}
                onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Compare at Price</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  value={product.comparePrice}
                  onChange={(e) => setProduct((prev) => ({ ...prev, comparePrice: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={product.sku}
                  onChange={(e) => setProduct((prev) => ({ ...prev, sku: e.target.value }))}
                  placeholder="Enter SKU"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={product.barcode}
                  onChange={(e) => setProduct((prev) => ({ ...prev, barcode: e.target.value }))}
                  placeholder="Enter barcode"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to select files</p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Choose Files
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Variant Name</Label>
                    <Input
                      value={newVariant.name}
                      onChange={(e) => setNewVariant((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Size, Color"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Values</Label>
                    <Input
                      value={newVariant.values[0]}
                      onChange={(e) => setNewVariant((prev) => ({ ...prev, values: [e.target.value] }))}
                      placeholder="e.g., Small, Medium, Large"
                    />
                  </div>
                </div>
                <Button onClick={handleAddVariant} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>

                {product.variants.map((variant, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{variant.name}</h4>
                          <p className="text-sm text-gray-600">{variant.values.join(", ")}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setProduct((prev) => ({
                              ...prev,
                              variants: prev.variants.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trackQuantity"
                    checked={product.inventory.trackQuantity}
                    onCheckedChange={(checked) =>
                      setProduct((prev) => ({
                        ...prev,
                        inventory: { ...prev.inventory, trackQuantity: checked },
                      }))
                    }
                  />
                  <Label htmlFor="trackQuantity">Track quantity</Label>
                </div>

                {product.inventory.trackQuantity && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={product.inventory.quantity}
                        onChange={(e) =>
                          setProduct((prev) => ({
                            ...prev,
                            inventory: { ...prev.inventory, quantity: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowBackorder"
                        checked={product.inventory.allowBackorder}
                        onCheckedChange={(checked) =>
                          setProduct((prev) => ({
                            ...prev,
                            inventory: { ...prev.inventory, allowBackorder: checked },
                          }))
                        }
                      />
                      <Label htmlFor="allowBackorder">Allow customers to purchase when out of stock</Label>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Search Engine Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={product.seo.title}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, title: e.target.value },
                      }))
                    }
                    placeholder="Enter SEO title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={product.seo.description}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, description: e.target.value },
                      }))
                    }
                    placeholder="Enter SEO description"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
