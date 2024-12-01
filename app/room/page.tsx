'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createRoom } from '@/services/room';
import { useMutation } from '@tanstack/react-query';
import { HeadphonesIcon, LoaderIcon, UsersIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const { data: session, status } = useSession();
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const router = useRouter();

  if (status !== 'loading' && !session?.user) {
    redirect('/login/?next=/room');
  }

  const mutation = useMutation({
    mutationFn: createRoom,
    onSuccess: ({ roomId }) => {
      setIsCreatingRoom(false);
      router.push(`/room/${roomId}`);
      setRoomName('');
    },
    onError: (error) => {
      toast.error(error.message as string);
      setIsCreatingRoom(false);
      setRoomName('');
    },
  });

  const handleCreateRoom = async (e: FormEvent) => {
    setIsCreatingRoom(true);
    e.preventDefault();

    if (roomName === '') {
      setIsCreatingRoom(false);
      toast.error('Room name cannot be empty');
      return;
    }

    if (roomName.length < 3 || roomName.length > 20) {
      setIsCreatingRoom(false);
      toast.error('Room name can only be of 3-20 characters');
      return;
    }

    mutation.mutate({
      name: roomName,
    });
  };

  const handleJoinRoom = (e: FormEvent) => {
    setIsJoiningRoom(true);
    e.preventDefault();

    if (roomId === '') {
      setIsJoiningRoom(false);
      toast.error('Room Id cannot be empty');
      return;
    }

    setIsJoiningRoom(false);
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="min-h-screen grid place-items-center">
      <section className="max-w-screen-xl w-full mx-auto py-10 px-3 lg:py-20 lg:px-16 space-y-10">
        <div className="space-y-3">
          <h1 className="text-center font-title font-semibold text-2xl leading-[1.15] md:text-4xl md:leading-[1.15]">
            Get the Music Started
          </h1>
          <p className="text-center text-muted-foreground mx-auto max-w-lg">
            Create or join a music room, and you&apos;re ready to set the stage
            for an unforgettable musical experience! next.
          </p>
        </div>
        <Tabs defaultValue="create" className="max-w-[380px] mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="join">Join</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <form className="space-y-4 mt-6" onSubmit={handleCreateRoom}>
              <div className="space-y-2">
                <Input
                  id="room-name"
                  placeholder="Enter a name of your room"
                  className="h-10"
                  value={roomName}
                  onChange={(e) => setRoomName(e.currentTarget.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {isCreatingRoom ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <HeadphonesIcon className="h-4 w-4" />
                )}
                Create Room
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="join">
            <form className="space-y-4 mt-6" onSubmit={handleJoinRoom}>
              <div className="space-y-2">
                <Input
                  id="room-id"
                  placeholder="Enter the room ID"
                  className="h-10"
                  value={roomId}
                  onChange={(e) => setRoomId(e.currentTarget.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                {isJoiningRoom ? (
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <UsersIcon className="h-4 w-4" />
                )}
                Join Room
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
