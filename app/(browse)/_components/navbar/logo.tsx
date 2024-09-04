import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 ml-10 hover:opacity-75 transition">
        <Image src="/nex_logo.png" alt="نكس Nex" height="150" width="150" />
      </div>
    </Link>
  );
};
