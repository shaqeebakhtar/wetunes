'use client';
import { Track } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import YouTubePlayer from './youtube-player';
import { Button } from '../ui/button';
import { useRoomStore } from '@/store/room';
import { useMutation } from '@tanstack/react-query';
import { setPlayingTrack } from '@/services/track';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

const MusicPlayer = ({
  currentTrack,
  adminId,
}: {
  currentTrack: Track | null;
  adminId: string;
}) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: session } = useSession();
  const nextPlayingTrack = useRoomStore((state) => state.nextPlayingTrack);
  const tracks = useRoomStore((state) => state.tracks);

  const setPlayingTrackMutation = useMutation({
    mutationFn: setPlayingTrack,
    onSuccess: () => {
      toast.success('Started playing songs');
    },
    onError: () => {
      toast.error('No more songs to play');
    },
  });

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
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="font-medium">No songs playing</p>
              {tracks.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setPlayingTrackMutation.mutate({
                      trackId: nextPlayingTrack?.id as string,
                      roomId,
                    })
                  }
                >
                  Start Playing
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MusicPlayer;
