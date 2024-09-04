"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Star, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dummyCategories,
  dummyColors,
  dummyProducts,
  dummySizes,
  dummyVendors,
} from "../[vendor]/[product]/dummyProduct";

// Types (as defined previously)
type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  vendor: Vendor;
  status: string;
  purchaseCount: number;
  rate?: number;
  colors: Color[];
  sizes: Size[];
  categories: Category[];
  sku: string;
  images: { id: string; url: string }[];
  reviews: Review[];
};

type Vendor = {
  id: string;
  name: string;
  rate?: number;
};

type Color = {
  id: string;
  name: string;
  hexCode: string;
};

type Size = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
  description?: string;
};

type Review = {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
};

type Filters = {
  category: string;
  color: string;
  size: string;
  priceRange: [number, number];
  vendor: string;
};

type SortOption = "priceLowToHigh" | "priceHighToLow" | "rating";

type CategoriesPageProps = {
  products: Product[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  vendors: Vendor[];
};

export default function CategoriesPage({}) {
  const products = dummyProducts;
  const categories = dummyCategories;
  const colors = dummyColors;
  const sizes = dummySizes;
  const vendors = dummyVendors;

  const [filters, setFilters] = useState<Filters>({
    category: "",
    color: "",
    size: "",
    priceRange: [0, 1000],
    vendor: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("priceLowToHigh");

  const handleFilterChange = (
    filterType: keyof Filters,
    value: string | [number, number]
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!filters.category ||
        product.categories.some((cat) => cat.id === filters.category)) &&
      (!filters.color ||
        product.colors.some((color) => color.id === filters.color)) &&
      (!filters.size ||
        product.sizes.some((size) => size.id === filters.size)) &&
      (!filters.vendor || product.vendor.id === filters.vendor) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "rating":
        return (b.rate || 0) - (a.rate || 0);
      default:
        return 0;
    }
  });

  return (
    <div dir="rtl" className="container mx-auto px-4 py-8 font-arabic">
      <div className="flex flex-col md:flex-row">
        {/* Filters */}
        <div className="md:w-1/4 mb-6 md:mb-0 md:pl-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">فلترة</h2>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">الفئة</h3>
                <Select
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">البائع</h3>
                <Select
                  onValueChange={(value) => handleFilterChange("vendor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر البائع" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">اللون</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                        filters.color === color.id
                          ? "border-black"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hexCode }}
                      onClick={() => handleFilterChange("color", color.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">الحجم</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size.id}
                      variant={filters.size === size.id ? "default" : "outline"}
                      onClick={() => handleFilterChange("size", size.id)}
                    >
                      {size.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">نطاق السعر</h3>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value as [number, number])
                  }
                />
                <div className="flex justify-between mt-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product List */}
        <div className="md:w-3/4">
          <div className="mb-4">
            <Select onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priceLowToHigh">
                  السعر: من الأقل إلى الأعلى
                </SelectItem>
                <SelectItem value="priceHighToLow">
                  السعر: من الأعلى إلى الأقل
                </SelectItem>
                <SelectItem value="rating">التقييم</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap -mx-2">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="relative h-48 mb-4">
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>
                          {product.rate ? product.rate.toFixed(1) : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      البائع: {product.vendor.name} (
                      {product.vendor.rate
                        ? product.vendor.rate.toFixed(1)
                        : "N/A"}{" "}
                      ⭐)
                    </div>
                    <Button className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> أضف إلى السلة
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
