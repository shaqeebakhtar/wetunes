'use client';
import AddSong from '@/components/room/add-song';
import MusicPlayer from '@/components/room/music-player';
import TrackQueue from '@/components/room/track-queue';
// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import React from 'react';

function Page() {
  // const { data: session, status } = useSession();

  // if (status !== 'loading' && !session?.user) {
  //   redirect('/login/?next=/dashboard');
  // }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <div className="space-y-4">
        <MusicPlayer />
        <AddSong />
      </div>
      <TrackQueue />
    </div>
  );
}

export default Page;
