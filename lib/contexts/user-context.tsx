import {AxiosError} from 'axios';
import {useRouter} from 'next/router';
import {createContext, useContext, useMemo, useReducer} from 'react';
import {useQuery} from 'react-query';
import FullScreenLoader from '../../components/LoadingIndicator/FullScreenLoader';
import {authAPI} from '../api';
import {getMe} from '../api/auth';
import {TLoginFormData} from '../schemas/auth';
import {IGetMeResponse} from '../types/api-responses/auth';
import {IAPIError} from '../types/api-responses/error';
import {
  IUserContext,
  IUserState,
  USER_REDUCER_ACTIONTYPES,
} from '../types/user-context';

interface IProviderProps {
  children: JSX.Element;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

// Reducer setup.
const initialState: IUserState = {
  user: undefined,
  isLoggedIn: false,
};
const userReducer = (
  state: IUserState,
  action: USER_REDUCER_ACTIONTYPES,
): IUserState => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: {...action.payload}, isLoggedIn: true};

    case 'RESET':
      return {user: undefined, isLoggedIn: false};

    default:
      return state;
  }
};

export const UserProvider = ({children}: IProviderProps) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialState);

  const {isLoading, error} = useQuery<IGetMeResponse, AxiosError<IAPIError>>(
    '/me',
    getMe,
    {
      onSuccess: data => {
        dispatch({type: 'SET_USER', payload: data.user});
      },
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const loginUser = async (data: TLoginFormData) => {
    const res = await authAPI.loginUser(data);
    dispatch({type: 'SET_USER', payload: res.user});
    return res;
  };

  const value: IUserContext = useMemo(() => {
    return {
      userState: state,
      userDispatch: dispatch,
      loginUser,
    };
  }, [state]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (
    error &&
    !router.pathname.includes('login') &&
    !router.pathname.includes('register')
  ) {
    router.replace('/login');
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
