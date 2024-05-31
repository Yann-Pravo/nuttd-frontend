enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  RESET_PASSWORD = '/reset-password',
}

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.RESET_PASSWORD,
];

export const PRIVATE_ROUTES = [ROUTES.HOME];

export default ROUTES;
