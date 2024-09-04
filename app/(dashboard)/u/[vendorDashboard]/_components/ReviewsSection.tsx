"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Search, MessagesSquare } from "lucide-react";

// This type should match your Prisma schema
type Review = {
  id: string;
  createdAt: Date;
  rating: number;
  comment: string | null;
  product: { id: string; name: string };
  user: { id: string; name: string };
};

type VendorReviewsProps = {
  reviews: Review[];
};

const VendorReviews: React.FC<VendorReviewsProps> = ({ reviews }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter(
    (review) =>
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStarRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <MessagesSquare className="mr-2" /> مراجعات البائع
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="البحث في المراجعات..."
              className="pl-10 pr-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Badge className="mr-2 bg-blue-100 text-blue-800">
              إجمالي المراجعات: {reviews.length}
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800">
              متوسط التقييم:{" "}
              {(
                reviews.reduce((acc, review) => acc + review.rating, 0) /
                reviews.length
              ).toFixed(1)}
            </Badge>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المنتج</TableHead>
              <TableHead>المستخدم</TableHead>
              <TableHead>التقييم</TableHead>
              <TableHead>التعليق</TableHead>
              <TableHead>تاريخ المراجعة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  {review.product.name}
                </TableCell>
                <TableCell>{review.user.name}</TableCell>
                <TableCell>
                  <div className="flex">{getStarRating(review.rating)}</div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {review.comment || "لا يوجد تعليق"}
                </TableCell>
                <TableCell>
                  {new Date(review.createdAt).toLocaleDateString("ar-EG")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredReviews.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            لا توجد مراجعات تطابق بحثك
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorReviews;
