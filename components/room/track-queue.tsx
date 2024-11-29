import React from 'react';
import Track from './track';
import { ScrollArea } from '../ui/scroll-area';

const TrackQueue = () => {
  return (
    <ScrollArea className="md:h-[calc(100vh-12rem)] md:pr-3">
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="font-bold pb-2">Now playing</h3>
          <Track isPlaying />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold sticky top-0 bg-background pb-2">
            Next in queue
          </h3>
          <div className="space-y-3">
            <Track />
            <Track />
            <Track />
            <Track />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TrackQueue;
