import type { Metadata } from "next";
import "@/app/global.css"; // Impor CSS global jika belum di root layout

export const metadata: Metadata = {
  title: "Login | Ruang Trading",
  description: "Halaman login admin",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>{children}</> 
      </body>
    </html>
  );
}