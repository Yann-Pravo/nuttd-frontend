export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
