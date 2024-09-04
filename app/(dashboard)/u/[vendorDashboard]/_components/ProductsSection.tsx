"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "../page";
import {
  PlusCircle,
  Edit,
  Trash2,
  Star,
  Package,
  DollarSign,
  ShoppingCart,
  Search,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProductsSectionProps = {
  products: Product[];
};

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Package className="mr-2" /> المنتجات
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="البحث عن المنتج..."
              className="pl-10 pr-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة منتج جديد
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>صورة</TableHead>
              <TableHead>اسم المنتج</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>المبيعات</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-16 w-16">
                    <Image
                      src={product.images[0]?.url || "/placeholder-product.jpg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      {product.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-green-600">
                    <DollarSign className="inline-block h-4 w-4 mr-1" />
                    {Number(product.price).toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{product.purchaseCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{product.rate?.toFixed(1) || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
