import type { Metadata } from "next";
import { Cairo, Noto_Naskh_Arabic, Tajawal } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import MaintenancePage from "./Maintenance";

// const font = Amiri_Quran({ subsets: ["arabic"] });
const cairo = Tajawal({
  subsets: ["arabic"],
  weight: ["400"], // You can specify the weights you need
});

export const metadata: Metadata = {
  title: "Tatra  تـــترا ",
  description: "منصة بثوث عربية ",
};

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "on";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <html lang="en">
      <body className={cairo.className}>
        <Toaster theme="light" position="bottom-center" />

        {children}
      </body>
    </html>
  );
}
