import { db } from "@/lib/prisma";

export async function checkVendorExists(vendorId: string): Promise<boolean> {
  try {
    const vendor = await db.vendor.findUnique({
      where: {
        id: vendorId,
      },
      select: {
        id: true,
      },
    });

    return vendor !== null;
  } catch (error) {
    console.error("Error checking vendor existence:", error);
    throw error;
  }
}
