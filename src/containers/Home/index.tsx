import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from '@tanstack/react-router';
import logo from 'assets/logo.svg';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import { useEffect } from 'react';
import { Route } from 'routes/_auth.index';

const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7],
];

function Home() {
  const router = useRouter();
  const navigate = Route.useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const redirect = async () => {
      await router.invalidate();
      await navigate({ to: ROUTES.LOGIN });
    };

    if (!isAuthenticated) {
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      <Button onClick={() => logout()}>Logout</Button>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Welcome {user?.profile?.displayName}!
      </h1>
    </>
  );
}

export default Home;
