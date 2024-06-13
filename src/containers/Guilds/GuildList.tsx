import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';
import useGetGuilds from 'api/guild/getGuilds';
import useJoinGuild from 'api/guild/joinGuild';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';

const GuildList = () => {
  const navigate = useNavigate();
  const { user, reloadUser } = useAuth();
  const { data: guilds, isFetching } = useGetGuilds();
  const { mutate: joinGuild } = useJoinGuild();

  const myGuildsId = user?.guilds.map((guild) => guild.id) || [];

  const onJoinGuild = (id: string) => {
    joinGuild(
      { guildId: id },
      {
        onSuccess: () => {
          reloadUser();
          navigate({ to: ROUTES.GUILD_ID, params: { guildId: id } });
        },
      },
    );
  };

  return (
    <Card className="lg:col-span-3">
      <CardContent>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {isFetching
            ? Array.from(Array(5).keys()).map((id) => (
                <Skeleton key={id} className="h-[78px]" />
              ))
            : guilds?.map((guild) => (
                <div
                  key={guild.id}
                  className="relative flex items-center space-x-3 rounded-lg border bg-white px-6 py-5 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {guild.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      Nutters: {guild.userCount}
                    </p>
                  </div>
                  <div>
                    {myGuildsId.includes(guild.id) ? (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate({
                            to: ROUTES.GUILD_ID,
                            params: { guildId: guild.id },
                          })
                        }
                      >
                        See
                      </Button>
                    ) : (
                      <Button onClick={() => onJoinGuild(guild.id)}>
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default GuildList;
