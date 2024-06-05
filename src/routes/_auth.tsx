// import * as React from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import ROUTES from 'constants/paths';

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
  component: Outlet,
});
