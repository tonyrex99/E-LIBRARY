/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHotkeys } from 'react-hotkeys-hook';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FlexBox } from '@/components/styled';
import useHotKeysDialog from '@/store/hotkeys';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';
import { useMutation } from '@tanstack/react-query';
import { styled, alpha } from '@mui/material/styles';
import { searchBook } from '@/services/users/mutations';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserRole } from '@/api/cookies';
import { deleteBookById } from '@/services/users/mutations';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

function HotKeys() {
  const [, themeActions] = useTheme();
  const [, sidebarActions] = useSidebar();
  const [isHotKeysDialogOpen, hotKeysDialogActions] = useHotKeysDialog();
  const [value, setValue] = useState('');
  const [searchItems, setSearchItems] = useState<any>([]);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const role = getUserRole();
  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setValue(event.target.value);
  };

  useHotkeys('alt+s', sidebarActions.toggle);
  useHotkeys('alt+t', themeActions.toggle);
  useHotkeys('alt+k', hotKeysDialogActions.toggle);

  const mutation = useMutation({
    mutationFn: searchBook,
    onSuccess: (data: any) => {
      console.log('data is: ', data.data);
      setSearchCompleted(true);
      setSearchItems(data.data);
    },
    onError: (err: any) => {
      console.log('Error: ', err);
      alert('Search Failed');
    },
  });

  const deleteBook = useMutation({
    mutationFn: deleteBookById,
    onSuccess: (data: any) => {
      console.log('data is: ', data.data);
      setSearchItems((prevItems: any) =>
        prevItems.filter((item: any) => item.bookId !== data.data.bookId),
      );
    },
    onError: (err: any) => {
      console.log('Error: ', err);
      alert('Delete Failed');
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      mutation.mutate({
        searchString: value,
      });
      console.log('Enter was pressed');
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={hotKeysDialogActions.close}
      open={isHotKeysDialogOpen}
      data-pw="hotkeys-dialog"
    >
      <DialogContent style={{ borderRadius: 25 }}>
        <FlexBox alignItems="center" height={50} justifyContent="space-between">
          <Search className="border border-gray-800" style={{ borderRadius: 16 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search', role: 'searchbox' }}
            />
          </Search>
        </FlexBox>
        <FlexBox
          alignItems="center"
          height={'auto'}
          width={'inherit'}
          justifyContent="space-between"
          flexDirection={'column'}
          className="gap-y-4 max-h-48 overflow-y-scroll mt-2"
        >
          {searchItems.map((item: any, index: number) => (
            <div key={index} className="flex flex-row items-center gap-1 w-full justify-between">
              <FlexBox key={index} className="text-wrap">
                <span className="flex flex-wrap text-wrap">{item.name}</span>
              </FlexBox>
              {role != 'ADMIN' ? (
                <Link to={`/dashboard/${item?.bookId}`}>
                  <Button color="info" variant="contained">
                    Read
                  </Button>
                </Link>
              ) : (
                <div className="flex gap-1">
                  <a href={`/dashboard/${item?.bookId}`}>
                    <Button color="info" variant="contained">
                      Read
                    </Button>
                  </a>
                  <Button
                    onClick={() => {
                      deleteBook.mutate(Number(item?.bookId));
                    }}
                    color="warning"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </FlexBox>

        {searchCompleted && searchItems.length < 1 && (
          <FlexBox alignItems="center" height={50} width={'inherit'} justifyContent="center">
            <Typography>Nothing to see here...</Typography>
          </FlexBox>
        )}
        {mutation.isPending && (
          <FlexBox alignItems="center" height={50} width={'inherit'} justifyContent="center">
            <Typography>Searching...</Typography>
          </FlexBox>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default HotKeys;
