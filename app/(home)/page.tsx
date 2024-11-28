'use client';
import Header from '@/components/home/header';
import Hero from '@/components/home/hero';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();

  if (status !== 'loading' && status === 'authenticated' && session.user) {
    redirect('/room');
  }

  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
