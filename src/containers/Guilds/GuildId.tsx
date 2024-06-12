import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from 'contexts/auth';
import CreateGuild from './CreateGuild';
import { Outlet } from '@tanstack/react-router';
import useGetGuild from 'api/guild/getGuild';
import { Route } from 'routes/_auth.guilds.$guildId';
import { format } from 'date-fns';
import GuildFeed from './GuildFeed';

const GuildId = () => {
  const { guildId } = Route.useParams();
  const { data: guild, isFetching } = useGetGuild({ guildId });
  const { user } = useAuth();

  return (
    <>
      <Card>
        <CardContent>
          <div>
            <div className=" flex items-center justify-between text-sm font-medium text-gray-500">
              <div>Nutters</div>
              <div>Nuts in {format(new Date(), 'MMMM')}</div>
            </div>
            <div className="mt-2 space-x-4 text-sm">
              {guild?.users.map((user) => (
                <div
                  key={user.id}
                  className=" flex items-center justify-between"
                >
                  <div className="font-medium">{user.profile.displayName}</div>
                  <div>{user.nutsMonthlyCount}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        <Card>
          <CardContent>
            <GuildFeed />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default GuildId;
