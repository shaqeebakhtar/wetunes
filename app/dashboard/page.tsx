'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

function Page() {
  const { data: session, status } = useSession();

  if (status !== 'loading' && !session?.user) {
    redirect('/login/?next=/dashboard');
  }

  return (
    <div className="grid place-items-center h-screen">
      Welcome, {session?.user.name}
    </div>
  );
}

export default Page;
