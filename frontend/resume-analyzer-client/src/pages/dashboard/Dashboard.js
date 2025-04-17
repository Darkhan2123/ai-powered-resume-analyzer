import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Description,
  Work,
  Assessment,
  Assignment,
} from '@mui/icons-material';
import { getResumes } from '../../store/slices/resumeSlice';
import { getJobs, getUserApplications } from '../../store/slices/jobSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { resumes, loading: resumeLoading } = useSelector((state) => state.resume);
  const { jobs, applications, loading: jobLoading } = useSelector((state) => state.job);
  
  // Fetch data on component mount
  useEffect(() => {
    dispatch(getResumes());
    dispatch(getJobs());
    dispatch(getUserApplications());
  }, [dispatch]);
  
  // Calculate dashboard stats
  const totalResumes = resumes?.length || 0;
  const analyzedResumes = resumes?.filter(resume => resume.status === 'analyzed').length || 0;
  const totalApplications = applications?.length || 0;
  const activeJobs = jobs?.filter(job => job.status === 'active').length || 0;
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.email}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Here's an overview of your activity and suggestions to improve your job search.
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Your Resumes
              </Typography>
              <Typography variant="h3" component="div">
                {totalResumes}
              </Typography>
              <Typography variant="body2">
                {analyzedResumes} analyzed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Applications
              </Typography>
              <Typography variant="h3" component="div">
                {totalApplications}
              </Typography>
              <Typography variant="body2">
                submitted jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Jobs
              </Typography>
              <Typography variant="h3" component="div">
                {activeJobs}
              </Typography>
              <Typography variant="body2">
                matching your profile
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Resume Score
              </Typography>
              <Typography variant="h3" component="div">
                {resumes?.[0]?.analysis?.overall_score 
                  ? `${Math.round(resumes[0].analysis.overall_score * 100)}%` 
                  : 'N/A'}
              </Typography>
              <Typography variant="body2">
                average rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Action Cards */}
      <Typography variant="h5" component="h2" gutterBottom>
        Quick Actions
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Description sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h6">Resume Management</Typography>
            </Box>
            <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
              Upload a new resume or update your existing ones to improve your chances of finding the perfect job.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/resumes/upload"
              fullWidth
            >
              Upload Resume
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h6">Job Search</Typography>
            </Box>
            <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
              Browse available jobs that match your skills and experience. Filter by location, salary, and more.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/jobs"
              fullWidth
            >
              Browse Jobs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assignment sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Typography variant="h6">Applications</Typography>
            </Box>
            <Typography variant="body2" paragraph sx={{ flexGrow: 1 }}>
              Track your job applications and check their status. Stay organized in your job search.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/applications"
              fullWidth
            >
              View Applications
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recent Activity
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Paper sx={{ p: 3 }}>
          {applications && applications.length > 0 ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Recent Applications
              </Typography>
              {applications.slice(0, 3).map((application) => (
                <Box key={application.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {application.job.title} at {application.job.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applied on: {new Date(application.applied_at).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
              {applications.length > 3 && (
                <Button
                  variant="text"
                  component={RouterLink}
                  to="/applications"
                  sx={{ mt: 1 }}
                >
                  View all applications
                </Button>
              )}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ py: 2 }}>
              You haven't applied to any jobs yet. Start browsing jobs to find your next opportunity!
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;