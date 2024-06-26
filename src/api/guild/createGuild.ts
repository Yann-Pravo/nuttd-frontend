import { useMutation } from '@tanstack/react-query';

import client from '..';
import { Guild } from 'constants/models';

export interface CreateGuildProps {
  name: string;
  isPrivate: boolean;
}

const createGuild = async ({
  name,
  isPrivate,
}: CreateGuildProps): Promise<Guild> => {
  const { data } = await client.post('/guilds', { name, isPrivate });

  return data;
};

const useCreateGuild = (key = 'createGuild', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (body: CreateGuildProps) => createGuild(body),
    retry: false,
    ...props,
  });

export default useCreateGuild;
