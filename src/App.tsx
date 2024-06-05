import './App.css';

import React, { useEffect } from 'react';

import Router from 'routes';
import useGetUser from 'api/user/getUser';
import useGetStatus from 'api/auth/getStatus';

const App: React.FC = () => {
  const {
    isFetching: isFetchingUser,
    data: user,
    refetch: getUser,
  } = useGetUser();

  const { isFetching: isFetchingStatus, data: status } = useGetStatus();

  useEffect(() => {
    if (status && status.isConnected) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (isFetchingUser || isFetchingStatus)
    return (
      <span className="relative flex size-6 items-center justify-center">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
      </span>
    );

  return <Router user={user} />;
};

export default App;
