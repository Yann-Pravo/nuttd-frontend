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

export const getInitials = (name: string) => {
  if (!name) return ''; // Return an empty string if no name is provided

  const words = name.trim().split(' ');
  let initials = '';

  for (const word of words) {
    if (word.length > 0) {
      initials += word[0].toUpperCase();
    }
  }

  return initials;
};
