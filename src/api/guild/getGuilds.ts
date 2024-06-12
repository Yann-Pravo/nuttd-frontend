import { useQuery } from '@tanstack/react-query';

import client from '..';
import { Guilds } from 'constants/models';

const getGuilds = async (): Promise<Guilds[]> => {
  const { data } = await client.get('/guilds');

  return data;
};

const useGetGuilds = (key = 'getGuild', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getGuilds,
    refetchOnWindowFocus: false,
    retry: false,
    ...props,
  });

export default useGetGuilds;
