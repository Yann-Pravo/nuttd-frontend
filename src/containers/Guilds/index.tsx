import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from 'contexts/auth';
import CreateGuild from './CreateGuild';

const Guilds = () => {
  const { user } = useAuth();

  return (
    <div className="py-10">
      <main className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">My guilds</h1>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            {/* Middle column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  Section title
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      coucou {user?.profile?.displayName} sava?
                    </div>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      nuts: {user?.nuts?.length}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      My guilds
                    </div>
                    <div className="mt-2 grid grid-cols-3 space-x-4 text-sm">
                      {user?.guilds.map((guild) => (
                        <div key={guild.id}>{guild.name}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <CreateGuild>
                <Button>Create a guild</Button>
              </CreateGuild>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guilds;
