'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';

export default function OnboardingPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Retrieve user role from session storage
    const role = sessionStorage.getItem('userRole');
    setUserRole(role);
    
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert measurements to standard units (cm/kg) for storage
      let heightInCm = heightUnit === 'cm' ? parseFloat(height) : convertFeetToCm(height);
      let weightInKg = weightUnit === 'kg' ? parseFloat(weight) : convertLbsToKg(parseFloat(weight));
      
      // Create user profile with role and measurements
      const response = await fetch('/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: userRole,
          heightCm: heightInCm,
          initialWeightKg: weightInKg,
        }),
      });
      
      if (response.ok) {
        // Redirect based on role
        const redirectPath = userRole === 'trainee' ? '/dashboard/trainee' : '/dashboard/instructor';
        router.push(redirectPath);
      } else {
        throw new Error('Failed to create profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };
  
  // Utility functions for unit conversion
  const convertFeetToCm = (feetStr: string): number => {
    // Format expected: "5'11" (feet and inches)
    const parts = feetStr.split("'");
    const feet = parseFloat(parts[0]) || 0;
    const inches = parseFloat(parts[1]) || 0;
    return (feet * 30.48) + (inches * 2.54);
  };
  
  const convertLbsToKg = (lbs: number): number => {
    return lbs / 2.20462;
  };
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {userRole === 'trainee' ? 'Complete Your Profile' : 'Instructor Setup'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Role Display */}
          <div>
            <p className="text-gray-600 mb-2">
              You are setting up your profile as an:
            </p>
            <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-md font-medium">
              {userRole === 'trainee' ? 'Trainee' : 'Instructor'}
            </div>
          </div>
          
          {/* Height Input */}
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <div className="flex space-x-2">
              <Input 
                id="height"
                type="text"
                placeholder={heightUnit === 'cm' ? "Height in cm" : "e.g. 5'11"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="flex-1"
                required
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'ft')}
                className="bg-white border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
            {heightUnit === 'ft' && (
              <p className="text-xs text-gray-500">Format: 5'11 (feet'inches)</p>
            )}
          </div>
          
          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight">Initial Weight</Label>
            <div className="flex space-x-2">
              <Input
                id="weight"
                type="text"
                placeholder={`Weight in ${weightUnit}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="flex-1"
                required
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                className="bg-white border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </div>
  );
}