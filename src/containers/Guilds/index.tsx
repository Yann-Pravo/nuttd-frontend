import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from 'contexts/auth';
import CreateGuild from './CreateGuild';
import { Link, Outlet } from '@tanstack/react-router';
import ROUTES from 'constants/paths';

const Guilds = () => {
  const { user } = useAuth();

  return (
    <div className="py-10">
      <main className="pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8">
            <Outlet />

            <div className="grid grid-cols-1 gap-4 lg:sticky lg:top-[104px]">
              <Card>
                <CardContent>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      My guilds
                    </div>
                    <div className="mt-2 flex flex-col">
                      {user?.guilds.map((guild) => (
                        <Link
                          to={ROUTES.GUILD_ID}
                          params={{
                            guildId: guild.id,
                          }}
                          className="truncate"
                          key={guild.id}
                        >
                          {({ isActive }) => (
                            <Button
                              variant="link"
                              padding="none"
                              disabled={isActive}
                            >
                              {guild.name}
                            </Button>
                          )}
                        </Link>
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
