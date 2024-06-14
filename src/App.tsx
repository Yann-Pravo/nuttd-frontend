import './App.css';

import React, { Suspense } from 'react';

import useGetUser from 'api/user/getUser';
import { AuthProvider, useAuth } from 'contexts/auth';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from 'routeTree.gen';
import Welcome from 'containers/shared/Welcome';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

function InnerApp() {
  const auth = useAuth();
  return (
    <Suspense>
      <RouterProvider router={router} context={{ auth }} />
    </Suspense>
  );
}

const App: React.FC = () => {
  const { isFetching, data: user } = useGetUser('initialUser', {
    enabled: true,
  });

  if (isFetching) return <Welcome />;

  return (
    <AuthProvider initialUser={user}>
      <InnerApp />
    </AuthProvider>
  );
};

export default App;
