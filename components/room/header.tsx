'use client';
import ShareButton from '@/components/share-button';
import { Button } from '@/components/ui/button';
import UserProfileDropdown from '@/components/user-profile-dropdown';
import { DoorOpenIcon, Music2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RoomHeader = ({
  roomName,
  pathname,
}: {
  roomName: string;
  pathname: string;
}) => {
  const router = useRouter();

  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b bg-background">
      <div className="flex h-16 items-center justify-between py-3 mx-auto w-full max-w-screen-lg px-3 lg:px-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-9 h-9 bg-primary/10 text-primary rounded-full select-none">
              <Music2Icon className="size-4" strokeWidth={3} />
            </div>
            <h2 className="max-w-48 truncate font-semibold leading-5">
              {roomName}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={'destructive'}
            className="text-destructive bg-destructive/10 hover:bg-destructive/20"
            onClick={() => {
              router.replace('/room');
            }}
          >
            <DoorOpenIcon />{' '}
            <span className="hidden md:inline-block">Leave Room</span>
          </Button>
          <ShareButton value={pathname} />
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
