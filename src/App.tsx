import './App.css';

import React from 'react';

import useGetStatus from './api/auth/getStatus';
import Router from 'routes';

const App: React.FC = () => {
  const { isFetching, isSuccess } = useGetStatus();
  console.log({ isFetching });
  if (isFetching) return null;

  console.log('isSuccess');

  return <Router isAuthenticated={isSuccess} />;
};

export default App;
