import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Work,
  Description,
  Dashboard,
  Person,
  Logout,
} from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Description sx={{ mr: 1 }} />
          Resume Analyzer
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/dashboard"
                  startIcon={<Dashboard />}
                  sx={{ mx: 1 }}
                >
                  Dashboard
                </Button>
                
                {user?.role === 'job_seeker' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/resumes"
                      startIcon={<Description />}
                      sx={{ mx: 1 }}
                    >
                      Resumes
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/jobs"
                      startIcon={<Work />}
                      sx={{ mx: 1 }}
                    >
                      Jobs
                    </Button>
                  </>
                )}
                
                {user?.role === 'recruiter' && (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/jobs/create"
                    startIcon={<Work />}
                    sx={{ mx: 1 }}
                  >
                    Post Job
                  </Button>
                )}
              </>
            )}
            
            <Tooltip title="Account settings">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.email?.charAt(0).toUpperCase() || <AccountCircle />}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleNavigate('/profile')}>
                <Person sx={{ mr: 1 }} /> Profile
              </MenuItem>
              
              {isMobile && (
                <>
                  <MenuItem onClick={() => handleNavigate('/dashboard')}>
                    <Dashboard sx={{ mr: 1 }} /> Dashboard
                  </MenuItem>
                  
                  {user?.role === 'job_seeker' && (
                    <>
                      <MenuItem onClick={() => handleNavigate('/resumes')}>
                        <Description sx={{ mr: 1 }} /> Resumes
                      </MenuItem>
                      <MenuItem onClick={() => handleNavigate('/jobs')}>
                        <Work sx={{ mr: 1 }} /> Jobs
                      </MenuItem>
                    </>
                  )}
                  
                  {user?.role === 'recruiter' && (
                    <MenuItem onClick={() => handleNavigate('/jobs/create')}>
                      <Work sx={{ mr: 1 }} /> Post Job
                    </MenuItem>
                  )}
                </>
              )}
              
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/login"
              sx={{ mx: 1 }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/register"
              sx={{ mx: 1 }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;