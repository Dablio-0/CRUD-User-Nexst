'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            CRUD de Usuários
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sistema completo de gerenciamento de usuários
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button asChild className="w-full">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">Registrar</Link>
            </Button>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>Faça login ou registre-se para começar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}