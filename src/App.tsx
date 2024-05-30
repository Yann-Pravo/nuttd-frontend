import './App.css';

import React from 'react';

import useGetStatus from './api/auth/getStatus';
import Signin from './containers/Authentication/Signin';
import Home from 'containers/Home';

const App = () => {
  const { isPending, isError } = useGetStatus();
  if (isPending) return null;
  if (isError) return <Signin />;

  return <Home />;
};

export default App;
