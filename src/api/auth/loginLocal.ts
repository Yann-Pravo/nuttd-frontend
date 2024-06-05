import { useMutation } from '@tanstack/react-query';

import client from '..';
import { setTokens } from 'utils';

export interface LoginProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginLocal = async ({ email, password, rememberMe }: LoginProps) => {
  const { data } = await client.post('/auth/login', {
    email,
    password,
    rememberMe,
  });

  await setTokens(data);

  return data;
};

const useLoginLocal = (key = 'loginLocal', props = {}) =>
  useMutation({
    mutationKey: [key],
    mutationFn: (body: LoginProps) => loginLocal(body),
    retry: false,
    ...props,
  });

export default useLoginLocal;
