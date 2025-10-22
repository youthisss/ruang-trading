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
<<<<<<< HEAD
        console.log('Logout successful, clearing cache and cookies...');
        
        // Clear all cookies from client-side
        document.cookie.split(';').forEach((c) => {
          const name = c.split('=')[0].trim();
          // Delete for current domain
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          // Also try with domain
          const domain = window.location.hostname;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
          console.log(`Deleted cookie from client: ${name}`);
        });
        
        // Clear all browser cache
        if ('caches' in window) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          });
        }

        // Clear sessionStorage and localStorage (optional)
        sessionStorage.clear();
        
        // Use replace instead of push to prevent back button
        // This removes current page from history
        window.location.replace('/login');
=======
        // Redirect ke halaman login setelah logout
        router.push('/admin/login');
        router.refresh(); // Opsional: Segarkan router agar state client bersih
>>>>>>> 385ba519bec9ac39f14c3cd77921ed2452ca1f79
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
