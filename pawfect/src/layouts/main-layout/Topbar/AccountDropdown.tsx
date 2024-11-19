import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import IconifyIcon from '../../../components/base/IconifyIcon';
import { MouseEvent, ReactElement, useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const AccountDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/authentication/login');
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <>
      <Button
        color="inherit"
        id="account-dropdown-button"
        aria-controls={open ? 'account-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          gap: 1.875,
          px: { xs: 0, sm: 0.625 },
          py: 0.625,
        }}
      >
        <Typography
          variant="body1"
          component="p"
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        >
          
        </Typography>
        <IconifyIcon
          icon="ion:caret-down-outline"
          width={24}
          height={24}
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        />
      </Button>
      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-dropdown-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="ion:home-sharp" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Home
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="mdi:account-outline" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Profile
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:settings" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Settings
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          disableRipple
          disableTouchRipple
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ri:logout-circle-line" color="error.main" />
          </ListItemIcon>
          <ListItem button component="a" onClick={handleLogout}>
            <ListItemText 
              sx={(theme) => ({
                '& .MuiListItemText-primary': {
                  fontSize: theme.typography.body1.fontSize,
                  fontFamily: theme.typography.body1.fontFamily,
                  fontWeight: theme.typography.body1.fontWeight,
                },
              })}
            >

              Logout
            </ListItemText>
          </ListItem>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
