'use client';
import { getTracksByRoomId } from '@/services/track';
import { useRoomStore } from '@/store/room';
import { Track as TTrack } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import Track from './track';

const TrackQueue = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const setCurrentPlayingTrack = useRoomStore(
    (state) => state.setCurrentPlayingTrack
  );
  const setTracks = useRoomStore((state) => state.setTracks);
  const currentPlayingTrack = useRoomStore(
    (state) => state.currentPlayingTrack
  );
  const setNextPlayingTrack = useRoomStore(
    (state) => state.setNextPlayingTrack
  );

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
    // get the isPlaying key on tracks and set it to current track
    if (isSuccess) {
      setTracks(tracks);
      setCurrentPlayingTrack(
        tracks.find((track: TTrack) => track.isPlaying === true)
      );
      setNextPlayingTrack(
        tracks.filter(
          (
            track: TTrack & {
              _count: { votes: number };
              votes: {
                votedTrackId: string;
                voterId: string;
              }[];
            }
          ) => track.isPlaying === false
        )[0]
      );
    }
  }, [
    isSuccess,
    roomId,
    setCurrentPlayingTrack,
    setNextPlayingTrack,
    setTracks,
    tracks,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollArea className="md:h-[calc(100vh-12rem)] md:pr-3">
      <div className="space-y-8">
        {currentPlayingTrack && (
          <div className="space-y-2">
            <h3 className="font-bold pb-2">Now playing</h3>
            <Track isPlaying track={currentPlayingTrack} />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-bold sticky top-0 bg-background pb-2">
            Next in queue
          </h3>
          {tracks.length > 0 ? (
            <div className="space-y-3">
              {tracks
                .filter(
                  (
                    track: TTrack & {
                      _count: { votes: number };
                      votes: {
                        votedTrackId: string;
                        voterId: string;
                      }[];
                    }
                  ) => track.isPlaying === false
                )
                .map(
                  (
                    track: TTrack & {
                      _count: { votes: number };
                      votes: {
                        votedTrackId: string;
                        voterId: string;
                      }[];
                    }
                  ) => (
                    <Track key={track.id} track={track} />
                  )
                )}
            </div>
          ) : (
            <div className="p-2 border bg-muted rounded-sm flex items-center justify-center">
              <p className="text-sm font-medium">No tracks in queue</p>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TrackQueue;
