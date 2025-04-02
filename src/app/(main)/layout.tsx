import MainLayout from "@/components/core/MainLayout";
import { ReactNode } from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <MainLayout>{children}</MainLayout>;
};
export default RootLayout;
