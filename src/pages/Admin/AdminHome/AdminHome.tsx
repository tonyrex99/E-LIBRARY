import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Meta from '@/components/Meta';
import Sidebar from '@/sections/Sidebar';
import Header from '@/sections/Header';
import { drawerWidth } from '@/sections/Sidebar/Sidebar';
function AdminHome() {
  return (
    <div className="w-full flex flex-col justify-end">
      <Header />
      <Sidebar title="/admin" />
      <Meta title="Home" />
      <Box
        className=" sm:self-end px-12 pt-10"
        component="main"
        sx={{
          flexGrow: 1,

          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}

export default AdminHome;
