import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import Home from 'containers/Home';

export const Route = createFileRoute(`/_auth${ROUTES.HOME}`)({
  component: Home,
});
