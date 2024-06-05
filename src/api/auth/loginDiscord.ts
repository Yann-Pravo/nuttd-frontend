import { useQuery } from '@tanstack/react-query';

import client from '..';
import { setTokens } from 'utils';

const loginDiscord = async () => {
  const { data } = await client.get('/auth/discord');

  setTokens(data);

  return data;
};

const useLoginDiscord = (key = 'loginDiscord', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: loginDiscord,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useLoginDiscord;
