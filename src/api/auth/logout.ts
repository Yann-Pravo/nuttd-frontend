import { useQuery } from '@tanstack/react-query';

import client from '..';
import { removeTokens } from 'utils';

const logout = async () => {
  const { data } = await client.delete('/auth/logout');

  removeTokens();

  return data;
};

const useLogout = (key = 'logout', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: logout,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useLogout;
