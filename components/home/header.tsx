import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Music2Icon } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-background border-b sticky inset-x-0 top-0 z-[100] shadow-sm">
      <div className="h-16 flex gap-4 items-center justify-between max-w-screen-xl mx-auto px-3 lg:px-16">
        <Link href="/">
          <div className="flex items-center gap-1 text-lg font-semibold">
            <Music2Icon className="w-5 h-5 text-primary" />
            WeTunes
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-full px-6'
            )}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'rounded-full px-6'
            )}
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
