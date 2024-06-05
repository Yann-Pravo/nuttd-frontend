import './App.css';

import React, { Suspense, useEffect } from 'react';

import useGetUser from 'api/user/getUser';
import useGetStatus from 'api/auth/getStatus';
import { AuthProvider, useAuth } from 'contexts/auth';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from 'routeTree.gen';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }

function InnerApp() {
  const auth = useAuth();
  return (
    <Suspense>
      <RouterProvider router={router} context={{ auth }} />
    </Suspense>
  );
}

const App: React.FC = () => {
  const {
    isFetching: isFetchingUser,
    data: user,
    refetch: getUser,
  } = useGetUser();

  const { isFetching: isFetchingStatus, data: status } =
    useGetStatus('initialGetUser');

  useEffect(() => {
    if (status && status.isConnected) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (isFetchingUser || isFetchingStatus) return null;

  return (
    <AuthProvider initialUser={user}>
      <InnerApp />
    </AuthProvider>
  );
};

export default App;
