import { useMutation } from '@tanstack/react-query';

import client from '..';
import { LocationIP } from 'api/auth/getLocation';

export interface CreateNutProps {
  date: Date;
  location?: LocationIP;
}

const createNut = async ({ date, location }: CreateNutProps) => {
  const { data } = await client.post('/nuts', {
    date,
    ...(location && {
      location: {
        city: location.city,
        country: location.country,
        countryCode: location.countryCode,
        region: location.region,
        regionName: location.regionName,
        zip: location.zip,
      },
    }),
  });

  return data;
};

const useCreateNut = (key = 'createNut', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (body: CreateNutProps) => createNut(body),
    retry: false,
    ...props,
  });

export default useCreateNut;
