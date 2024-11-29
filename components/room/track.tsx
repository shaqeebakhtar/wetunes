import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ThumbsUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Track = ({ isPlaying }: { isPlaying?: boolean }) => {
  return (
    <div className="p-2 border bg-muted rounded-sm flex gap-4 items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={'https://img.youtube.com/vi/yqiNOCfn-wU/hqdefault.jpg'}
          alt="music"
          width={480}
          height={360}
          className="w-14 aspect-square object-cover bg-center rounded"
        />
        <p
          className={cn(
            'max-w-72 text-sm font-medium line-clamp-2',
            isPlaying && 'text-primary'
          )}
        >
          Admirin&apos; You (Official Video) Karan Aujla | Ikky | Making
          Memories | Latest Punjabi Songs 2023
        </p>
      </div>
      <Button size="icon" variant="outline" className="rounded-full">
        <ThumbsUpIcon />
      </Button>
    </div>
  );
};

export default Track;
