'use client';
import AddSong from '@/components/room/add-song';
import RoomHeader from '@/components/room/header';
import MusicPlayer from '@/components/room/music-player';
import TrackQueue from '@/components/room/track-queue';
import { getRoomById } from '@/services/room';
import { Track } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notFound, redirect, useParams, usePathname } from 'next/navigation';
import React, { useState } from 'react';

function Page() {
  const { data: session, status } = useSession();
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

  if (status !== 'loading' && !session?.user) {
    redirect('/login/?next=/room');
  }

  const { roomId } = useParams<{ roomId: string }>();
  const pathname = usePathname();

  const { data: room, isLoading } = useQuery({
    queryKey: ['room'],
    queryFn: () => getRoomById({ id: roomId }),
  });

  if (isLoading) {
    return <div> Loading....</div>;
  }

  if (!room) {
    notFound();
  }

  return (
    <>
      <RoomHeader roomName={room.name} pathname={pathname} />
      <main className="mx-auto max-w-screen-lg py-12 px-3 lg:px-20">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <MusicPlayer adminId={room.adminId} currentTrack={currentTrack} />
            <AddSong />
          </div>
          <TrackQueue setCurrentTrack={setCurrentTrack} />
        </div>
      </main>
    </>
  );
}

export default Page;
