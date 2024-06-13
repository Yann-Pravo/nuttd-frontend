import { useQuery } from '@tanstack/react-query';

import client from '..';
import { LocationNuttd } from 'constants/models';

interface GetNutCountByLocationProps
  extends Pick<
    LocationNuttd,
    'id' | 'city' | 'country' | 'latitude' | 'longitude'
  > {
  nutCount: number;
}

const getNutCountByLocation = async (): Promise<
  GetNutCountByLocationProps[]
> => {
  const { data } = await client.get('/location/nutcount');

  return data;
};

const useGetNutCountByLocation = (key = 'getNutCountByLocation', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getNutCountByLocation,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetNutCountByLocation;
