import { useMutation } from '@tanstack/react-query';

import client from '..';
import { LocationNuttd } from 'api/auth/getLocation';

export interface CreateNutProps {
  date: Date;
  location?: LocationNuttd;
}

const createNut = async ({ date, location }: CreateNutProps) => {
  const { data } = await client.post('/nuts', {
    date,
    ...location,
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
