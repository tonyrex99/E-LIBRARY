/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from '@mui/material/TextField';

import Meta from '@/components/Meta';
import { useState } from 'react';
import { Input } from '@mui/material';
import { Modal } from '@mui/material';
import { Check } from '@mui/icons-material';
import { Close } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getBook } from '@/services/users/queries';
import {
  requestBorrowReserveBook,
  requestDueDateChange,
  returnBook,
} from '@/services/users/mutations';
import { reserveBookData } from '@/services/users/mutations';
import { getMyBookRequests } from '@/services/users/queries';
import { ChangeEvent, useEffect } from 'react';
import BookCover from '@/components/BookCover';
type ModalTypes = 'BORROW' | 'RESERVE' | 'success' | 'RENEW' | 'close' | 'failure';

type BookActionsType = {
  type: ModalTypes;
  error?: string;
  book?: string;
  renew?: string;
  setType: (type: 'BORROW' | 'RESERVE' | 'success' | 'close') => void;
};

function convertToISO(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  const isoDate: string = new Date(`${year}-${month}-${day}`).toISOString();
  return isoDate;
}

function Book() {
  const { book, renew } = useParams();
  console.log(' RENEW value is: ', renew);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getBook(Number(book!)),
    queryKey: ['GETBOOKBYID'],
    // retry: false,
  });

  const { data: allBorrowed } = useQuery({
    queryFn: getMyBookRequests,
    queryKey: ['ALLMYBOOKREQUEST'],
  });

  const returnBookMutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      alert(`Book successfully returned!`);
    },
    onError: () => {
      alert(`Returning book failed!`);
    },
  });
  const isBookBorrowed = allBorrowed?.data?.find(
    (item: any) =>
      item.bookId === Number(book) &&
      item.bookRequestType === 'BORROW' &&
      item.status === 'APPROVED',
  );

  const isBookReserved = allBorrowed?.data?.find(
    (item: any) =>
      item.bookId === Number(book) &&
      item.bookRequestType === 'RESERVE' &&
      item.status === 'APPROVED',
  );

  const isBookPending = allBorrowed?.data?.find(
    (item: any) => item.bookId === Number(book) && item.status === 'PENDING',
  );

  console.log(
    'book is borrowed: ',
    Boolean(isBookBorrowed),
    ' book status is pending: ',
    Boolean(isBookPending),
    ' book status is reserved: ',
    Boolean(isBookReserved),
  );

  const bookRequestId = isBookBorrowed?.bookRequestId || isBookReserved?.bookRequestId;
  const bookData = data?.data;

  const inLibrary = isBookBorrowed;
  const [isModal, setisModal] = useState<ModalTypes>('close');
  function requestExtension() {
    setisModal('RENEW');
  }

  useEffect(() => {
    if (renew) {
      requestExtension();
    }
  }, [renew]);

  function borrowBook() {
    setisModal('BORROW');
  }

  function reserveBook() {
    console.log('reserveBook');
    setisModal('RESERVE');
  }

  const pageData = {
    title: bookData?.name,
    author: bookData?.author,
    about: bookData?.about,
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isError) {
    return <div>An Error Occurred... {String(error)} </div>;
  }
  return (
    <div className="flex w-full h-full flex-col gap-y-16 text-xl">
      <Meta title="Book" />

      <div className="flex w-full h-auto flex-row gap-9">
        <div className="items-end flex w-full ">
          <div className="gap-x-9 flex flex-row w-full">
            <div className="hidden lg:flex">
              <BookCover
                width={250}
                height={350}
                author={pageData?.author as string}
                title={pageData?.title as string}
              />
            </div>
            <div className="gap-y-10 justify-between flex flex-col w-full">
              <div className=" w-fit text-center">
                <div className="text-gray-800 font-bold ">{pageData.title}</div>
                <div>{pageData.author}</div>
              </div>

              <div className="w-full flex gap-6  flex-col">
                {!inLibrary && Boolean(!isBookPending) && Boolean(!isBookReserved) ? (
                  <>
                    {' '}
                    <button
                      onMouseDown={borrowBook}
                      className="bg-gray-800 max-w-[469px] text-white p-4 rounded-2xl w-full "
                    >
                      Borrow book now
                    </button>
                    <button
                      onMouseDown={reserveBook}
                      className="bg-gray-800 max-w-[469px] text-white p-4 rounded-2xl w-full "
                    >
                      Reserve this book for later
                    </button>
                  </>
                ) : !isBookPending ? (
                  <>
                    <button
                      onMouseDown={requestExtension}
                      className="bg-gray-800 max-w-[469px] text-white p-4 rounded-2xl w-full "
                    >
                      Request Extension
                    </button>
                    <button
                      onMouseDown={() => returnBookMutation.mutate(Number(bookRequestId))}
                      className="bg-gray-800 max-w-[469px] text-white p-4 rounded-2xl w-full "
                    >
                      {isBookReserved ? 'Un-reserve' : 'Return'} Book
                    </button>
                  </>
                ) : (
                  <div>
                    Sorry. This book has either been reserved or your previous request for this book
                    is still pending..{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-gray-800 font-medium">About</div>

        <div>{pageData.about}</div>
      </div>
      <ActionsModal
        book={book}
        type={isModal}
        renew={renew}
        setType={(value) => {
          setisModal(value);
        }}
      />
    </div>
  );
}

export function ActionsModal({ type, setType, error, book, renew }: BookActionsType) {
  const [formValues, setFormValues] = useState<reserveBookData>({
    pickUpDate: 'string',
    dueDate: 'string',
    description: 'string',
    bookRequestType: type,
  });
  console.log('type is now: ', type);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'pickUpDate' || name === 'dueDate') {
      formattedValue = convertToISO(value);
    }

    console.log('name is: ', name, ' target is: ', formattedValue);
    setFormValues({ ...formValues, [name]: formattedValue });
  };

  const createBookRequest = useMutation({
    mutationFn: requestBorrowReserveBook,
    onSuccess: () => setType('success'),
    onError: (error) => {
      console.log(' error is: ', error);
      alert('An error occurred check your network/inputs and try again');
    },
  });

  const extendBookRequest = useMutation({
    mutationFn: requestDueDateChange,
    onSuccess: () => setType('success'),
    onError: (error) => {
      console.log(' error is: ', error);
      alert('An error occurred check your network/inputs and try again');
    },
  });

  function borrowBook(type: string) {
    const dataSent = { ...formValues, bookRequestType: type };
    type == 'RENEW'
      ? extendBookRequest.mutate({
          data: {
            newDueDate: formValues.pickUpDate,
          },
          bookRequestId: Number(renew),
        })
      : createBookRequest.mutate({ data: dataSent, bookId: Number(book) });
  }

  function handleClose() {
    setType('close');
  }

  return (
    <Modal
      open={type != 'close'}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center justify-center"
    >
      <div className="bg-white p-11 self-center w-full max-w-sm flex flex-col gap-6">
        {type != ('success' || 'failure') ? (
          <>
            <div className=" font-inter text-center font-semibold text-xl text-gray-800">
              Fill up the form details
            </div>

            <div className="flex flex-col mt-3">
              <div className="font-inter font-semibold text-base text-gray-800">
                {type == 'BORROW'
                  ? 'From'
                  : type == 'RESERVE'
                    ? 'From(Enter the date you’ll be ready to pickup)'
                    : 'Enter new proposed date of return'}
              </div>
              <Input
                onChange={(e) => handleInputChange(e)}
                name={'pickUpDate'}
                className="border-gray-800 border py-5 px-6 mt-3 flex justify-center text-2xl text-gray-800 rounded-2xl w-full h-16"
                placeholder={
                  type == 'RENEW'
                    ? 'Enter new  date (DD/MM/YYYY)  '
                    : 'Enter date (DD/MM/YYYY) of pickup'
                }
              />
            </div>

            {type !== 'RENEW' && (
              <div className="flex flex-col mt-3">
                <div className="font-inter font-semibold text-base text-gray-800">To</div>
                <Input
                  onChange={(e) => handleInputChange(e)}
                  name="dueDate"
                  className="border-gray-800 border py-5 px-6 mt-3 flex justify-center text-2xl text-gray-800 rounded-2xl w-full h-16"
                  placeholder="Enter date (DD/MM/YYYY) of return"
                />
              </div>
            )}
            <div className="flex flex-col mt-3">
              <div className="font-inter font-semibold text-base text-gray-800">
                {type == 'RENEW' ? 'Why did you request this extension?' : 'Description'}
              </div>

              <TextField
                onChange={(e) => handleInputChange(e)}
                id="fixed-multiline-flexible"
                multiline
                rows={3}
                variant="standard"
                name="description"
                className="border-gray-800 border py-5 px-6 mt-3 flex justify-center text-2xl text-gray-800 rounded-2xl w-full h-16"
                placeholder={'Enter purpose'}
              />
            </div>

            <button
              disabled={createBookRequest?.isPending}
              onMouseDown={() => borrowBook(type)}
              className={`text-white bg-gray-800 py-5 px-16 rounded-2xl w-full ${
                createBookRequest?.isPending && 'bg-gray-500 '
              } `}
            >
              {createBookRequest.isPending ? 'Submitting' : type.toUpperCase()}
            </button>
          </>
        ) : (
          <>
            <div className=" font-inter text-center font-semibold text-xl text-gray-800">
              {error || 'Process Complete'}
            </div>
            <div className="flex items-center justify-center flex-col gap-y-9">
              <div className="text-[70px]">
                {type == 'success' ? (
                  <Check
                    className=" bg-[#4AC237] flex items-center p-10 justify-center rounded-full"
                    fontSize="inherit"
                    style={{ width: '200px', height: '200px' }}
                  />
                ) : (
                  <Close />
                )}
              </div>

              <button
                onMouseDown={handleClose}
                className="text-white bg-gray-800 py-5 px-16 rounded-2xl w-full "
              >
                BACK
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default Book;
