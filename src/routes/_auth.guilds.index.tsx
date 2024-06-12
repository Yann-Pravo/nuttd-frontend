import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import GuildList from 'containers/Guilds/GuildList';

export const Route = createFileRoute(`/_auth${ROUTES.GUILDS}/`)({
  component: GuildList,
});
