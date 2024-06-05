import { useMutation } from '@tanstack/react-query';

import client from '..';
import { removeTokens } from 'utils';

const logout = async () => {
  const { data } = await client.delete('/auth/logout');

  await removeTokens();

  return data;
};

const useLogout = (key = 'logout', props = {}) =>
  useMutation({
    mutationKey: [key],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    mutationFn: (_: any) => logout(),
    retry: false,
    ...props,
  });

export default useLogout;
