// src/app/(admin)/admin/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Cegah klik ganda saat logout sedang berlangsung
    setIsLoggingOut(true);

    try {
      console.log('Logging out...');
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });

      if (response.ok) {
        // Redirect ke halaman login setelah logout
        router.push('/admin/login');
        router.refresh(); // Opsional: Segarkan router agar state client bersih
      } else {
        // Jika logout gagal, tampilkan error atau tetap di halaman
        console.error('Logout failed, status:', response.status);
        alert('Logout gagal. Silakan coba lagi.');
        setIsLoggingOut(false); // Izinkan percobaan logout lagi
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
      setIsLoggingOut(false); // Izinkan percobaan logout lagi
    }
  };

  return (
    <Button
      variant="destructive" // Gunakan variant sesuai kebutuhan Anda
      size="default"            // Gunakan size sesuai kebutuhan Anda
      onClick={handleLogout}
      disabled={isLoggingOut} // Nonaktifkan tombol saat logout berlangsung
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
