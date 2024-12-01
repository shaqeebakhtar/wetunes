'use client';
import { PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { useMutation } from '@tanstack/react-query';
import { playNextTrack, setPlayingTrack } from '@/services/track';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useRoomStore } from '@/store/room';

const YouTubePlayer = ({
  videoId,
  title,
  currentTrackId,
}: {
  videoId: string;
  title: string;
  currentTrackId: string;
}) => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoElementRef = useRef<YouTubePlayer | null>(null);
  const nextPlayingTrack = useRoomStore((state) => state.nextPlayingTrack);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    event.target.playVideo();
    videoElementRef.current = event.target;
  };

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (videoElementRef.current) {
      if (!isPlaying) {
        videoElementRef.current.pauseVideo();
      } else {
        videoElementRef.current.playVideo();
      }
    }
  }, [isPlaying, videoElementRef]);

  const playNextTrackMutation = useMutation({
    mutationFn: playNextTrack,
    onSuccess: () => {
      setPlayingTrackMutation.mutate({
        trackId: nextPlayingTrack?.id as string,
        roomId,
      });
      setIsPlaying(true);
      toast.success('Playing next song');
    },
  });

  const setPlayingTrackMutation = useMutation({
    mutationFn: setPlayingTrack,
  });

  return (
    <div className="mt-6 mb-4 mx-auto w-40 grid gap-2 place-items-center grid-cols-3">
      <YouTube
        videoId={videoId}
        title={title}
        opts={opts}
        onReady={onPlayerReady}
        onEnd={() =>
          playNextTrackMutation.mutate({ roomId, trackId: currentTrackId })
        }
        className="hidden sr-only"
      />
      <div />
      <Button
        size="icon"
        className="size-12 rounded-full"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-background"
        onClick={() =>
          playNextTrackMutation.mutate({ roomId, trackId: currentTrackId })
        }
      >
        <SkipForwardIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default YouTubePlayer;
