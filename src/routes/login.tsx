import { createLazyFileRoute } from '@tanstack/react-router';
import ROUTES from './paths';
import Signin from 'containers/Authentication/Signin';

export const Route = createLazyFileRoute(ROUTES.LOGIN)({
  component: Signin,
});
