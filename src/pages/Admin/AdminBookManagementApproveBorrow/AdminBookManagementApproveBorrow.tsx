/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { ChevronLeft } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllBookRequests } from '@/services/users/queries';
import { approveBorrowBookRequest } from '@/services/users/mutations';
import { LoadUserName, LoadBookName } from '@/pages/User/BorrowedBooks/BorrowedBook';
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AdminBookManagementApproveBorrow() {
  const queryClient = useQueryClient();
  const [bookRequests, setBookRequests] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState('');
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);

  const { data, isPending, isLoading } = useQuery({
    queryFn: getAllBookRequests,
    queryKey: ['ALLPENDINGBOOKREQUEST'],
  });

  const changeDueDate = useMutation({
    mutationFn: approveBorrowBookRequest,
    onSuccess: async (data, variables) => {
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
    if (decision === 'APPROVED') {
      const confirmed = window.confirm('Are you sure you want to approve this request?');
      if (confirmed) {
        changeDueDate.mutate({ bookRequestId, decision, message: '' });
      }
    } else {
      const confirmed = window.confirm('Are you sure you want to reject this request?');
      if (confirmed) {
        setCurrentRequestId(bookRequestId);
        setOpen(true);
      }
    }
  };

  const handleSendRejectionMessage = () => {
    if (currentRequestId !== null) {
      changeDueDate.mutate({
        bookRequestId: currentRequestId,
        decision: 'REJECTED',
        message: rejectionMessage,
      });
      setOpen(false);
      setRejectionMessage('');
      setCurrentRequestId(null);
    }
  };

  return (
    <div className="flex w-full h-full flex-col">
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reason for Rejection
          </Typography>
          <TextField
            id="modal-modal-description"
            fullWidth
            multiline
            rows={4}
            value={rejectionMessage}
            onChange={(e) => setRejectionMessage(e.target.value)}
          />
          <Button
            onClick={handleSendRejectionMessage}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminBookManagementApproveBorrow;
