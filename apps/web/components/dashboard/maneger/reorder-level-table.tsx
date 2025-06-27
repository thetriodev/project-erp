"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"

export function ReorderLevelTable() {
  const products = [
    {
      name: "Smartphone",
      sku: "PHONE-003",
      currentStock: 8,
      reorderLevel: 10,
      status: "low-stock",
    },
    {
      name: "Smart Watch",
      sku: "WATCH-004",
      currentStock: 0,
      reorderLevel: 5,
      status: "out-of-stock",
    },
    {
      name: "Bluetooth Speaker",
      sku: "SPEAK-005",
      currentStock: 9,
      reorderLevel: 8,
      status: "low-stock",
    },
    {
      name: "Wireless Mouse",
      sku: "MOUSE-006",
      currentStock: 3,
      reorderLevel: 5,
      status: "low-stock",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Reorder Level</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.sku}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>{product.currentStock}</TableCell>
            <TableCell>{product.reorderLevel}</TableCell>
            <TableCell>
              <Badge
                variant={
                  product?.status === "out-of-stock"
                    ? "destructive"
                    : product?.status === "low-stock"
                      ? "outline"
                      : "default"
                }
              >
                {product?.status === "out-of-stock"
                  ? "Out of Stock"
                  : product?.status === "low-stock"
                    ? "Low Stock"
                    : "In Stock"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
