/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { ChevronLeft } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBookRequests } from '@/services/users/queries';
import { approveBorrowBookRequest } from '@/services/users/mutations';
import { LoadUserName, LoadBookName } from '@/pages/User/BorrowedBooks/BorrowedBook';
import { useState, useEffect } from 'react';

function AdminBookManagementApproveBorrow() {
  const queryClient = useQueryClient();
  const [bookRequests, setBookRequests] = useState<any[]>([]);

  const { data, isPending, isLoading } = useQuery({
    queryFn: getAllBookRequests,
    queryKey: ['ALLPENDINGBOOKREQUEST'],
  });

  const changeDueDate = useMutation({
    mutationFn: approveBorrowBookRequest,
    onSuccess: async (data, variables) => {
      // Immediately remove the processed item from the state
      setBookRequests((prev) =>
        prev.filter((request) => request.bookRequestId !== variables.bookRequestId),
      );
      await queryClient.refetchQueries({
        queryKey: ['ALLBOOKREQUEST', 'ALLPENDINGBOOKREQUEST'],
      });
      alert('Operation Successful');
    },
    onError: () => {
      alert('Operation encountered an error');
    },
  });

  useEffect(() => {
    if (data) {
      setBookRequests(data?.data || []);
    }
  }, [data]);

  const handleApproval = (bookRequestId: number, decision: 'APPROVED' | 'REJECTED') => {
    const action = decision === 'APPROVED' ? 'approve' : 'deny';
    const confirmed = window.confirm(`Are you sure you want to ${action} this request?`);
    if (confirmed) {
      changeDueDate.mutate({ bookRequestId, decision });
    }
  };

  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <button className="mb-2 font-bold text-xl flex flex-row items-center">
          <ChevronLeft /> &nbsp;<div>Book Management / Approve book request</div>
        </button>
        <div className="flex gap-11 flex-col">
          <div className="w-full">
            {isPending || isLoading ? (
              <div>Loading...</div>
            ) : bookRequests.length > 0 ? (
              bookRequests
                .filter((item) => item.status == 'PENDING')
                .map((item, key: number) => (
                  <div
                    key={key}
                    className="flex justify-between flex-row items-center py-3 px-10 w-full bg-ash-500 text-gray-800"
                  >
                    <div className="flex flex-row flex-wrap">
                      <div className="text-gray-800 font-bold text-nowrap flex flex-row">
                        &nbsp; User <LoadUserName id={item.userId} />
                        &nbsp;
                      </div>
                      wants to {item?.bookRequestType} &nbsp; <LoadBookName id={item?.bookId} />{' '}
                      from{' '}
                      <div className="text-gray-800 text-nowrap font-bold flex flex-row">
                        &nbsp; {new Date(item.pickUpDate).toLocaleString('en-UK')}&nbsp;
                      </div>
                      to
                      <div className="text-gray-800 font-bold flex flex-row">
                        &nbsp; {new Date(item.dueDate).toLocaleString('en-UK')}&nbsp;
                      </div>
                    </div>
                    <div className="flex flex-row gap-x-1">
                      <button
                        onClick={() => handleApproval(Number(item?.bookRequestId), 'APPROVED')}
                      >
                        <div className="p-3 bg-gray-800 text-white rounded-[15px] font-normal">
                          Approve
                        </div>
                      </button>
                      <button
                        onClick={() => handleApproval(Number(item?.bookRequestId), 'REJECTED')}
                      >
                        <div className="p-3 bg-red-500 text-white rounded-[15px] font-normal">
                          Deny
                        </div>
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div>No book requests to approve</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookManagementApproveBorrow;
