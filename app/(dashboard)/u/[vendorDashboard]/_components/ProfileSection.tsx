"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vendor } from "../page";
import { User, FileText, Star, Calendar, Mail, Phone } from "lucide-react";
import Image from "next/image";

type ProfileSectionProps = {
  vendor: Vendor;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({ vendor }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <User className="mr-2" /> معلومات الملف الشخصي
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
            <Image
              src={vendor.profileImage || "/placeholder-profile.jpg"}
              alt={vendor.name}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-2xl font-bold text-gray-800">{vendor.name}</h2>
            <p className="text-gray-600">{vendor.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <FileText className="mr-2 text-blue-500" /> الوصف
              </label>
              <textarea
                value={vendor.description || ""}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 p-2"
                readOnly
                rows={3}
              />
            </div>
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <Star className="mr-2 text-yellow-500" /> التقييم
              </label>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(vendor.rate || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {vendor.rate ? vendor.rate.toFixed(1) : "لا يوجد تقييم"}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="mr-2 text-green-500" /> تاريخ الانضمام
              </label>
              <input
                type="text"
                value={new Date(vendor.createdAt).toLocaleDateString("ar-EG")}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 p-2"
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            تحديث الملف الشخصي
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
