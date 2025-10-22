// src/app/admin/components/LogoutButton.tsx
'use client';

import { useState } from 'react';

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);

    try {
      console.log('Logging out...');
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });

      if (response.ok) {
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
      } else {
        console.error('Logout API failed');
        // Still redirect even if API fails
        window.location.replace('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even on error
      window.location.replace('/login');
    } finally {
      // Note: This might not execute if window.location.replace happens first
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export { LogoutButton };