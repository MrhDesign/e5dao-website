'use client';

import { useEffect } from 'react';

export default function ProductsRedirect() {
  useEffect(() => {
    // 重定向到 /products/all
    window.location.href = '/products/all';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-text-secondary">Taking you to our products page</p>
      </div>
    </div>
  );
}