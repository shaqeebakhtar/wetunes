import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ThumbsUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Track as TTrack } from '@prisma/client';
import { useSession } from 'next-auth/react';

const Track = ({
  track,
  isPlaying,
}: {
  track: TTrack & {
    _count: { votes: number };
    votes: {
      votedTrackId: string;
      voterId: string;
    }[];
  };
  isPlaying?: boolean;
}) => {
  const { data: session } = useSession();
  const [isVoted, setIsVoted] = useState(() => {
    return (
      track.votes.find((vote) => vote.votedTrackId === track.id)?.voterId ===
      session?.user.id
    );
  });

  return (
    <div className="p-2 border bg-muted rounded-sm flex gap-4 items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={track.sdThumbnailUrl}
          alt={track.title}
          width={480}
          height={360}
          className="w-14 aspect-square object-cover bg-center rounded"
        />
        <div className="space-y-1">
          <p
            className={cn(
              'max-w-72 text-sm font-medium line-clamp-1',
              isPlaying && 'text-primary'
            )}
          >
            {track.title}
          </p>
          <p className="text-muted-foreground text-xs truncate">
            {track.channel}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        className={cn(
          'rounded-full',
          isVoted &&
            'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'
        )}
      >
        <ThumbsUpIcon />
        {track._count.votes}
      </Button>
    </div>
  );
};

export default Track;
