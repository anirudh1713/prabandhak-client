import { request } from '../../axios';
import { TLoginFormData } from '../../schemas/auth';
import { IGetMeResponse, ILoginUserResponse } from '../../types/api-responses/auth';

const BASE_AUTH_ENDPOINT = '/auth';

export const loginUser = async (data: TLoginFormData) => {
  const res = await request.post<ILoginUserResponse>(`${BASE_AUTH_ENDPOINT}/login`, {
    ...data,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await request.get<IGetMeResponse>(`${BASE_AUTH_ENDPOINT}/me`);

  return res.data;
}
