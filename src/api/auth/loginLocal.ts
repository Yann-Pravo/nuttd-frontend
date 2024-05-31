import { useQuery } from '@tanstack/react-query';

import client from '..';

interface LoginProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginLocal = async ({ email, password }: LoginProps) => {
  const { data } = await client.post(
    `${import.meta.env.VITE_HOST_API}/api/auth/login`,
    {
      email,
      password,
    }
  );

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
