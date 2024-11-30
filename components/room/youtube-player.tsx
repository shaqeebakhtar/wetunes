import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react';

const YouTubePlayer = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let player;

    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('ytplayer', {
        videoId,
        events: {
          onReady: (event) => {
            playerRef.current = event.target;
          },
        },
      });
    };

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  const playPauseVideo = () => {
    if (playerRef.current) {
      isPlaying
        ? playerRef.current.pauseVideo()
        : playerRef.current.playVideo();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-6 mb-4 mx-auto w-40 grid gap-2 place-items-center grid-cols-3">
      <iframe
        id="ytplayer"
        width="640"
        height="360"
        className="hidden sr-only"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      ></iframe>
      <div />
      <Button
        size="icon"
        className="size-12 rounded-full"
        onClick={playPauseVideo}
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
