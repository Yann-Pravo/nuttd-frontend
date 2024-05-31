import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './paths';

interface PublicRoutesProps extends PropsWithChildren {
  isAuthenticated: boolean;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
};

export default PublicRoutes;
