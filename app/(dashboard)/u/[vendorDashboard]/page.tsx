import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  Package,
  DollarSign,
  User,
  NotebookPen,
} from "lucide-react";
import { ProfileSection } from "./_components/ProfileSection";
import { ProductsSection } from "./_components/ProductsSection";
import { EarningsSection } from "./_components/EarningsSection";
import { OrdersSection } from "./_components/OrdersSection";
import { dummyVendorData } from "@/app/(browse)/[vendor]/[product]/dummyProduct";
import Decimal from "decimal.js";
import VendorReviews from "./_components/ReviewsSection";
type Status = "PENDING" | "AVAILABLE" | "SOLD_OUT";

export type Product = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  price: Decimal;
  vendorPercentage: Decimal;
  vendorId: string;
  status: Status;
  purchaseCount: number;
  rate?: number;
  colors: { id: string; name: string; hexCode: string }[];
  sizes: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  sku: string;
  images: { id: string; url: string }[];
  reviews: { id: string; rating: number; comment: string; userId: string }[];
  orderItems: {
    id: string;
    quantity: number;
    price: Decimal;
    order: { id: string; status: string };
  }[];
};

export type Vendor = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  products: Product[];
  rate?: number;
  earnings: VendorEarning[];
  userId: string;
  profileImage: string;
};

export type VendorEarning = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: Decimal;
  orderId: string;
  productId: string;
};
type Review = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  comment: string | null;
  product: { id: string; name: string };
  productId: string;
  user: { id: string; name: string };
  userId: string;
};

const Dashboard = () => {
  const vendor = dummyVendorData;
  const allReviews: Review[] = vendor.products.flatMap((product) =>
    product.reviews.map((review) => ({
      id: review.id,
      createdAt: product.createdAt, // Assuming the review was created when the product was created
      updatedAt: product.updatedAt, // Assuming the review was last updated when the product was updated
      rating: review.rating,
      comment: review.comment,
      product: {
        id: product.id,
        name: product.name,
      },
      productId: product.id,
      user: {
        id: review.userId,
        name: `User ${review.userId}`, // Placeholder for user name
      },
      userId: review.userId,
    }))
  );
  return (
    <div className="containe  px-6 py-8 flex flex-col md:flex-row">
      <div className="flex-grow ">
        <h1 className="text-3xl text-center font-bold mb-6">
          لوحة تحكم {vendor.name}
        </h1>
        <Card className="w-full h-auto">
          <CardContent className="p-6">
            <Tabs
              defaultValue="orders"
              className="h-full flex flex-col md:flex-row"
            >
              <TabsContent value="orders" className="flex-grow">
                <OrdersSection products={vendor.products} />
              </TabsContent>
              <TabsContent value="products" className="flex-grow">
                <ProductsSection products={vendor.products} />
              </TabsContent>
              <TabsContent value="earnings" className="flex-grow">
                <EarningsSection earnings={vendor.earnings} />
              </TabsContent>
              <TabsContent value="reviews" className="flex-grow">
                <VendorReviews reviews={allReviews} />
              </TabsContent>
              <TabsContent value="profile" className="flex-grow">
                <ProfileSection vendor={vendor} />
              </TabsContent>

              <TabsList className="flex flex-row md:flex-col h-auto md:h-full bg-muted p-1 md:w-[200px] ml-4">
                <TabsTrigger
                  value="orders"
                  className="w-full flex items-center justify-start gap-2 py-4 px-4"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="hidden md:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="w-full flex items-center justify-start gap-2 py-4 px-4"
                >
                  <Package className="h-5 w-5" />
                  <span className="hidden md:inline">Products</span>
                </TabsTrigger>
                <TabsTrigger
                  value="earnings"
                  className="w-full flex items-center justify-start gap-2 py-4 px-4"
                >
                  <DollarSign className="h-5 w-5" />
                  <span className="hidden md:inline">Earnings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="w-full flex items-center justify-start gap-2 py-4 px-4"
                >
                  <NotebookPen className="h-5 w-5" />
                  <span className="hidden md:inline">Reviews</span>
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="w-full flex items-center justify-start gap-2 py-4 px-4"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">Profile</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
