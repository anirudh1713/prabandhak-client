import axios from 'axios';
import { config } from '../config';

const baseInstance = axios.create({
  baseURL: config.apiEndpoint,
  withCredentials: true,
});

export default baseInstance;
