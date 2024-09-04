"use client";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Upload,
  DollarSign,
  Tag,
  FileText,
  Shirt,
  BarChart,
  Hash,
  Image as ImageIcon,
  Palette,
  Ruler,
  Layers,
  Check,
} from "lucide-react";

const AddProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    status: "PENDING",
    colors: [],
    sizes: [],
    categories: [],
  });
  const [lightDesignImage, setLightDesignImage] = useState(null);
  const [darkDesignImage, setDarkDesignImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    updateProgress();
  };

  const lightInputRef = useRef(null);
  const darkInputRef = useRef(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "light") {
          setLightDesignImage(reader.result);
        } else {
          setDarkDesignImage(reader.result);
        }
        updateProgress();
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProgress = () => {
    const fields = ["name", "description", "price", "sku", "status"];
    const filledFields = fields.filter((field) => productData[field]).length;
    const designProgress =
      (lightDesignImage ? 1 : 0) + (darkDesignImage ? 1 : 0);
    const totalProgress =
      ((filledFields + designProgress) / (fields.length + 2)) * 100;
    setProgress(totalProgress);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const colorOptions = [
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#00FF00" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const categoryOptions = [
    "Men",
    "Women",
    "Unisex",
    "Kids",
    "Sports",
    "Casual",
  ];

  return (
    <div className="container relative mx-auto p-4 max-w-7xl">
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Shirt className="mr-2 h-6 w-6" />
                إضافة منتج جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 mt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات المنتج الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  اسم المنتج
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  وصف المنتج
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price" className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  السعر
                </Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sku" className="flex items-center">
                  <Hash className="mr-2 h-4 w-4" />
                  SKU
                </Label>
                <Input
                  id="sku"
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="status" className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  الحالة
                </Label>
                <Select
                  name="status"
                  onValueChange={(value) =>
                    setProductData({ ...productData, status: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">قيد الانتظار</SelectItem>
                    <SelectItem value="AVAILABLE">متاح</SelectItem>
                    <SelectItem value="SOLD_OUT">نفذت الكمية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الخيارات والفئات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center mb-2">
                  <Palette className="mr-2 h-4 w-4" />
                  الألوان المتاحة
                </Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <motion.div
                      key={color.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        id={`color-${color.name}`}
                        value={color.name}
                        className="sr-only"
                        onChange={() => {
                          const updatedColors = productData.colors.includes(
                            color.name
                          )
                            ? productData.colors.filter((c) => c !== color.name)
                            : [...productData.colors, color.name];
                          setProductData({
                            ...productData,
                            colors: updatedColors,
                          });
                          updateProgress();
                        }}
                      />
                      <label
                        htmlFor={`color-${color.name}`}
                        className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {productData.colors.includes(color.name) && (
                          <Check className="text-white" size={16} />
                        )}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="flex items-center mb-2">
                  <Ruler className="mr-2 h-4 w-4" />
                  المقاسات المتاحة
                </Label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <motion.div
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        id={`size-${size}`}
                        value={size}
                        className="sr-only"
                        onChange={() => {
                          const updatedSizes = productData.sizes.includes(size)
                            ? productData.sizes.filter((s) => s !== size)
                            : [...productData.sizes, size];
                          setProductData({
                            ...productData,
                            sizes: updatedSizes,
                          });
                          updateProgress();
                        }}
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className={`px-3 py-1 rounded-md cursor-pointer ${
                          productData.sizes.includes(size)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {size}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="flex items-center mb-2">
                  <Layers className="mr-2 h-4 w-4" />
                  الفئات
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        value={category}
                        className="sr-only"
                        onChange={() => {
                          const updatedCategories =
                            productData.categories.includes(category)
                              ? productData.categories.filter(
                                  (c) => c !== category
                                )
                              : [...productData.categories, category];
                          setProductData({
                            ...productData,
                            categories: updatedCategories,
                          });
                          updateProgress();
                        }}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className={`px-3 py-1 rounded-full cursor-pointer ${
                          productData.categories.includes(category)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {category}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تصميم المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold flex items-center justify-center w-full text-center">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  معاينة التصميم
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <img
                      src="/images/light-tshirt.png"
                      alt="Light T-Shirt"
                      className="w-full"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] outline-2 outline-white outline-dashed rounded-lg flex items-center justify-center cursor-pointer"
                      onClick={() => lightInputRef.current.click()}
                    >
                      {lightDesignImage ? (
                        <img
                          src={lightDesignImage}
                          alt="Light Design Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-white opacity-50" />
                      )}
                    </div>
                    <Input
                      ref={lightInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "light")}
                      className="hidden"
                    />
                  </div>
                  <div className="relative">
                    <img
                      src="/images/dark-tshirt.png"
                      alt="Dark T-Shirt"
                      className="w-full"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] outline-2 outline-white outline-dashed rounded-lg flex items-center justify-center cursor-pointer"
                      onClick={() => darkInputRef.current.click()}
                    >
                      {darkDesignImage ? (
                        <img
                          src={darkDesignImage}
                          alt="Dark Design Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-white opacity-50" />
                      )}
                    </div>
                    <Input
                      ref={darkInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "dark")}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="design-upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  تحميل التصميم
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  انقر على منطقة التصميم في الصورة لتحميل التصميم للقميص الفاتح
                  أو الداكن
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full flex items-center justify-center"
                disabled={progress < 100}
              >
                <Upload className="mr-2 h-4 w-4" />
                {progress < 100 ? "أكمل جميع الحقول" : "إضافة المنتج"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddProductPage;
