import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard,
  Description,
  Work,
  Person,
  Business,
  Add,
  Assignment,
  Search,
  SupervisedUserCircle,
  Settings,
} from '@mui/icons-material';

// Drawer width
const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state) => state.auth);

  // Determine if a link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Menu items based on user role
  const getMenuItems = () => {
    const commonMenuItems = [
      {
        text: 'Profile',
        icon: <Person />,
        path: '/profile',
      },
    ];
    
    // Job seeker specific menu items
    if (user?.role === 'job_seeker') {
      return [
        {
          text: 'Dashboard',
          icon: <Dashboard />,
          path: '/dashboard',
        },
        {
          text: 'My Resumes',
          icon: <Description />,
          path: '/resumes',
        },
        {
          text: 'Upload Resume',
          icon: <Add />,
          path: '/resumes/upload',
        },
        {
          text: 'Job Listings',
          icon: <Work />,
          path: '/jobs',
        },
        {
          text: 'My Applications',
          icon: <Assignment />,
          path: '/applications',
        },
        ...commonMenuItems,
      ];
    }
    
    // Recruiter specific menu items
    else if (user?.role === 'recruiter') {
      return [
        {
          text: 'Recruiter Dashboard',
          icon: <Dashboard />,
          path: '/recruiter/dashboard',
        },
        {
          text: 'Post a Job',
          icon: <Add />,
          path: '/jobs/create',
        },
        {
          text: 'My Job Listings',
          icon: <Work />,
          path: '/jobs?posted_by_me=true',
        },
        {
          text: 'Browse Resumes',
          icon: <Search />,
          path: '/resumes',
        },
        {
          text: 'My Company',
          icon: <Business />,
          path: '/company',
        },
        ...commonMenuItems,
      ];
    }
    
    // Admin specific menu items
    else if (user?.role === 'admin') {
      return [
        {
          text: 'Admin Dashboard',
          icon: <Dashboard />,
          path: '/admin/dashboard',
        },
        {
          text: 'Manage Users',
          icon: <SupervisedUserCircle />,
          path: '/admin/users',
        },
        {
          text: 'Manage Jobs',
          icon: <Work />,
          path: '/admin/jobs',
        },
        {
          text: 'Manage Resumes',
          icon: <Description />,
          path: '/admin/resumes',
        },
        {
          text: 'System Settings',
          icon: <Settings />,
          path: '/admin/settings',
        },
        ...commonMenuItems,
      ];
    }
    
    return commonMenuItems;
  };

  const menuItems = getMenuItems();

  // Drawer content
  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, pl: 1 }}>
          Menu
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={isActive(item.path)}
            onClick={isMobile ? onClose : undefined}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;