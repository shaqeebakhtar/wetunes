'use client';
import React, { useEffect } from 'react';
import Track from './track';
import { ScrollArea } from '../ui/scroll-area';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTracksByRoomId } from '@/services/track';
import { Track as TTrack } from '@prisma/client';

type TrackQueueProps = {
  setCurrentTrack: (track: TTrack) => void;
};

const TrackQueue = ({ setCurrentTrack }: TrackQueueProps) => {
  const { roomId } = useParams<{ roomId: string }>();

  const {
    data: tracks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['tracks', roomId],
    queryFn: () => getTracksByRoomId({ roomId }),
    refetchInterval: 5 * 1000,
  });

  useEffect(() => {
    if (isSuccess) setCurrentTrack(tracks[0] ?? null);
  }, [isSuccess, setCurrentTrack, tracks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-12rem)] md:pr-3">
      <div className="space-y-8">
        {tracks.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold pb-2">Now playing</h3>
            <Track isPlaying track={tracks[0]} />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-bold sticky top-0 bg-background pb-2">
            Next in queue
          </h3>
          <div className="space-y-3">
            {tracks.length > 0 &&
              tracks.slice(1).map(
                (
                  track: TTrack & {
                    _count: { votes: number };
                    votes: {
                      votedTrackId: string;
                      voterId: string;
                    }[];
                  }
                ) => <Track key={track.id} track={track} />
              )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TrackQueue;
