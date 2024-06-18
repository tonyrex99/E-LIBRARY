/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
export interface AuthSuccessResponse {
  userId: number;
  token: string;
  role: string;
  department: string;
}

export interface AuthValue {
  token: string;
  role: string;
  department: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
}

export interface UsersResponseData {
  matricNumber: string;
  userId: string;
  department: string;
  role: string;
}

export interface UserResponseData {
  success: boolean;
  message: string;
  data: {
    matricNumber: string;
    userId: string;
    department: string;
    role: string;
  };
}
