import { createFileRoute } from '@tanstack/react-router';
import ROUTES from 'constants/paths';

export const Route = createFileRoute(`/_auth${ROUTES.GUILDS}/`)({
  component: () => (
    <div className="grid grid-cols-1 gap-4 lg:col-span-3">
      <section aria-labelledby="section-1-title">
        <h2 className="sr-only" id="section-1-title">
          Section title
        </h2>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              coucou sava?
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
});
