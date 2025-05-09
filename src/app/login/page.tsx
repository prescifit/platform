'use client';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Prescifit</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Authentication failed. Please try again.
          </div>
        )}

        <Button
          onClick={() => signIn('google', { callbackUrl: '/api/auth/redirect' })}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 text-lg"
        >
          Continue with Google
        </Button>

        <div className="mt-6 text-center text-sm text-slate-600">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}