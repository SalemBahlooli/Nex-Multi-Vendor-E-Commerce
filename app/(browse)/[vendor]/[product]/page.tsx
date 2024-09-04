import React, { useState } from "react";
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

import { checkVendorExists } from "@/actions/vendor";
import NotFoundPage from "../not-found";
import { getProductById } from "@/actions/products";
import ProductDisplay from "./_components/ProductDisplay";

interface ProductPageProps {
  params: {
    vendor: string;
    product: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { vendor: vendorId, product: productSlug } = params;

  // if (!vendorId || !productSlug) {
  //   console.error("Vendor ID or Product Slug is undefined");
  //   return <NotFoundPage />;
  // }

  const productId = productSlug.split("-")[0];
  console.log("🚀 ~ ProductPage ~ productId:", productId);

  // if (!productId) {
  //   console.error("Unable to extract Product ID from slug");
  //   return <NotFoundPage />;
  // }

  // const vendorExists = await checkVendorExists(vendorId);

  // if (!vendorExists) {
  //   return <NotFoundPage />;
  // }

  const product = await getProductById(productId);
  console.log("🚀 ~ ProductPage ~ product:", product);

  // if (!product || product.vendor.id !== vendorId) {
  //   return <NotFoundPage />;
  // }

  return <ProductDisplay product={product} />;
};

export default ProductPage;
