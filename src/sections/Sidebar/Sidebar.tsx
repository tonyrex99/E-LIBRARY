/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import routes from '@/routes';
import useSidebar from '@/store/sidebar';
import Drawer from '@mui/material/Drawer';
import { ExpandLess, ExpandMore, ExitToApp } from '@mui/icons-material';
import { removeAuthToken } from '@/api/cookies';
import './style.css';

export const drawerWidth = 300;

interface Props {
  window?: () => Window;
  title?: string;
}

function Sidebar(props: Props) {
  const { title } = props;
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const handleDropdownToggle = (path: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  function renderSidebar(sidebarroutes: typeof routes, parentPath = '') {
    const items: JSX.Element[] = [];

    Object.values(sidebarroutes).forEach(
      ({ path, title: routeTitle, icon: Icon, nested, notChild, visible }) => {
        if (!visible) return;

        const fullPath = parentPath ? `${parentPath}/${path}` : path;
        console.log('fullpath is: ', fullPath);
        const hasNestedRoutes = nested && Object.values(nested).some((nr) => nr.visible);

        if (!notChild) {
          items.push(
            <ListItem key={fullPath} sx={{ px: 1 }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSidebarOpen ? 'initial' : 'center',
                  borderColor: 'black',
                  borderwidth: '1px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  color: 'black',
                }}
                component={NavLink}
                to={fullPath!}
                onClick={sidebarActions.close}
                end
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {Icon ? <Icon sx={{ color: 'inherit' }} /> : <DefaultIcon />}
                </ListItemIcon>
                <ListItemText primary={routeTitle} />
                {hasNestedRoutes &&
                  Object.values(nested).filter((nr) => nr.visible && !nr.notChild).length > 0 &&
                  (openDropdowns[fullPath!] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {hasNestedRoutes && (
                <Collapse in={openDropdowns[fullPath!]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {Object.values(nested)
                      .filter((nr) => nr.visible && !nr.notChild)
                      .map((nr) => renderSidebar({ [nr.path as string]: nr }, fullPath))}
                  </List>
                </Collapse>
              )}
            </ListItem>,
          );
        }

        if (hasNestedRoutes) {
          Object.values(nested).forEach((nr) => {
            if (nr.visible && nr.notChild) {
              items.push(
                <ListItem
                  key={`${fullPath}/${nr.path}`}
                  sx={
                    {
                      // px: 1,
                    }
                  }
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isSidebarOpen ? 'initial' : 'center',

                      borderColor: 'black',
                      borderwidth: '1px',
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      color: 'black',
                      width: '100%',
                      mx: -1,
                    }}
                    component={NavLink}
                    className={`rounded-xl border w-full`}
                    to={`${fullPath}/${nr.path}`}
                    onClick={sidebarActions.close}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    >
                      {nr.icon ? <nr.icon sx={{ color: 'inherit' }} /> : <DefaultIcon />}
                    </ListItemIcon>
                    <ListItemText className="w-full text-xl" primary={nr.title} />
                  </ListItemButton>
                </ListItem>,
              );
            }
          });
        }
      },
    );

    return items;
  }

  const filteredRoutes = title
    ? Object.values(routes).filter((route) => route.path === title)
    : Object.values(routes);

  const drawer = (
    <div
      style={{ position: 'relative', height: '100%' }}
      className="flex flex-col justify-start items-center bg-[#d3d3d3] border-r-2 border-gray-800"
    >
      <div className="w-full text-center p-3 text-xl mt-2 font-semibold">COE LIBRARY</div>
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {filteredRoutes.map((route) => renderSidebar({ [route.path as string]: route }))}
      </List>
      <ListItem
        component={NavLink}
        to="/"
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 5,
          width: '80%',
          justifyContent: 'center',
          mx: 4,
          borderColor: 'black',
          borderwidth: '1px',
          backgroundColor: 'white',
          borderRadius: '15px',
          color: 'black',
        }}
        className="hover:bg-[#5c0512]/50 hover:text-white"
        onClick={() => removeAuthToken()}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText className="text-xl" primary="Logout" />
      </ListItem>
    </div>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={sidebarActions.close}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        component="nav"
        data-pw="sidebar"
        variant="temporary"
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        container={container}
      >
        {drawer}
      </Drawer>

      <Drawer
        anchor="left"
        variant="permanent"
        className="bg-blue-500"
        component="nav"
        data-pw="sidebar"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Sidebar;
