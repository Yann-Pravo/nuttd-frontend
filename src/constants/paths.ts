enum ROUTES {
  HOME = '/',
  GUILDS = '/guilds',
  MAPS = '/maps',
  GUILD_ID = '/guilds/$guildId',
  LOGIN = '/login',
  SIGNUP = '/signup',
  RESET_PASSWORD = '/reset-password',
}

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.RESET_PASSWORD,
];

export const PRIVATE_ROUTES = [ROUTES.HOME];

export default ROUTES;
