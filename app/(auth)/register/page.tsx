import OAuthLogins from '@/components/auth/oauth-logins';
import { auth } from '@/utils/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Create an account | WeTunes',
};

const Register = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/room');
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="w-full space-y-6">
        <div className="space-y-1.5 text-center">
          <h3 className="text-2xl font-semibold">Join the Rhythm Revolution</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Register to create or join music rooms, add your favorite tracks,
            and vibe to the most upvoted beats.
          </p>
        </div>
        <OAuthLogins />
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="underline underline-offset-1 font-medium hover:text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
