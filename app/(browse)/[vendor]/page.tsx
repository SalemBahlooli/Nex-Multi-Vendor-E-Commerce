"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  UserPlus,
  UserCheck,
  ShoppingBag,
  Package,
  DollarSign,
  Calendar,
  ShoppingCart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserPageProps = {
  params: {
    id: string;
  };
};

type Vendor = {
  id: string;
  name: string;
  description: string;
  rate: number;
  products: Product[];
  totalSales: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rate: number;
  images: { url: string }[];
  reviews: Review[];
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  userName: string;
};

const VendorPage = ({ params }: UserPageProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // In a real application, you would fetch this data based on the params.id
  // For this example, we'll use dummy data
  const vendor: Vendor = {
    id: "1",
    name: "متجر الأناقة",
    description: "نقدم أفضل الملابس والإكسسوارات العصرية بأسعار معقولة",
    rate: 4.7,
    totalSales: 1500,
    products: [
      {
        id: "1",
        name: "قميص أنيق",
        description: "قميص أبيض أنيق مناسب لجميع المناسبات",
        price: 59.99,
        rate: 4.5,
        images: [{ url: "/images/t1.jpg" }],
        reviews: [
          { id: "1", rating: 5, comment: "قميص رائع!", userName: "أحمد" },
          { id: "2", rating: 4, comment: "جودة ممتازة", userName: "سارة" },
        ],
      },
      // Add more products as needed
    ],
  };

  const allReviews = vendor.products.flatMap((product) =>
    product.reviews.map((review) => ({ ...review, productName: product.name }))
  );

  const handleFollowClick = () => {
    // In the future, this function will handle the actual follow/unfollow action
    // For now, we'll just toggle the state
    setIsFollowing(!isFollowing);
  };

  return (
    <div dir="rtl" className="container mx-auto px-4 py-8 font-arabic">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6">
            <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
              <div className="w-24 h-24 relative rounded-full overflow-hidden mb-4 md:mb-0 md:mr-4">
                <Image
                  src="/images/vendor-logo.jpg"
                  alt={vendor.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-center md:text-right">
                <h1 className="text-3xl font-bold">{vendor.name}</h1>
                <div className="flex items-center justify-center md:justify-start mt-2">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{vendor.rate.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleFollowClick}
              variant={isFollowing ? "outline" : "default"}
              className="flex items-center"
            >
              {isFollowing ? (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  متابَع
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  متابعة
                </>
              )}
            </Button>
          </div>

          <p className="text-gray-600 mb-6">{vendor.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="flex items-center p-4">
                <ShoppingBag className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">إجمالي المبيعات</p>
                  <p className="text-lg font-semibold">{vendor.totalSales}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <Package className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">عدد المنتجات</p>
                  <p className="text-lg font-semibold">
                    {vendor.products.length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <DollarSign className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">متوسط السعر</p>
                  <p className="text-lg font-semibold">
                    $
                    {(
                      vendor.products.reduce(
                        (sum, product) => sum + product.price,
                        0
                      ) / vendor.products.length
                    ).toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-4">
                <Calendar className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">تاريخ الانضمام</p>
                  <p className="text-lg font-semibold">
                    {/* {new Date(vendor.createdAt).toLocaleDateString("ar-EG")} */}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="products">
        <TabsList className="mb-4">
          <TabsTrigger value="products">المنتجات</TabsTrigger>
          <TabsTrigger value="reviews">التقييمات</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendor.products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="relative h-80 mb-4">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{product.rate.toFixed(1)}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> أضف إلى السلة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-4">
            {allReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <p className="text-sm text-gray-600">
                        {review.productName}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorPage;
