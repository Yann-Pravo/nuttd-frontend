import { useMutation } from '@tanstack/react-query';

import client from '..';
import { Guild } from 'constants/models';

interface JoinGuildParams {
  guildId: string;
}

const joinGuild = async ({ guildId }: JoinGuildParams): Promise<Guild> => {
  const { data } = await client.post(`/guilds/${guildId}`);

  return data;
};

const useJoinGuild = (key = 'joinGuild', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (params: JoinGuildParams) => joinGuild(params),
    retry: false,
    ...props,
  });

export default useJoinGuild;
