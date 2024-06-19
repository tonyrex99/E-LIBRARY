export const APIBACK = '/'; //'https://library-project-4iu4.onrender.com/api/v1/';
export type department = 'EIE' | 'CIVIL' | 'PET_CHEM' | 'MECH';

export const GETUSERSDATA = APIBACK + 'users/me';
export const GETALLUSERS = APIBACK + 'users/all';
export const PUTAPPROVEBORROWREQUEST = (bookRequestId: number): string =>
  `${APIBACK}library/books/requests/${bookRequestId}/approve`;
export const PUTAPPROVEDUEDATECHANGE = (bookRequestId: number): string =>
  `${APIBACK}library/books/requests/${bookRequestId}/approve-due-date`;
export const PUTCHANGEDUEDATECHANGE = (bookRequestId: number): string =>
  `${APIBACK}library/books/requests/change-due-date/${bookRequestId}`;
export const POSTUPLOADBOOK = `${APIBACK}library/books`;
export const POSTSEARCHBOOK = `${APIBACK}library/books/search`;
export const POSTBORROWBOOK = (bookId: number): string =>
  `${APIBACK}library/books/request/${bookId}`;
export const GETBOOK = (bookId: number): string => `${APIBACK}library/books/${bookId}`;
export const DELETEBOOK = (bookId: number): string => `${APIBACK}library/books/delete/${bookId}`;
export const GETBOOKREQUESTS = (bookRequestId: number): string =>
  `${APIBACK}library/books/requests/${bookRequestId}`;
export const DELETEBOOKREQUESTS = (bookRequestId: number): string =>
  `${APIBACK}library/books/requests/delete/${bookRequestId}`;
export const GETCHANGEDUEDATE = `${APIBACK}library/books/requests/change-due-date`;
export const GETALLBOOKREQUESTS = `${APIBACK}library/books/requests/all`;
export const GETMYBOOKREQUESTS = `${APIBACK}library/books/requests/me`;

export const GETALLBOOKSFORDEPT = (dept: department): string =>
  `${APIBACK}library/books/all/${dept}`;
export const PUTSUSPENDUSER = (userId: number): string =>
  `${APIBACK}users/account/suspend/${userId}`;
