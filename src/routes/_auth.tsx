import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import CreateProfile from 'containers/shared/CreateProfile';
import DashboardHeader from 'containers/shared/DashboardHeader';

const AuthRoot = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-full">
      {user && !user.profile && <CreateProfile />}
      <DashboardHeader />
      <Outlet />
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
