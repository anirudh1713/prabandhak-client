import axios, {AxiosResponse} from 'axios';
import {IncomingMessage, ServerResponse} from 'http';
import {config} from '../config';
import {IRefreshTokenResponse} from '../types/api-responses/auth';

const SET_COOKIE_HEADER = 'set-cookie';

// Refresh the tokens.
const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.get<IRefreshTokenResponse>(
    `${config.apiEndpoint}/auth/refresh`,
    {
      headers: {cookie: req.headers.cookie || ''},
    },
  );
  const cookies = response.headers[SET_COOKIE_HEADER];

  // Set current request headers.
  req.headers.cookie = `access=${response.data.tokens.access.token}; refresh=${response.data.tokens.refresh.token}`;
  // Set response header to update cookie in browser.
  res.setHeader(SET_COOKIE_HEADER, cookies!);
};

export const ssrRequest = async <T>(
  url: string,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<AxiosResponse<T, any>> => {
  const apiRequest = () =>
    axios.get<T>(`${config.apiEndpoint}${url}`, {
      headers: {
        cookie: req.headers.cookie || '',
      },
    });

  try {
    const response = await apiRequest();
    return response;
  } catch (error) {
    // If 401, try and refresh the token and re-run original request
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        await refreshTokens(req, res);
        const response = await apiRequest();

        return response;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
      // Else just reject the promise.
    } else {
      return Promise.reject(error);
    }
  }
};
