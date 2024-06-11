import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import Guilds from 'containers/Guilds';

export const Route = createFileRoute(`/_auth${ROUTES.GUILDS}`)({
  component: Guilds,
});
