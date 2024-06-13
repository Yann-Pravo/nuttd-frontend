import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import CreateProfile from 'containers/shared/CreateProfile';
import DashboardHeader from 'containers/shared/DashboardHeader';

const AuthRoot = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-full">
      {user && !user.profile && <CreateProfile />}
      <div className="fixed top-0 z-10 w-full">
        <DashboardHeader />
      </div>
      <div className="mt-16 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: ROUTES.LOGIN,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthRoot,
});
