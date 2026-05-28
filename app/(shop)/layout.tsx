import { Navbar } from "@/components/takhton/layout/Navbar";
import { Footer } from "@/components/takhton/layout/Footer";
import { CartDrawer } from "@/components/takhton/cart/CartDrawer";

export interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
