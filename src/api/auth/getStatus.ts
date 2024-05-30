import { useQuery } from '@tanstack/react-query';

import client from '..';

const getStatus = async () => {
  const { data } = await client.get(
    `${import.meta.env.VITE_HOST_API}/auth/status`,
  );

  return data;
};

const useGetStatus = (key = 'getStatus', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getStatus,
    retry: false,
    ...props,
  });

export default useGetStatus;
