import type { Metadata } from "next";
import "@/app/global.css";
import Navbar from "./utils/Navbar";
import { ModalProvider } from "@/app/(public)/context/ModcalContext"; 
import LoginModal from "./components/LoginModal";
import Footer from "./utils/Footer";

export const metadata: Metadata = {
  title: "Ruang Trading",
  description: "Your Partner in Financial Freedom",
  icons: {
    icon: '/logo-rt.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <ModalProvider>
          <Navbar/>
          {children}
          <LoginModal />
        </ModalProvider>
        <Footer/>
      </body>
    </html>
  );
}