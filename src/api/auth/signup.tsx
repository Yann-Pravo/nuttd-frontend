import { useMutation } from '@tanstack/react-query';

import client from '..';

export interface SignupProps {
  email: string;
  username: string;
  password: string;
}

const signup = async ({ email, username, password }: SignupProps) => {
  const { data } = await client.post('/auth/signup', {
    email,
    username,
    password,
  });

  return data;
};

const useSignup = (key = 'signup', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (body: SignupProps) => signup(body),
    retry: false,
    ...props,
  });

export default useSignup;
