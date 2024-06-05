import { useQuery } from '@tanstack/react-query';

import client from '..';

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  birthday: string;
  followers: User[];
  following: User[];
  guilds: string[];
  nuts: string[];
}

const getUser = async () => {
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
