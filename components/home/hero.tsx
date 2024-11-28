import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Hero = () => {
  return (
    <main className="h-[calc(100vh-72px)] grid place-items-center">
      <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-20 lg:px-16">
        <h1 className="text-center font-title font-semibold text-4xl leading-[1.15] md:text-6xl md:leading-[1.15]">
          Collaborate. Listen. Vibe.
        </h1>
        <p className="text-center text-base lg:text-lg text-muted-foreground mx-auto max-w-screen-md mt-4">
          Create or join a music room where everyone can add songs from YouTube,
          vote for their favorites, and enjoy the most upvoted tracks next.
        </p>
        <div className="flex items-center justify-center mt-10">
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-full px-6 h-[38px]'
            )}
          >
            Start for FREE
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Hero;
