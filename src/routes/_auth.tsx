import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import CreateProfile from 'containers/shared/CreateProfile';

const AuthRoot = () => {
  const { user } = useAuth();

  return (
    <>
      {user && !user.profile && <CreateProfile />}
      <Outlet />
    </>
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
