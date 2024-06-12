import { useQuery } from '@tanstack/react-query';

import client from '..';
import { Guild } from 'constants/models';

interface GetGuildParams {
  guildId: string;
}

const getGuild = async ({ guildId }: GetGuildParams): Promise<Guild> => {
  const { data } = await client.get(`/guilds/${guildId}`);

  return data;
};

const useGetGuild = (params: GetGuildParams, props = {}) =>
  useQuery({
    queryKey: ['getGuild', params.guildId],
    queryFn: () => getGuild(params),
    refetchOnWindowFocus: false,
    retry: false,
    ...props,
  });

export default useGetGuild;
