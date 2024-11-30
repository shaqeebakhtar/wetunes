'use client';
import { PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

const YouTubePlayer = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoElementRef = useRef<YouTubePlayer | null>(null);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    videoElementRef.current = event;
  };

  const opts: YouTubeProps['opts'] = {
    height: '0',
    width: '0',
  };

  useEffect(() => {
    if (videoElementRef.current) {
      if (!isPlaying) {
        videoElementRef.current.target.pauseVideo();
      } else {
        videoElementRef.current.target.playVideo();
      }
    }
  }, [isPlaying, videoElementRef]);

  return (
    <div className="mt-6 mb-4 mx-auto w-40 grid gap-2 place-items-center grid-cols-3">
      <YouTube
        videoId={videoId}
        title={title}
        opts={opts}
        onReady={onPlayerReady}
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
      >
        <SkipForwardIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default YouTubePlayer;
