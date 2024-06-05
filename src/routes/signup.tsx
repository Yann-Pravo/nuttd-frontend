// import * as React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import Signup from 'containers/Authentication/Signup';
import ROUTES from 'constants/paths';

export const Route = createFileRoute(ROUTES.SIGNUP)({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: Signup,
});
