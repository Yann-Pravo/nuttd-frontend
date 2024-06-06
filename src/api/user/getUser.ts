import { useQuery } from '@tanstack/react-query';

import client from '..';
import { User } from 'constants/models';

const getUser = async (): Promise<User> => {
  const { data } = await client.get('/users/me');

  return data;
};

const useGetUser = (key = 'getUser', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
    ...props,
  });

export default useGetUser;
