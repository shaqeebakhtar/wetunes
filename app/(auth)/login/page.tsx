import OAuthLogins from '@/components/auth/oauth-logins';
import { auth } from '@/utils/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign in | WeTunes',
};

const Login = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="w-full space-y-6">
        <div className="space-y-1.5 text-center">
          <h3 className="text-2xl font-semibold">Welcome Back to WeTunes</h3>
          <p className="text-sm text-muted-foreground max-w-[20rem] mx-auto">
            Reconnect to your music rooms and keep the rhythm alive.
          </p>
        </div>
        <OAuthLogins />
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="underline underline-offset-1 font-medium hover:text-primary"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
