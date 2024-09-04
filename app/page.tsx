import { getProductsWithVendor } from "@/actions/products";
import { dummyProducts } from "./(browse)/[vendor]/[product]/dummyProduct";
import ProductGrid from "./_components/ProductGrid";
import { Navbar } from "./(browse)/_components/navbar";

export default async function Home() {
  const products = await getProductsWithVendor();

  return (
    <div className=" mt-5 px-40">
      
      <ProductGrid products={products} />
    </div>
  );
}
