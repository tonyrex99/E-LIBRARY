/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { ChevronLeft } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getAllBookRequests } from '@/services/users/queries';
import { Link } from 'react-router-dom';
import { LoadBookName, LoadUserName } from '@/pages/User/BorrowedBooks/BorrowedBook';

function AdminBorrowedBooks() {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllBookRequests(),
    queryKey: ['ALLBOOKREQUEST'],
  });

  console.log('data of borrowed so far is: ', data?.data);
  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <Link to={'/admin/book-management'}>
          <button className=" mb-7 font-bold text-xl flex flex-row items-center ">
            <ChevronLeft /> &nbsp;<div> Book Management / Borrowed books</div>
          </button>
        </Link>
        {isLoading ? (
          <div>Loading... </div>
        ) : (
          <div className="flex gap-11  flex-col">
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              data?.data?.length! > 0 ? (
                data?.data?.map((item: any, key: number) => (
                  <div key={key} className="w-full flex flex-row">
                    <b>
                      <LoadBookName id={item.bookId} />
                    </b>{' '}
                    &nbsp; has been borrowed by{' '}
                    <b>
                      <LoadUserName id={item.userId} />{' '}
                    </b>{' '}
                    and will be returned on <b>{new Date(item.dueDate).toLocaleString('en-UK')}</b>
                  </div>
                ))
              ) : (
                <div>No borrowed books found..</div>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBorrowedBooks;
