'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Badge } from '@workspace/ui/components/badge'
import { MoreHorizontal, Plus } from 'lucide-react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { AddProductDialog } from '@/components/dashboard/maneger/add-product-dialog'

type ProductStatus = 'in-stock' | 'low-stock' | 'out-of-stock'
type TProduct = {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  reorderLevel: number
  status: ProductStatus
}

// demo products data
const products: TProduct[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    sku: 'LAP-001',
    price: 1299.99,
    stock: 45,
    reorderLevel: 10,
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    sku: 'HEAD-002',
    price: 199.99,
    stock: 78,
    reorderLevel: 15,
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'Smartphone',
    sku: 'PHONE-003',
    price: 899.99,
    stock: 8,
    reorderLevel: 10,
    status: 'low-stock',
  },
  {
    id: '4',
    name: 'Smart Watch',
    sku: 'WATCH-004',
    price: 249.99,
    stock: 0,
    reorderLevel: 5,
    status: 'out-of-stock',
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    sku: 'SPEAK-005',
    price: 129.99,
    stock: 32,
    reorderLevel: 8,
    status: 'in-stock',
  },
]

export default function ProductsPage() {
  const [showAddProduct, setShowAddProduct] = useState(false)

  //   if (user?.role === "user") {
  //     return (
  //       <div className="flex h-full items-center justify-center">
  //         <p className="text-muted-foreground">You don&apos;t have permission to view this page.</p>
  //       </div>
  //     )
  //   }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">Manage your products and inventory.</p>
        </div>
        <Button onClick={() => setShowAddProduct(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Search products..." className="max-w-sm" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>A list of all products in your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.reorderLevel}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product?.status === 'in-stock'
                          ? 'default'
                          : product.status === 'low-stock'
                            ? 'destructive'
                            : 'default'
                      }
                    >
                      {product.status === 'in-stock'
                        ? 'In Stock'
                        : product.status === 'low-stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuItem>Update reorder level</DropdownMenuItem>
                        <DropdownMenuItem>Update stock</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddProductDialog open={showAddProduct} onOpenChange={setShowAddProduct} />
    </div>
  )
}
