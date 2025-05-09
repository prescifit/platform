'use client';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  return (
    <Button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      variant="ghost"
      className="text-slate-600 hover:bg-slate-100"
    >
      Sign Out
    </Button>
  );
}