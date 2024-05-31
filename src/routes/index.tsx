import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './paths';
import PublicRoutes from './PublicRoutes';
import Signin from 'containers/Authentication/Signin';
import PrivatesRoutes from './PrivateRoutes';
import Home from 'containers/Home';

interface RouterProps {
  isAuthenticated: boolean;
}

const Router: React.FC<RouterProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
        <Route path={ROUTES.LOGIN} element={<Signin />} />
      </Route>
      <Route element={<PrivatesRoutes isAuthenticated={isAuthenticated} />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};

export default Router;
