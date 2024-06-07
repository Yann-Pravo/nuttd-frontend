import { useQuery } from '@tanstack/react-query';

import client from '..';

export interface LocationIP {
  city: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  zip: string;
}

const getLocation = async (): Promise<LocationIP> => {
  const { data } = await client.get('http://ip-api.com/json');

  return data;
};

const useGetLocation = (key = 'getLocation', props = {}) =>
  useQuery({
    queryKey: [key],
    queryFn: getLocation,
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useGetLocation;
