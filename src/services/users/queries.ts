import Api from '@/api';
import { ApiSuccessResponse, UsersResponseData } from '../types/responses';
import {
  GETALLBOOKREQUESTS,
  GETALLBOOKSFORDEPT,
  GETBOOKREQUESTS,
  GETALLUSERS,
  GETUSERSDATA,
  GETCHANGEDUEDATE,
  GETBOOK,
  GETMYBOOKREQUESTS,
  GETMESSAGES,
} from './endpoints';
import { department } from './endpoints';

export interface book {
  author: string;
  about: string;
  name: string;
  bookId: number;
}

export interface bookDue {
  matricNumber: string;
  bookRequestId: string;
  oldDueDate: string;
  newDueDate: string;
}

export interface bookRequest {
  bookRequestId: string;
  userId: number;
  pickUpDate: string;
  dueDate: string;
  bookId: number;
  description: string;
  bookRequestType: string;
  status: string;
  createdAt: string;
}

export function getusersData(): Promise<ApiSuccessResponse<UsersResponseData>> {
  return Api.get(GETUSERSDATA);
}

export function getAllUsersData(): Promise<ApiSuccessResponse<UsersResponseData[]>> {
  return Api.get(GETALLUSERS);
}

export function getAllBookRequests(): Promise<ApiSuccessResponse<bookRequest[]>> {
  return Api.get(GETALLBOOKREQUESTS);
}

export function getMyBookRequests(): Promise<ApiSuccessResponse<bookRequest[]>> {
  console.log('get my book request called');
  return Api.get(GETMYBOOKREQUESTS);
}

export function getAllDeptBooks(dept: department): Promise<ApiSuccessResponse<book[]>> {
  return Api.get(GETALLBOOKSFORDEPT(dept));
}

export function getBookRequestsById(
  bookRequestId: number,
): Promise<ApiSuccessResponse<bookRequest>> {
  return Api.get(GETBOOKREQUESTS(bookRequestId));
}

export function getBook(bookId: number): Promise<ApiSuccessResponse<book>> {
  return Api.get(GETBOOK(bookId));
}

export function getChangeDueRequest(): Promise<ApiSuccessResponse<bookDue[]>> {
  return Api.get(GETCHANGEDUEDATE);
}

export function getMessages(): Promise<ApiSuccessResponse<messagesResponse[]>> {
  return Api.get(GETMESSAGES);
}

export interface messagesResponse {
  messageId: number;
  adminId: number;
  userId: number;
  message: string;
  bookId: number;
}
