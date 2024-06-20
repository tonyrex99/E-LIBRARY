import React, { useState, useRef, useEffect } from 'react';
import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import { FlexBox } from '@/components/styled';
import { title } from '@/config';
import useHotKeysDialog from '@/store/hotkeys';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';
import { useQuery } from '@tanstack/react-query';
import { HotKeysButton } from './styled';
import { getusersData } from '@/services/users/queries';

function Header() {
  const [, sidebarActions] = useSidebar();
  const [theme, themeActions] = useTheme();
  const [, notificationsActions] = useNotifications();
  const [, hotKeysDialogActions] = useHotKeysDialog();

  const { data } = useQuery({
    queryFn: getusersData,
    queryKey: ['ME'],
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const personIconButtonRef = useRef<HTMLButtonElement>(null);

  function showNotification() {
    notificationsActions.push({
      options: {
        variant: 'customNotification',
      },
      message: 'Welcome to Library Management System',
    });
  }

  function handleTooltipToggle() {
    setTooltipOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        personIconButtonRef.current &&
        !personIconButtonRef.current.contains(event.target as Node)
      ) {
        setTooltipOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [personIconButtonRef]);

  return (
    <Box sx={{ flexGrow: 1 }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="info"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="info">
              {data?.data?.department || 'COE'} {title}
            </Button>
          </FlexBox>
          <FlexBox>
            <FlexBox>
              <Tooltip title="Search..." arrow>
                <HotKeysButton
                  size="small"
                  variant="outlined"
                  aria-label="open hotkeys dialog"
                  onClick={hotKeysDialogActions.open}
                >
                  <div className="md:mr-4">Search</div>
                  <div className="md:block hidden">ALT + K</div>
                </HotKeysButton>
              </Tooltip>
            </FlexBox>
            <Divider orientation="vertical" flexItem />
            <Tooltip
              title={data?.data?.matricNumber}
              arrow
              open={tooltipOpen}
              onClose={() => setTooltipOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <IconButton
                ref={personIconButtonRef as never}
                color="info"
                size="large"
                component="a"
                onClick={handleTooltipToggle}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Switch theme" arrow>
              <IconButton
                color="info"
                edge="end"
                size="large"
                onClick={themeActions.toggle}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
