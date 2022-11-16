import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { useAppSelector, RootState, useAppDispatch } from 'store/store';
import { Button } from '@mui/material';
import { logout } from 'store/auth/auth-slice';

const settings = [
  { name: 'Sign In', link: 'sign-in' },
  { name: 'Sign Up', link: 'sign-up' },
];

function Header() {
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AssessmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PROJECT MANAGMENT APP
          </Typography>

          <AssessmentIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PROJECT MANAGMENT APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userId ? (
                <Button onClick={() => dispatch(logout())}>Log out</Button>
              ) : (
                settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link to={setting.link}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
          <ToggleButtonGroup
            color="secondary"
            size="small"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{
              marginLeft: '15px',
            }}
          >
            <ToggleButton value="EN">EN</ToggleButton>
            <ToggleButton value="RU">RU</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
