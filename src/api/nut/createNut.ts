import { useMutation } from '@tanstack/react-query';

import client from '..';

export interface CreateNutProps {
  date: Date;
  comment: string;
}

const createNut = async ({ date, comment }: CreateNutProps) => {
  const { data } = await client.post('/nuts', { date, comment });

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
