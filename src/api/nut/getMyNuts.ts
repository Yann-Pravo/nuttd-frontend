import { useQuery } from '@tanstack/react-query';

import client from '..';
import { LocationNuttd, Nut } from 'constants/models';

type GetMyNutsProps = (Nut & {
  location: Pick<LocationNuttd, 'city' | 'country'>;
})[];

const getMyNuts = async (): Promise<GetMyNutsProps> => {
  const { data } = await client.get('/nuts/mynuts');

  return data;
};

const useGetMyNuts = (key = 'getMyNuts', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getMyNuts,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetMyNuts;
