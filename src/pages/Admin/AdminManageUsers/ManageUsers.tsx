/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { StyledInputBase, Search, SearchIconWrapper } from '@/sections/HotKeys/HotKeys';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUsersData } from '@/services/users/queries';
import { suspendUserById } from '@/services/users/mutations';

function ManageUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsersData(),
    queryKey: ['ALLUSERS'],
    refetchOnMount: true,
  });

  const [searchText, setSearchText] = useState('');

  const suspend = useMutation({
    mutationFn: suspendUserById,
    onSuccess: () => {
      alert('Operation Successful');
      queryClient.invalidateQueries({ queryKey: ['ALLUSERS'] });
    },
    onError: () => {
      alert('Operation Failed');
    },
  });

  const handleSuspend = (userId: number, matricNumber: string, status: string) => {
    const value = status == 'suspend' ? true : false;
    const confirmed = window.confirm(`Are you sure you want to ${status} user ${matricNumber}?`);
    if (confirmed) {
      suspend.mutate({ userId, value });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Meta title="Manage Users" />
      <Search className="border mb-12 border-gray-800" style={{ borderRadius: 16 }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Search>

      <div className="flex w-full h-full flex-col">
        {isLoading && <div>Loading...</div>}
        {!isLoading && data?.data?.length === 0 && <div>No results found</div>}
        {!isLoading &&
          data?.data?.map((item, key) => (
            <div
              key={key}
              className={`flex flex-row justify-between items-center rounded-xl p-2 ${
                item?.locked && ' xbg-red-600'
              }`}
            >
              <div className=" font-bold text-lg md:text-xl">
                User <b>{item.matricNumber}</b>
              </div>
              <button
                onClick={() =>
                  handleSuspend(
                    Number(item.userId),
                    item.matricNumber,
                    item?.locked == true ? 'restore' : 'suspend',
                  )
                }
                className={` text-lg md:text-xl hover:underline font-semibold ${
                  item?.locked ? ' text-green-500' : ' text-red-500'
                } `}
              >
                {item?.locked ? 'Restore' : 'Suspend'}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ManageUsers;
