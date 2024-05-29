import './App.css';

import React from 'react';

import useGetStatus from './api/auth/getStatus';
import Signin from './containers/Authentication/Signin';
import Home from 'containers/Home';

const App = () => {
  console.log('meeeh');
  const { isPending, isError, data, error } = useGetStatus();
  console.log({ isPending, isError, data, error });
  if (isPending) return null;
  if (error) return <Signin />;

  return <Home />;
};

export default App;
