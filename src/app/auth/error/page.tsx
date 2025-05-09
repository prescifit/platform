"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          There was an issue during authentication. Redirecting to home...
        </p>
      </div>
    </div>
  );
}