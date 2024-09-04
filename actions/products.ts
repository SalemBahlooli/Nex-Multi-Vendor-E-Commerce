import { db } from "@/lib/prisma";

export function generateProductUrl(product: {
  id: string;
  name: string;
  vendor: { id: string };
}): string {
  const slug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return `/${product.vendor.id}/${product.id}-${slug}`;
}

export async function getProductsWithVendor() {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        rate: true,
        status: true,
        purchaseCount: true,
        images: {
          select: {
            url: true,
          },
        },
        vendor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products with vendor:", error);
    throw error;
  } finally {
    await db.$disconnect();
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            rate: true,
          },
        },
        colors: true,
        sizes: true,
        categories: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    // Return the product as is, without any conversions
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}
