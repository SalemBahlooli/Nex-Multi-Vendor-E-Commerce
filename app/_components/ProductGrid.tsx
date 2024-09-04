import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";
import { generateProductUrl } from "@/actions/products";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: Decimal;
  status: string;
  purchaseCount: number;
  rate: number | null;
  images: { url: string }[];
  vendor: {
    id: string;
    name: string;
    image: string;
  };
};

type ProductGridProps = {
  products: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={generateProductUrl(product)}>
            {/* <Link href={`/${product.vendor.id}/${product.id}`} key={product.id}> */}
            <div className="relative h-48">
              <Image
                src={product.images[0]?.url || "/placeholder-product.jpg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
              <Badge className="absolute top-2 right-2 bg-blue-500">
                {product.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 h-12 overflow-hidden">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-green-600">
                  <DollarSign className="inline-block h-5 w-5 mr-1" />
                  {product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{product.rate?.toFixed(1) || "N/A"}</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>{product.purchaseCount} مبيعات</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Avatar>
                  <AvatarImage src={product.vendor.image} />
                  <AvatarFallback>
                    {product.vendor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {product.vendor.name}
                </span>
              </div>
              <Button variant="outline">عرض المنتج</Button>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
