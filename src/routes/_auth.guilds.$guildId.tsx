import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import Guilds from 'containers/Guilds';

export const Route = createFileRoute(`/_auth${ROUTES.GUILD_ID}`)({
  loader: async ({ params: { invoiceId } }) => {
    return {
      invoice: await fetchInvoiceById(parseInt(invoiceId)),
    };
  },
  component: Guilds,
});
