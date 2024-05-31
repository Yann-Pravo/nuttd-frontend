import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './paths';

interface PrivatesRoutesProps extends PropsWithChildren {
  isAuthenticated: boolean;
}

const PrivatesRoutes: React.FC<PrivatesRoutesProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
};

export default PrivatesRoutes;
