import { CheckCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import useGetGuild from 'api/guild/getGuild';
import { Route } from 'routes/_auth.guilds.$guildId';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from 'utils';
import { format, formatDistance } from 'date-fns';

const activity = [
  {
    id: 1,
    type: 'created',
    person: { name: 'Chelsea Hagon' },
    date: '7d ago',
    dateTime: '2023-01-23T10:32',
  },
  {
    id: 2,
    type: 'edited',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:03',
  },
  {
    id: 3,
    type: 'sent',
    person: { name: 'Chelsea Hagon' },
    date: '6d ago',
    dateTime: '2023-01-23T11:24',
  },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 5,
    type: 'viewed',
    person: { name: 'Alex Curren' },
    date: '2d ago',
    dateTime: '2023-01-24T09:12',
  },
  {
    id: 6,
    type: 'paid',
    person: { name: 'Alex Curren' },
    date: '1d ago',
    dateTime: '2023-01-24T09:20',
  },
];

const GuildFeed = () => {
  const { guildId } = Route.useParams();
  const { data: guild, isFetching } = useGetGuild({ guildId });
  return (
    <>
      <ul role="list" className="space-y-6">
        {guild?.nuts.map((nut) => (
          <li key={nut.id} className="relative flex gap-x-4">
            <div
            // className={cn(
            //   activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
            //   'absolute left-0 top-0 flex w-6 justify-center',
            // )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {nut.comment === 'commented' ? (
              <>
                <Avatar>
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
                  <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
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
        ))}
      </ul>
    </>
  );
};

export default GuildFeed;
