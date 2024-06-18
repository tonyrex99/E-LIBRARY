/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { ChevronLeft } from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getChangeDueRequest } from '@/services/users/queries';
import { approveDueDateChange } from '@/services/users/mutations';

function AdminBookManagementApprove() {
  const { data, isLoading } = useQuery({
    queryFn: getChangeDueRequest,
    queryKey: ['ALLBOOKREQUEST'],
  });

  const changeDueDate = useMutation({
    mutationFn: approveDueDateChange,
    onSuccess: () => {
      alert('Extension approved');
    },
    onError: () => {
      alert('Operation encountered an error');
    },
  });

  const ApproveList = data?.data || [];
  console.log('all book request: ', data);

  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <button className="mb-2 font-bold text-xl flex flex-row items-center">
          <ChevronLeft /> &nbsp;<div>Book Management / Approve submission change request</div>
        </button>
        <div className="flex gap-11 flex-col">
          <div className="w-full">
            {isLoading ? (
              <div>Loading...</div>
            ) : ApproveList.length > 0 ? (
              ApproveList.map((item, key: number) => (
                <div
                  key={key}
                  className="flex justify-between flex-row items-center py-3 px-10 w-full bg-ash-500 text-gray-800"
                >
                  <div className="flex flex-row">
                    <div className="text-gray-800 font-bold">
                      {' '}
                      &nbsp; User {item.matricNumber}&nbsp;{' '}
                    </div>{' '}
                    wants to change his date of return from{' '}
                    <div className="text-gray-800 font-bold">&nbsp; {item.oldDueDate}&nbsp;</div> to{' '}
                    <div className="text-gray-800 font-bold">&nbsp; {item.newDueDate}&nbsp;</div>
                  </div>
                  <div className="flex flex-row gap-x-1">
                    <button
                      onClick={() => {
                        changeDueDate.mutate({
                          bookRequestId: Number(item?.bookRequestId),
                          decision: 'APPROVED',
                        });
                      }}
                    >
                      <div className="p-3 bg-gray-800 text-white rounded-[15px] font-normal">
                        Approve
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        changeDueDate.mutate({
                          bookRequestId: Number(item?.bookRequestId),
                          decision: 'DENIED',
                        });
                      }}
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

export default AdminBookManagementApprove;
