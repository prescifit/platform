// app/signin/page.tsx
'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

export default function SigninPage() {
  const { register, handleSubmit } = useForm();

  const handleCredentialsSignin = async (data: any) => {
    await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl: '/dashboard'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        
        <form onSubmit={handleSubmit(handleCredentialsSignin)} className="space-y-4">
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
            required
          />
          
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button
          onClick={() => signIn('google')}
          className="w-full"
          variant="outline"
        >
          Google
        </Button>
      </div>
    </div>
  );
}