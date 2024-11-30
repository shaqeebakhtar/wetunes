'use client';
import { Track } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import YouTubePlayer from './youtube-player';

const MusicPlayer = ({
  currentTrack,
  adminId,
}: {
  currentTrack: Track | null;
  adminId: string;
}) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="p-2 rounded-sm border bg-muted">
        {currentTrack ? (
          <>
            <div className="space-y-3">
              <Image
                src={currentTrack?.hdThumbnailUrl}
                alt={currentTrack?.title}
                width={1280}
                height={720}
                className="w-full aspect-square object-cover bg-center rounded-sm"
              />
              <div className="space-y-1">
                <p className="font-medium truncate px-1">
                  {currentTrack?.title}
                </p>
                <p className="text-muted-foreground text-xs truncate px-1">
                  {currentTrack.channel}
                </p>
              </div>
            </div>
            {adminId === session?.user.id && (
              <YouTubePlayer
                videoId={currentTrack.videoId}
                title={currentTrack.title}
                currentTrackId={currentTrack.id}
              />
            )}
          </>
        ) : (
          <div className="w-[400px] aspect-square grid place-items-center">
            <p className="font-medium">No songs in the queue</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
