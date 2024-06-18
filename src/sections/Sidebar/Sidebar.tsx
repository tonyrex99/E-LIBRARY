import { Link } from 'react-router-dom';
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
export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  title?: string; // Add title prop
}

function Sidebar(props: Props) {
  const { title } = props; // Destructure title prop
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDropdownToggle = (path: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  function renderSidebar(sidebarroutes: typeof routes, parentPath = '') {
    const items: JSX.Element[] = [];

    Object.values(sidebarroutes).forEach(
      ({ title: routeTitle, icon: Icon, nested, notChild, visible }) => {
        if (!visible) return;

        const fullPath = parentPath; // path == '' ? `/${parentPath}` : `${parentPath}/${path}`;
        console.log('fullpath is ' + fullPath);
        const hasNestedRoutes = nested && Object.values(nested).some((nr) => nr.visible);

        if (!notChild) {
          items.push(
            <ListItem key={fullPath}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSidebarOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                component={Link}
                to={'/' + fullPath}
                onClick={sidebarActions.close}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                  }}
                >
                  {Icon ? <Icon /> : <DefaultIcon />}
                </ListItemIcon>
                <ListItemText primary={routeTitle} />
                {hasNestedRoutes &&
                  Object.values(nested).filter((nr) => nr.visible && !nr.notChild).length > 0 &&
                  (openDropdowns[fullPath] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {hasNestedRoutes && (
                <Collapse in={openDropdowns[fullPath]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {Object.values(nested)
                      .filter((nr) => nr.visible && !nr.notChild)
                      .map((nr) => renderSidebar({ [nr.path as string]: nr }, `/${fullPath}/`))}
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
                <ListItem key={(fullPath + nr.path) as string}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isSidebarOpen ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    component={Link}
                    to={`${fullPath}${nr.path}` as string}
                    onClick={sidebarActions.close}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: 'center',
                      }}
                    >
                      {nr.icon ? <nr.icon /> : <DefaultIcon />}
                    </ListItemIcon>
                    <ListItemText primary={nr.title} />
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
  console.log('filtered routes are: ', filteredRoutes, ' title is: ', title);
  const drawer = (
    <div style={{ position: 'relative', height: '100%' }}>
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {filteredRoutes.map((route) => renderSidebar({ [route.path as string]: route }))}
      </List>
      <ListItem
        component={Link}
        to="/"
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
        }}
        onClick={() => removeAuthToken()}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
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
