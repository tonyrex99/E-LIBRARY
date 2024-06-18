/* eslint-disable @typescript-eslint/no-explicit-any */
import Meta from '@/components/Meta';
import { StyledInputBase, Search, SearchIconWrapper } from '@/sections/HotKeys/HotKeys';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllUsersData } from '@/services/users/queries';
import { suspendUserById } from '@/services/users/mutations';

function ManageUsers() {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsersData(),
    queryKey: ['ALLUSERS'],
    refetchOnMount: true,
  });

  const [searchText, setSearchText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data?.data?.filter((user: any) =>
        user.matricNumber.toString().includes(searchText.toUpperCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [data, searchText]);

  const suspend = useMutation({
    mutationFn: suspendUserById,
    onSuccess: () => {
      alert('User Suspended');
    },
    onError: () => {
      alert('Suspension Failed');
    },
  });

  const handleSuspend = (userId: number, matricNumber: string) => {
    const confirmed = window.confirm(`Are you sure you want to suspend user ${matricNumber}?`);
    if (confirmed) {
      suspend.mutate(userId);
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
        {!isLoading && filteredUsers.length === 0 && <div>No results found</div>}
        {!isLoading &&
          filteredUsers.map((item, key) => (
            <div key={key} className="flex flex-row justify-between">
              <div className="mb-2 font-bold text-lg md:text-xl">
                User <b>{item.matricNumber}</b>
              </div>
              <button
                onClick={() => handleSuspend(Number(item.userId), item.matricNumber)}
                className="mb-2 font-normal text-lg md:text-xl hover:underline"
              >
                Suspend
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ManageUsers;
