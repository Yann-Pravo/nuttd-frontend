import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './paths';
import { User } from 'api/user/getUser';

interface PublicRoutesProps extends PropsWithChildren {
  user: User | null;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ user }) => {
  if (user) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
};

export default PublicRoutes;
