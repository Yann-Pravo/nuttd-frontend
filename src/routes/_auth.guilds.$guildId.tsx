import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import GuildId from 'containers/Guilds/GuildId';

export const Route = createFileRoute(`/_auth${ROUTES.GUILD_ID}`)({
  component: GuildId,
});
