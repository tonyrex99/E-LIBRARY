import Api from '@/api';
import { ApiSuccessResponse, AuthSuccessResponse } from '../types/responses';
import { LOGIN, REGISTER } from './endpoints';

export async function signInUser(args: {
  matricNumber: string;
  password: string;
}): Promise<ApiSuccessResponse<AuthSuccessResponse>> {
  return Api.post(LOGIN, args);
}

interface RegisterUser {
  matricNumber: string;
  password: string;
  role: string;
  department: string;
}

export function registerUser(data: RegisterUser) {
  return Api.post(REGISTER, data);
}
