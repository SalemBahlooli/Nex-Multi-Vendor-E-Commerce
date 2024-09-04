"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Truck,
  RefreshCw,
  Shield,
  Heart,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDisplayProps {
  product: any; // Replace 'any' with your actual Product type
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  // console.log("🚀 ~ product:", product);
  if (!product) {
    return <div>Loading...</div>;
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  const [selectedColor, setSelectedColor] = useState<any>(null);

  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);
  return (
    <div className="container mx-auto px-4 py-8 font-arabic">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Product details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rate || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews.length} reviews
                </span>
              </div>
              <div className="mb-6">
                {product.discountPercentage ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-green-600">
                      ${discountedPrice!.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge className="bg-red-500 text-white">
                      <Tag className="w-4 h-4 mr-1" />
                      {product.discountPercentage}% OFF
                    </Badge>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="mb-6">{product.description}</p>
              <div className="flex space-x-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Options Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Options</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Color selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Colors</h4>
                    <div className="flex gap-2">
                      {product.colors.map((color: any) => (
                        <button
                          key={color.id}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor?.id === color.id
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color.hexCode }}
                          onClick={() => setSelectedColor(color)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="font-medium mb-2">Sizes</h4>
                  <div className="flex gap-2">
                    {product.sizes.map((size: any) => (
                      <Badge
                        key={size.id}
                        variant="outline"
                        className="cursor-pointer"
                      >
                        {size.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={
                      product.vendor.image || "/placeholder-vendor-image.jpg"
                    }
                    alt={product.vendor.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {product.vendor.name}
                  </h3>
                  {product.vendor.rate !== null && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.vendor.rate!)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {product.vendor.rate!.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {product.vendor.description && (
                <p className="mt-4 text-sm text-gray-600">
                  {product.vendor.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Shipping Info Card */}
          <Card>
            <CardContent className="p-6 flex justify-between">
              <div className="flex items-center">
                <Truck className="h-6 w-6 mr-2" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-6 w-6 mr-2" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                <span>2-Year Warranty</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side: Product image */}
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-square">
              {selectedColor ? (
                <>
                  <Image
                    src={
                      selectedColor.tshirtImage ||
                      "/placeholder-tshirt-image.jpg"
                    }
                    alt={`${product.name} in ${selectedColor.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  <Image
                    src={
                      selectedColor.isLight
                        ? product.darkDesignImage ||
                          "/placeholder-light-design.png"
                        : product.lightDesignImage ||
                          "/placeholder-dark-design.png"
                    }
                    alt={`${product.name} design`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-t-lg"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-lg">
                  No image available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Details and Reviews Card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>SKU: {product.sku}</li>
                <li>Vendor: {product.vendor.name}</li>
                <li>Status: {product.status}</li>
                <li>Purchase Count: {product.purchaseCount}</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-4 mt-4">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDisplay;
