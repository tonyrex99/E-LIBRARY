import { Link } from 'react-router-dom';
import Meta from '@/components/Meta';
import { ChevronLeft } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getMyBookRequests, getBook } from '@/services/users/queries';
import { useParams } from 'react-router-dom';
import { getAllUsersData } from '@/services/users/queries';
export const LoadBookName = ({ id }: { id: number | string }) => {
  const { data: bookData, isLoading: bookLoading } = useQuery({
    queryFn: () => getBook(Number(id)),
    queryKey: ['BOOK', id],
  });
  console.log('data of book is: ', bookData);
  if (bookLoading) {
    return <div>Loading...</div>;
  }

  return <>{bookData?.data?.name} </>;
};

interface LoadUserNameProps {
  id: number | string;
}

export const LoadUserName = ({ id }: LoadUserNameProps) => {
  const { data: userData, isLoading: userLoading } = useQuery({
    queryFn: () => getAllUsersData(),
    queryKey: ['USER', id],
  });

  console.log('data of users is: ', userData);

  if (userLoading) {
    return <div>Loading...</div>;
  }
  console.log(' user data returned is: ', userData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalData: any[] | undefined = userData?.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = finalData?.find((user: any) => user.userId === id);

  return <>&nbsp;{user ? user.matricNumber : 'User not found'}&nbsp; </>;
};

function BorrowedBook() {
  const { reserve } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: getMyBookRequests,
    queryKey: ['ALLMYBOOKREQUEST'],
  });

  if (isLoading) {
    return <div>Loading Data....</div>;
  }

  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <Link to={'/dashboard/book-transaction'}>
          <button className="mb-2 font-bold text-xl flex flex-row items-center">
            <ChevronLeft /> &nbsp;<div>{reserve ? 'Reserved' : 'Borrowed'} books</div>
          </button>
        </Link>
        <div className="flex gap-11 flex-col">
          <div className="w-full">
            {data?.data
              .filter((item) => item.bookRequestType === (reserve ? 'RESERVE' : 'BORROW'))
              .filter((item) => item.status === 'APPROVED' || item.status === 'PENDING')
              .map((item, key) => (
                <div
                  key={key}
                  className="flex justify-between flex-row items-center py-3 px-10 w-full bg-ash-500 text-gray-800"
                >
                  <div className="flex flex-wrap justify-center">
                    {item.status == 'PENDING'
                      ? `You requested to ${reserve ? 'reserve' : 'borrow'}`
                      : `You ${reserve ? 'reserved' : 'borrowed'}`}{' '}
                    <div className="text-gray-800 font-bold flex flex-row">
                      &nbsp;
                      <LoadBookName id={item.bookId} />
                      &nbsp;
                    </div>
                    {item.status == 'PENDING'
                      ? 'and return it by'
                      : new Date(item.dueDate) < new Date()
                        ? 'OVERDUE!!'
                        : ' to be returned by'}{' '}
                    <div
                      className={`text-gray-800 font-bold ${
                        new Date(item.dueDate) < new Date() ? 'text-red-500' : ''
                      }`}
                    >
                      &nbsp; {new Date(item.dueDate).toLocaleString('en-UK')}&nbsp;
                    </div>
                  </div>
                  {item.status == 'PENDING' ? (
                    <div className="p-3 bg-gray-800 text-blue-300 rounded-2xl font-normal">
                      Pending approval
                    </div>
                  ) : (
                    <Link to={`/dashboard/${item.bookId}/${item.bookRequestId}`}>
                      <div className="p-3 bg-gray-800 text-white rounded-2xl font-normal">
                        Request extension
                      </div>
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowedBook;
