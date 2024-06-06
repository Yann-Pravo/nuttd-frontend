import { useMutation } from '@tanstack/react-query';

import client from '..';
import { Gender } from 'constants/models';

export interface CreateProfileProps {
  displayName: string;
  birthday: Date;
  gender: Gender;
}

const createProfile = async ({
  displayName,
  birthday,
  gender,
}: CreateProfileProps) => {
  const { data } = await client.post('/profile', {
    displayName,
    birthday,
    gender,
  });

  return data;
};

const useCreateProfile = (key = 'createProfile', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (body: CreateProfileProps) => createProfile(body),
    retry: false,
    ...props,
  });

export default useCreateProfile;
