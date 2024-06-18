import Meta from '@/components/Meta';
import Header from '@/sections/Header';
import Sidebar from '@/sections/Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { drawerWidth } from '@/sections/Sidebar/Sidebar';
function Dashboard() {
  return (
    <div className="w-full flex flex-col justify-end">
      <Header />
      <Sidebar title="/dashboard" />
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

export default Dashboard;
