import { Dispatch } from "react";
import { IUser } from "./models/user";
import { TLoginFormData } from "../schemas/auth";
import { ILoginUserResponse } from "./api-responses/auth";

export type USER_REDUCER_ACTIONTYPES = {type: 'SET_USER'; payload: IUser} | {type: 'RESET'};

export interface IUserState {
  user?: IUser;
  isLoggedIn: boolean;
}

export interface IUserContext {
  userState: IUserState;
  userDispatch: Dispatch<USER_REDUCER_ACTIONTYPES>;
  loginUser: (data: TLoginFormData) => Promise<ILoginUserResponse>;
};
