import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyBookRequests } from '@/services/users/queries';
import { LoadBookName } from '../BorrowedBooks/BorrowedBook';
import { bookRequest } from '@/services/users/queries';
import { getMessages } from '@/services/users/queries';
function Notification() {
  const { data, isLoading } = useQuery({
    queryFn: getMyBookRequests,
    queryKey: ['ALLMYBOOKREQUEST'],
  });

  const { data: notifData } = useQuery({
    queryFn: getMessages,
    queryKey: ['NOTIFICATIONRESPONSE'],
  });

  const messages = notifData?.data;
  const [overdueBooks, setOverdueBooks] = useState<bookRequest[]>([]);

  useEffect(() => {
    if (!isLoading && data) {
      const overdue = data.data.filter((item) => new Date(item.dueDate) < new Date());
      setOverdueBooks(overdue);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full h-full text-xl flex-col gap-y-2 bg-gray-800 p-10 rounded-[15px]">
      <div className="font-bold text-white mb-8">Notification</div>
      {overdueBooks.length > 0 ? (
        overdueBooks?.map((book) => (
          <div key={book.bookId} className="flex text-gray-800 flex-col px-8 py-5 bg-red-500">
            <div className="font-bold mb-1">Admin</div>
            <div className="flex flex-row">
              &quot;
              <LoadBookName id={book.bookId} />
              &quot; is overdue (due date was: {new Date(book.dueDate).toLocaleString(
                'en-UK',
              )}){' '}
            </div>
          </div>
        ))
      ) : (
        <div className="text-white">No overdue books here...</div>
      )}
      {messages?.map((message) => (
        <div key={message?.bookId} className="flex text-gray-800 flex-col px-8 py-5 bg-red-500">
          <div className="font-bold mb-1">Admin</div>
          <div className="flex flex-row">
            Your requested to borrow &quot;
            <LoadBookName id={message?.bookId} />
            &quot; thus: {message?.message}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notification;
