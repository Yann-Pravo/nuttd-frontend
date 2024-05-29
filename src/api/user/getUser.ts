import { useQuery } from '@tanstack/react-query';

import client from '..';

const getUser = async () => {
  const { data } = await client.get(
    `${process.env.REACT_APP_HOST_API}/user/me`,
  );

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
