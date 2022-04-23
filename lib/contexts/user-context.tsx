import {createContext, useContext, useEffect, useMemo, useReducer} from 'react';
import FullScreenLoader from '../../components/LoadingIndicator/FullScreenLoader';
import {authAPI} from '../api';
import {
  IUserContext,
  IUserState,
  STATUSES,
  USER_REDUCER_ACTION_TYPES,
} from '../types/user-context';

interface IProviderProps {
  children: JSX.Element;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

// Reducer setup.
const initialState: IUserState = {
  user: undefined,
  isLoggedIn: false,
  /**
   * Assume user is authenticated initially,
   * as we're fetching user data in useUser hook so it'll handle the other cases
   */
  status: STATUSES.AUTHENTICATED,
};
const userReducer = (
  state: IUserState,
  action: USER_REDUCER_ACTION_TYPES,
): IUserState => {
  switch (action.type) {
    case 'GET_USER':
      return {...state, status: STATUSES.LOADING};

    case 'SET_USER':
      return {
        user: {...action.payload},
        isLoggedIn: true,
        status: STATUSES.AUTHENTICATED,
      };

    case 'SET_ERROR':
      return {...state, status: STATUSES.UNAUTHENTICATED};

    case 'RESET':
      return {...initialState};

    default:
      return state;
  }
};

// User Provider
export const UserProvider = ({children}: IProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value: IUserContext = useMemo(() => {
    return {
      userState: state,
      userDispatch: dispatch,
    };
  }, [state]);

  // Show full screen loader.
  if (state.status === STATUSES.LOADING) {
    return <FullScreenLoader />;
  }

  // Show full screen error message.
  if (state.status === STATUSES.UNAUTHENTICATED) {
    return (
      <div className="text-red-600">
        <div>You need to login again</div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/login">Login Now</a>
      </div>
    );
  }

  if (state.status === STATUSES.AUTHENTICATED) {
    return (
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
  }

  throw new Error(`Unhandled (invalid) status: ${state.status}`);
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  useEffect(() => {
    if (!context.userState.user) {
      context.userDispatch({type: 'GET_USER'});
      authAPI
        .getMe()
        .then(data => {
          context.userDispatch({type: 'SET_USER', payload: data.user});
        })
        .catch(() => {
          context.userDispatch({type: 'SET_ERROR'});
        });
    }
  }, [context]);

  return context;
};
