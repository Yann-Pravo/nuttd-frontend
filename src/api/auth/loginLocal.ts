import { useQuery } from '@tanstack/react-query';

import client from '..';
import { setTokens } from 'utils';

interface LoginProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginLocal = async ({ email, password }: LoginProps) => {
  const { data } = await client.post('/auth/login', {
    email,
    password,
  });

  await setTokens(data);

  return data;
};

const useLoginLocal = (key: string, body: LoginProps, props = {}) =>
  useQuery({
    queryKey: [key, body],
    queryFn: () => loginLocal(body),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    ...props,
  });

export default useLoginLocal;
