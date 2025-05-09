// app/signup/role/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function RoleSelectionPage() {
  const router = useRouter();

  const selectRole = (role: 'trainee' | 'instructor') => {
    sessionStorage.setItem('signupRole', role);
    router.push(`/signup/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Join Prescifit as</h1>
        <div className="space-y-4">
          <Button 
            onClick={() => selectRole('trainee')}
            className="w-full py-6 text-lg"
          >
            Trainee
          </Button>
          <Button
            onClick={() => selectRole('instructor')}
            className="w-full py-6 text-lg"
            variant="outline"
          >
            Instructor
          </Button>
        </div>
      </div>
    </div>
  );
}