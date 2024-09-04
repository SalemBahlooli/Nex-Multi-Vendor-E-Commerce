import {
  Product,
  Vendor,
  VendorEarning,
} from "@/app/(dashboard)/u/[vendorDashboard]/page";
import { Decimal } from "decimal.js";

const dummyProduct = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  createdAt: new Date("2023-01-01T00:00:00Z"),
  updatedAt: new Date("2023-06-15T12:30:00Z"),
  name: "هيا لنشرب القهوة",
  description:
    "استمتع بالقهوة الجميلة في الصباح الباكر وارتدي هذا التيشيرت الاسطوري ياحبيبي",
  price: 99.1,
  vendorPercentage: 30.0,
  vendor: {
    name: "ErgoComfort Solutions",
    image: "/images/vendor-logo.jpg", // or null if not available
    rate: 4.5,
    description:
      "Specializing in ergonomic office furniture for over a decade.",
  },
  vendorId: "98765432-abcd-efgh-ijkl-123456789000",
  status: "AVAILABLE",
  purchaseCount: 1500,
  rate: 4.7,
  colors: [
    { id: "1", name: "black" },
    { id: "2", name: "gray" },
    { id: "3", name: "blue" },
  ],
  sizes: [
    { id: "1", name: "S" },
    { id: "2", name: "M" },
    { id: "2", name: "L" },
    { id: "2", name: "XL" },
    { id: "2", name: "XXL" },
  ],
  categories: [
    { id: "1", name: "Office Furniture" },
    { id: "2", name: "Ergonomic" },
  ],
  sku: "EC-OFC-1234",
  images: [
    { id: "1", url: "/images/t1.jpg" },
    { id: "2", url: "/images/t2.jpg" },
    { id: "3", url: "/images/t3.jpg" },
    { id: "4", url: "/images/43.jpg" },
  ],
  reviews: [
    {
      id: "1",
      rating: 5,
      comment: "Best chair I've ever owned! My back pain is gone.",
      userId: "user123",
    },
    {
      id: "2",
      rating: 4,
      comment: "Very comfortable, but a bit pricey.",
      userId: "user456",
    },
  ],
  orderItems: [], // This would typically be populated with order data
  vendorEarnings: [], // This would typically be populated with earning data
};

export default dummyProduct;

// Dummy Colors
const dummyColors = [
  { id: "1", name: "أحمر", hexCode: "#FF0000" },
  { id: "2", name: "أزرق", hexCode: "#0000FF" },
  { id: "3", name: "أخضر", hexCode: "#00FF00" },
  { id: "4", name: "أسود", hexCode: "#000000" },
  { id: "5", name: "أبيض", hexCode: "#FFFFFF" },
];

// Dummy Sizes
const dummySizes = [
  { id: "1", name: "S" },
  { id: "2", name: "M" },
  { id: "3", name: "L" },
  { id: "4", name: "XL" },
];

// Dummy Categories
const dummyCategories = [
  { id: "1", name: "ملابس", description: "جميع أنواع الملابس" },
  { id: "2", name: "إلكترونيات", description: "أجهزة إلكترونية وملحقاتها" },
  { id: "3", name: "أثاث", description: "أثاث للمنزل والمكتب" },
  { id: "4", name: "كتب", description: "كتب في مختلف المجالات" },
];

// Dummy Vendors
const dummyVendors = [
  {
    id: "1",
    name: "متجر الأناقة",
    rate: 4.5,
    description: "متجر متخصص في الملابس الفاخرة",
  },
  {
    id: "2",
    name: "تك مارت",
    rate: 4.2,
    description: "أفضل الإلكترونيات بأسعار تنافسية",
  },
  {
    id: "3",
    name: "المنزل الجميل",
    rate: 4.7,
    description: "أثاث عصري لمنزل أنيق",
  },
  {
    id: "4",
    name: "عالم الكتب",
    rate: 4.8,
    description: "مكتبة شاملة لجميع أنواع الكتب",
  },
];

// Dummy Products
const dummyProducts = [
  {
    id: "1",
    name: "قميص كلاسيكي",
    description: "قميص أنيق مناسب لجميع المناسبات",
    price: 49.99,
    vendorPercentage: 30.0,
    vendor: dummyVendors[0],
    vendorId: "1",
    status: "AVAILABLE",
    purchaseCount: 120,
    rate: 4.6,
    colors: [dummyColors[0], dummyColors[1]],
    sizes: [dummySizes[0], dummySizes[1], dummySizes[2]],
    categories: [dummyCategories[0]],
    sku: "SHIRT-001",
    images: [{ id: "1", url: "/images/t4.jpg" }],
    reviews: [
      {
        id: "1",
        rating: 5,
        comment: "قميص رائع وجودة ممتازة",
        userId: "user1",
      },
      {
        id: "2",
        rating: 4,
        comment: "مريح جدًا ولكن السعر مرتفع قليلاً",
        userId: "user2",
      },
    ],
  },
  {
    id: "2",
    name: "لابتوب احترافي",
    description: "لابتوب قوي مناسب للعمل والألعاب",
    price: 1299.99,
    vendorPercentage: 25.0,
    vendor: dummyVendors[1],
    vendorId: "2",
    status: "AVAILABLE",
    purchaseCount: 50,
    rate: 4.8,
    colors: [dummyColors[3], dummyColors[4]],
    sizes: [],
    categories: [dummyCategories[1]],
    sku: "LAPTOP-001",
    images: [{ id: "2", url: "/images/t1.jpg" }],
    reviews: [
      { id: "3", rating: 5, comment: "أداء مذهل وسرعة فائقة", userId: "user3" },
      {
        id: "4",
        rating: 4,
        comment: "جيد جدًا ولكن البطارية تنفد بسرعة",
        userId: "user4",
      },
    ],
  },
  {
    id: "3",
    name: "أريكة مريحة",
    description: "أريكة عصرية ومريحة لغرفة المعيشة",
    price: 599.99,
    vendorPercentage: 35.0,
    vendor: dummyVendors[2],
    vendorId: "3",
    status: "AVAILABLE",
    purchaseCount: 30,
    rate: 4.7,
    colors: [dummyColors[2], dummyColors[3], dummyColors[4]],
    sizes: [dummySizes[2], dummySizes[3]],
    categories: [dummyCategories[2]],
    sku: "SOFA-001",
    images: [{ id: "3", url: "/images/t2.jpg" }],
    reviews: [
      {
        id: "5",
        rating: 5,
        comment: "أريكة رائعة ومريحة جدًا",
        userId: "user5",
      },
      {
        id: "6",
        rating: 4,
        comment: "جميلة ولكن التنظيف صعب بعض الشيء",
        userId: "user6",
      },
    ],
  },
  {
    id: "4",
    name: "رواية مثيرة",
    description: "رواية مشوقة من أفضل الكتاب المعاصرين",
    price: 19.99,
    vendorPercentage: 40.0,
    vendor: dummyVendors[3],
    vendorId: "4",
    status: "AVAILABLE",
    purchaseCount: 200,
    rate: 4.9,
    colors: [],
    sizes: [],
    categories: [dummyCategories[3]],
    sku: "BOOK-001",
    images: [{ id: "4", url: "/images/t3.jpg" }],
    reviews: [
      {
        id: "7",
        rating: 5,
        comment: "لا أستطيع التوقف عن القراءة!",
        userId: "user7",
      },
      {
        id: "8",
        rating: 5,
        comment: "واحدة من أفضل الروايات التي قرأتها",
        userId: "user8",
      },
    ],
  },
];

export {
  dummyProducts,
  dummyCategories,
  dummyColors,
  dummySizes,
  dummyVendors,
  dummyVendorData,
};

const dummyVendorData: Vendor = {
  id: "v1",
  createdAt: new Date("2023-01-01T00:00:00Z"),
  updatedAt: new Date("2023-07-01T00:00:00Z"),
  name: "متجر الأناقة العربية",
  description: "نقدم أفضل الملابس والإكسسوارات العربية التقليدية والعصرية",
  rate: 4.7,
  userId: "u1",
  profileImage: "/images/vendor-logo.jpg",
  products: [
    {
      id: "p1",
      createdAt: new Date("2023-02-01T00:00:00Z"),
      updatedAt: new Date("2023-06-15T00:00:00Z"),
      name: "عباية كلاسيكية",
      description: "عباية سوداء أنيقة مناسبة لجميع المناسبات",
      price: new Decimal(199.99),
      vendorPercentage: new Decimal(30.0),
      vendorId: "v1",
      status: "AVAILABLE",
      purchaseCount: 50,
      rate: 4.8,
      sku: "ABY-001",
      colors: [{ id: "c1", name: "أسود", hexCode: "#000000" }],
      sizes: [
        { id: "s1", name: "S" },
        { id: "s2", name: "M" },
        { id: "s3", name: "L" },
      ],
      categories: [{ id: "cat1", name: "ملابس نسائية" }],
      images: [{ id: "img1", url: "/images/t2.jpg" }],
      reviews: [
        {
          id: "r1",
          rating: 5,
          comment: "جودة ممتازة وتصميم أنيق",
          userId: "u2",
        },
        {
          id: "r2",
          rating: 4,
          comment: "جميلة جداً ولكن السعر مرتفع قليلاً",
          userId: "u3",
        },
      ],
      orderItems: [
        {
          id: "oi1",
          quantity: 2,
          price: new Decimal(199.99),
          order: { id: "o1", status: "DELIVERED" },
        },
        {
          id: "oi2",
          quantity: 1,
          price: new Decimal(199.99),
          order: { id: "o2", status: "PROCESSING" },
        },
      ],
    },
    // ... (other product)
  ] as Product[], // Type assertion here
  earnings: [
    {
      id: "e1",
      createdAt: new Date("2023-04-15T00:00:00Z"),
      updatedAt: new Date("2023-02-15T00:00:00Z"),
      amount: new Decimal(119.99),
      orderId: "o1",
      productId: "p1",
    },
    {
      id: "e2",
      createdAt: new Date("2023-03-15T00:00:00Z"),
      updatedAt: new Date("2023-02-15T00:00:00Z"),
      amount: new Decimal(12.99),
      orderId: "o2",
      productId: "p2",
    },
    {
      id: "e3",
      createdAt: new Date("2023-02-15T00:00:00Z"),
      updatedAt: new Date("2023-02-15T00:00:00Z"),
      amount: new Decimal(17.99),
      orderId: "o2",
      productId: "p2",
    },
    {
      id: "e4",
      createdAt: new Date("2023-01-15T00:00:00Z"),
      updatedAt: new Date("2023-02-15T00:00:00Z"),
      amount: new Decimal(50.99),
      orderId: "o2",
      productId: "p2",
    },
    // ... (other earnings)
  ] as VendorEarning[], // Type assertion here
};
