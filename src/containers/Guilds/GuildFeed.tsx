import { cn } from '@/lib/utils';
import useGetGuild from 'api/guild/getGuild';
import { Route } from 'routes/_auth.guilds.$guildId';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from 'utils';
import { formatDistance } from 'date-fns';

const GuildFeed = () => {
  const { guildId } = Route.useParams();
  const { data: guild, isFetching } = useGetGuild({ guildId });
  return (
    <>
      <ul role="list" className="space-y-6">
        {isFetching ? (
          <div className="flex h-60 items-center justify-center">
            <span className="relative flex size-6 items-center justify-center">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-pink-500"></span>
            </span>
          </div>
        ) : (
          guild?.nuts.map((nut, id) => (
            <li key={nut.id} className="relative flex gap-x-4">
              <div
                className={cn(
                  id === guild?.nuts.length - 1 ? 'h-6' : '-bottom-6',
                  nut.comment && 'mt-4',
                  'absolute left-0 top-0 flex w-6 justify-center',
                )}
              >
                <div className="w-px bg-pink-200" />
              </div>
              {nut.comment ? (
                <>
                  <Avatar className="relative mt-3 size-6 flex-none rounded-full bg-gray-50">
                    {/* <AvatarImage src={nut.profile?.avatar} alt="user image" /> */}
                    <AvatarFallback>
                      {getInitials(nut.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {nut.displayName}
                        </span>{' '}
                        nutted
                      </div>
                      <div className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                        {formatDistance(new Date(nut.date), new Date(), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {nut.comment}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                    <div className="size-1.5 rounded-full bg-pink-100 ring-1 ring-pink-500" />
                  </div>
                  <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-gray-900">
                      {nut.displayName}
                    </span>{' '}
                    nutted in{' '}
                    <span className="font-medium text-gray-900">
                      {nut.location.city}, {nut.location.country}
                    </span>
                  </p>
                  <div className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                    {formatDistance(new Date(nut.date), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default GuildFeed;
