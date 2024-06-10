import { useQuery } from '@tanstack/react-query';

import client from '..';

interface GetNutsRankProps {
  monthRankCity: number;
  yearRankCity: number;
  monthRankCountry: number;
  yearRankCountry: number;
}

const getNutsRank = async (): Promise<GetNutsRankProps> => {
  const { data } = await client.post('/nuts/mynutsrank');

  return data;
};

const useGetNutsRank = (key = 'getNutsRank', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getNutsRank,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetNutsRank;
