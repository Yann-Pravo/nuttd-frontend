import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from './paths';
import { User } from 'api/user/getUser';

interface PrivatesRoutesProps extends PropsWithChildren {
  user: User | null;
}

const PrivatesRoutes: React.FC<PrivatesRoutesProps> = ({ user }) => {
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
};

export default PrivatesRoutes;
