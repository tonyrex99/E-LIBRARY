import Meta from '@/components/Meta';
import { useMutation } from '@tanstack/react-query';
import { uploadBook } from '@/services/users/mutations';
import { ChevronLeft } from '@mui/icons-material';
import { Input } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { department } from '@/services/users/endpoints';
function AddBooks() {
  const [bookData, setbookData] = useState({
    name: 'book',
    about: 'book',
    author: 'book',
    departments: ['EIE' as department],
  });
  const addBook = useMutation({
    mutationFn: uploadBook,
    onSuccess: () => {
      alert('Book added successfully');
    },
    onError: () => {
      alert(' Failed to add book!');
    },
  });

  const handleAddBook = () => {
    const confirmed = window.confirm(`Are you sure you want to add book  ${bookData.name}?`);
    if (confirmed) {
      addBook.mutate(bookData);
    }
  };
  return (
    <form className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <Link to={'/admin/book-management'}>
          <button className=" mb-7 font-bold text-xl flex flex-row items-center ">
            <ChevronLeft /> &nbsp;<div> Book Management / Add books</div>
          </button>
        </Link>
        <div className="flex gap-5  flex-col">
          <div className="w-full flex flex-row items-center">
            <div className=" text-nowrap mr-8 ">Book Name:</div>

            <Input
              name="book_name"
              className="border-gray-800 border py-5 px-1 flex justify-center text-2xl w-full text-gray-800 rounded-md  h-10"
              placeholder="Enter your book name"
              onChange={({ target }) => setbookData({ ...bookData, name: target.value })}
            />
          </div>

          <div className="w-full flex flex-row items-center">
            <div className=" text-nowrap mr-8  w-[86.6px]">Department:</div>

            <Input
              name="book_name"
              className="border-gray-800 border py-5 px-1 flex justify-center text-2xl w-full text-gray-800 rounded-md  h-10"
              placeholder="Enter your department e.g EIE or CIVIL ..."
              onChange={({ target }) =>
                setbookData({ ...bookData, departments: [target.value as department] })
              }
            />
          </div>

          <div className="w-full flex flex-row items-center">
            <div className=" text-nowrap mr-8  w-[86.6px] ">Author:</div>

            <Input
              name="author"
              className="border-gray-800 border py-5 px-1 flex justify-center text-2xl w-full text-gray-800 rounded-md  h-10"
              placeholder="Enter author name"
              onChange={({ target }) => setbookData({ ...bookData, author: target.value })}
            />
          </div>
        </div>

        <button
          onClick={handleAddBook}
          className="text-white self-end bg-gray-800 py-5 px-16 rounded-2xl w-fit "
        >
          Add book
        </button>
      </div>
    </form>
  );
}

export default AddBooks;
