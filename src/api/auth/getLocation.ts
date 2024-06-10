import { useQuery } from '@tanstack/react-query';

import client from '..';
import { buildLocationNuttd } from './helpers';

export interface LocationIP {
  city: string;
  country_name: string;
  country_flag: string;
  country_code3: string;
  state_code: string;
  state_prov: string;
  zipcode: string;
}

export interface LocationNuttd {
  city: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  region: string;
  regionName: string;
  zip: string;
}

const getLocation = async (): Promise<LocationNuttd> => {
  const { data } = await client.get<LocationIP>(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${
      import.meta.env.VITE_IPGEOLOCATION_KEY
    }&fields=city,country_name,country_flag,country_code3,state_code,state_prov,zipcode`,
  );

  return buildLocationNuttd(data);
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
