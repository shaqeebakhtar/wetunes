import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HeadphonesIcon, UsersIcon } from 'lucide-react';

const Page = () => {
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
            <form className="space-y-4 mt-6">
              <div className="space-y-2">
                <Input id="room-name" placeholder="Enter a name of your room" />
              </div>
              <Button type="submit" className="w-full">
                <HeadphonesIcon className="h-4 w-4" /> Create Room
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="join">
            <form className="space-y-4 mt-6">
              <div className="space-y-2">
                <Input id="room-id" placeholder="Enter the room ID" />
              </div>
              <Button type="submit" className="w-full">
                <UsersIcon className="h-4 w-4" /> Join Room
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
