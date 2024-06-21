import { useQuery } from '@tanstack/react-query';

import client from '..';

interface GetNutsCountProps {
  currentMonthCount: number;
  currentYearCount: number;
  currentQuarter: number;
  lastQuarter: number;
  nutCountForLast31Days: number;
}

const getNutsCount = async (): Promise<GetNutsCountProps> => {
  const { data } = await client.get('/nuts/mynutscount');

  return data;
};

const useGetNutsCount = (key = 'getNutsCount', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getNutsCount,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetNutsCount;
