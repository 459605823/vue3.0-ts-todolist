import api from './index';
import {LocationQueryValue} from 'vue-router';

export const login = (username: string, password: string) =>
  api.post('login', {json: {username, password}});
export const register = (username: string, password: string) =>
  api.post('register', {json: {username, password}});
export const oauth = (code: LocationQueryValue | LocationQueryValue[]) =>
  api.get('auth/redirect?code=' + code);
