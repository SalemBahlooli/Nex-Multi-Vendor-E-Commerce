import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tatra  تـــترا  - لوحة التحكم",
  description: "منصة بثوث عربية ",
};

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CreatorLayout;
