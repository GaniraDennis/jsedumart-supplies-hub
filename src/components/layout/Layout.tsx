import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppWidget />
  </div>
);

export default Layout;
