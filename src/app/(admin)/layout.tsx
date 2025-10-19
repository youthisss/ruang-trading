import type React from "react"
import type { Metadata } from "next"
import "@/app/global.css"

// Impor layout Anda yang sudah ada
import { SidebarProvider } from "@/app/(admin)/admin/components/ui/sidebar"
import { AppSidebar } from "@/app/(admin)/admin/components/app-sidebar"

// Path import TIDAK DIUBAH (sesuai instruksi)
import { AdminModalProvider } from "@/app/(admin)/admin/context/AdminModalContext"
import AdminModalManager from "@/app/(admin)/admin/dashboard/AdminModalManager"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Created with v0",
  generator: "v0.app",
}
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminModalProvider>
          <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto w-screen">
                {children}
              </main>
            </div>
          </SidebarProvider>
          <AdminModalManager />
        </AdminModalProvider>
      </body>
    </html>
  )
}