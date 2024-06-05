// import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import Login from 'containers/Authentication/Login';
import ROUTES from 'constants/paths';

export const Route = createFileRoute(ROUTES.LOGIN)({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: Login,
});
