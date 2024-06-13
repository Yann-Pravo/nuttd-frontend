import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import Maps from 'containers/Maps';

export const Route = createFileRoute(`/_auth${ROUTES.MAPS}`)({
  component: Maps,
});
