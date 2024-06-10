import { useMutation } from '@tanstack/react-query';

import client from '..';

export interface CreateNutProps {
  date: Date;
}

const createNut = async ({ date }: CreateNutProps) => {
  const { data } = await client.post('/nuts', { date });

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
