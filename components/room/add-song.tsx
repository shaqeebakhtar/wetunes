'use client';
import { addTrack } from '@/services/track';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ListMusicIcon, LoaderIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useParams } from 'next/navigation';

const AddSong = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [ytUrl, setYtUrl] = useState('');
  const [isAddingTrack, setIsAddingTrack] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTrack,
    onSuccess: () => {
      setIsAddingTrack(false);
      queryClient.invalidateQueries({ queryKey: ['tracks', roomId] });
      setYtUrl('');
      toast.success('Your song has been added to queue');
    },
    onError: (error) => {
      toast.error(error.message as string);
      setIsAddingTrack(false);
      setYtUrl('');
    },
  });

  const handleAddTrack = (e: FormEvent) => {
    setIsAddingTrack(true);
    e.preventDefault();

    if (ytUrl === '') {
      setIsAddingTrack(false);
      toast.error('Room name cannot be empty');
      return;
    }

    mutation.mutate({
      url: ytUrl,
      roomId,
    });
  };

  return (
    <div className="p-3 rounded-sm border bg-muted">
      <form
        className="flex flex-col  sm:flex-row sm:items-center gap-2"
        onSubmit={handleAddTrack}
      >
        <Input
          type="url"
          className="bg-background h-10"
          placeholder="Paste youtube or yt music url"
          value={ytUrl}
          onChange={(e) => setYtUrl(e.currentTarget.value)}
        />
        <Button>
          {isAddingTrack ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            <ListMusicIcon className="h-4 w-4" />
          )}
          Add to queue
        </Button>
      </form>
    </div>
  );
};

export default AddSong;
