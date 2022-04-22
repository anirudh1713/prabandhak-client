import { IBaseToken } from "../models/token";
import { IUser } from "../models/user";

// TODO - Rethink this as tokens are now being handled by cookies.
export interface ITokenResponse {
  access: IBaseToken;
  refresh: IBaseToken;
}

export interface ILoginUserResponse {
  user: IUser;
  tokens: ITokenResponse; 
};

export interface IRegisterUserResponse {
  user: IUser;
  tokens: ITokenResponse;
}

export interface IRefreshTokenResponse {
  tokens: ITokenResponse;
}

export interface IGetMeResponse {
  user: IUser;
}
