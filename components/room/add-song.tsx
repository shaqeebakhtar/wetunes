import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const AddSong = () => {
  return (
    <div className="p-3 rounded-sm border bg-muted flex flex-col  sm:flex-row sm:items-center gap-2">
      <Input
        type="url"
        className="bg-background h-10"
        placeholder="Paste youtube or yt music url"
      />
      <Button>Add to queue</Button>
    </div>
  );
};

export default AddSong;
