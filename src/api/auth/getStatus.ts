import { useQuery } from '@tanstack/react-query';

import client from '..';

interface StatusProps {
  isConnected: boolean;
}

const getStatus = async (): Promise<StatusProps> => {
  const { data } = await client.get('/auth/status');

  return data;
};

const useGetStatus = (key = 'getStatus', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getStatus,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetStatus;
