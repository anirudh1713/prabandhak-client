import {Dispatch} from 'react';
import {IUser} from './models/user';

// TODO - this can be improved
export type USER_REDUCER_ACTION_TYPES =
  | {type: 'SET_USER'; payload: IUser}
  | {type: 'GET_USER'}
  | {type: 'SET_ERROR'}
  | {type: 'RESET'};

export enum STATUSES {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
}

export interface IUserState {
  user?: IUser;
  isLoggedIn: boolean;
  status: STATUSES;
}

export interface IUserContext {
  userState: IUserState;
  userDispatch: Dispatch<USER_REDUCER_ACTION_TYPES>;
}
