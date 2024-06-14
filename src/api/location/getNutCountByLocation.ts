import { useQuery } from '@tanstack/react-query';

import client from '..';
import { LocationNuttd } from 'constants/models';

interface GetNutCountByLocationParams {
  geoScope: string;
}

interface GetNutCountByLocationProps {
  cities: (Pick<
    LocationNuttd,
    'id' | 'city' | 'country' | 'latitude' | 'longitude'
  > & { nutCount: number })[];
  countries: {
    [key: string]: Pick<LocationNuttd, 'countryCode' | 'country'> & {
      nutCount: number;
    };
  };
}

const getNutCountByLocation = async (
  params: GetNutCountByLocationParams,
): Promise<GetNutCountByLocationProps> => {
  const { data } = await client.get('/location/nutcount', { params });

  return data;
};

const useGetNutCountByLocation = (
  params: GetNutCountByLocationParams,
  props = {},
) =>
  useQuery({
    queryKey: ['getNutCountByLocation', params],
    queryFn: () => getNutCountByLocation(params),
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetNutCountByLocation;
