'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
