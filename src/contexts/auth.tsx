import { toast } from 'sonner';
import useLoginLocal, { LoginProps } from 'api/auth/loginLocal';
import useLogout from 'api/auth/logout';
import useGetUser from 'api/user/getUser';
import React, {
  useEffect,
  createContext,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';
import { User } from 'constants/models';
import useGetLocation, { LocationIP } from 'api/auth/getLocation';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (props: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
  user: User | undefined;
  location: LocationIP | undefined;
  reloadUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

interface AuthProviderProps extends PropsWithChildren {
  initialUser: User | undefined;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  initialUser,
  children,
}) => {
  const [user, setUser] = React.useState<User | undefined>(initialUser);
  const { mutate: loginMutation, isPending: isLoginLocalLoading } =
    useLoginLocal();
  const { mutate: logoutMutation } = useLogout();
  const {
    refetch: getUser,
    isFetching: isUserLoading,
    data: userData,
  } = useGetUser();
  const {
    data: location,
    isFetched: isFetchedLocation,
    refetch: getLocation,
  } = useGetLocation();

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isFetchedLocation && isAuthenticated) {
      getLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchedLocation, isAuthenticated]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const logout = useCallback(async () => {
    await logoutMutation({}, { onSuccess: () => setUser(undefined) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async ({ email, password, rememberMe }: LoginProps) => {
      await loginMutation(
        { email, password, rememberMe },
        {
          onSuccess: () => getUser(),
          onError: () => toast.error('Wrong credentials'),
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        location,
        reloadUser: getUser,
        login,
        logout,
        isLoading: isLoginLocalLoading || isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
