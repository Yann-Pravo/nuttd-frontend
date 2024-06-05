import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './paths';
import PublicRoutes from './PublicRoutes';
import Signin from 'containers/Authentication/Signin';
import PrivatesRoutes from './PrivateRoutes';
import Home from 'containers/Home';
import { User } from 'api/user/getUser';
import { Router } from '@tanstack/react-router';
import { rootRoute } from './root-route';

const routeTree = rootRoute.addChildren([authRoute]);

export const router = new Router({ routeTree });

// interface RouterProps {
//   user: User | null;
// }

// const Router: React.FC<RouterProps> = ({ user }) => {
//   return (
//     <Routes>
//       <Route element={<PublicRoutes user={user} />}>
//         <Route path={ROUTES.LOGIN} element={<Signin />} />
//       </Route>
//       <Route element={<PrivatesRoutes user={user} />}>
//         <Route path={ROUTES.HOME} element={<Home />} />
//       </Route>
//       <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
//     </Routes>
//   );
// };

export default Router;
