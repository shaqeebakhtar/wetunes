import { PauseIcon, PlayIcon, SkipForwardIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../ui/button';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="p-2 rounded-sm border bg-muted">
      <div className="space-y-3">
        <Image
          src={'https://img.youtube.com/vi/k85UB5b6pJU/maxresdefault.jpg'}
          alt="music"
          width={1280}
          height={720}
          className="w-full aspect-square object-cover bg-center rounded-sm"
        />
        <p className="font-medium truncate px-1">
          Admirin&apos; You (Official Video) Karan Aujla | Ikky | Making
          Memories | Latest Punjabi Songs 2023
        </p>
      </div>
      <div className="mt-6 mb-4 mx-auto w-[200px] grid gap-2 place-items-center grid-cols-3">
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
    </div>
  );
};

export default MusicPlayer;
