import { useQuery } from '@tanstack/react-query';

import client from '..';
import { LocationNuttd } from 'api/auth/getLocation';

interface GetNutsRankProps {
  monthRankCity: number;
  yearRankCity: number;
  monthRankCountry: number;
  yearRankCountry: number;
}

interface GetNutsRankParams {
  location?: Pick<LocationNuttd, 'city' | 'country'>;
}

const getNutsRank = async (
  body: GetNutsRankParams,
): Promise<GetNutsRankProps> => {
  const { data } = await client.post('/nuts/mynutsrank', {
    ...body,
  });

  return data;
};

const useGetNutsRank = (body: GetNutsRankParams, props = {}) =>
  useQuery({
    queryKey: ['getNutsRank', body],
    queryFn: () => getNutsRank(body),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(body.location),
    ...props,
  });

export default useGetNutsRank;
