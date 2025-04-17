import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
} from '@mui/material';
import {
  Description,
  Work,
  Search,
  Assessment,
  BusinessCenter,
  Timeline,
} from '@mui/icons-material';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            AI-Powered Resume Analysis
          </Typography>
          <Typography variant="h5" component="div" paragraph>
            Get intelligent feedback on your resume and find the perfect job match
            with our advanced AI technology.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            mt={4}
          >
            {isAuthenticated ? (
              user?.role === 'job_seeker' ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/resumes/upload"
                  startIcon={<Description />}
                >
                  Upload Your Resume
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/jobs/create"
                  startIcon={<Work />}
                >
                  Post a Job
                </Button>
              )
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/register"
                >
                  Sign Up Now
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/login"
                >
                  Log In
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Key Features
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Assessment sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Resume Analysis
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our AI analyzes your resume to provide detailed feedback on formatting,
                  content, and skills. Get suggestions to improve your resume's effectiveness.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Search sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Job Matching
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Find the perfect job match with our intelligent job matching system.
                  We analyze your skills and experience to suggest the best job opportunities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <BusinessCenter sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Recruiter Tools
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  For recruiters, we offer powerful tools to find the best candidates.
                  Filter by skills, experience, and location to identify top talent efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            How It Works
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h3" gutterBottom>
                For Job Seekers
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 1: Upload Your Resume
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Upload your resume in PDF or DOCX format.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 2: Get AI Feedback
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Receive detailed analysis and suggestions to improve your resume.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Timeline sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 3: Apply for Matching Jobs
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Browse and apply to jobs that match your skills and experience.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h3" gutterBottom>
                For Recruiters
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 1: Post Job Listings
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create detailed job listings with skills and requirements.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 2: AI Matches Candidates
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Our system finds the best candidates based on your job requirements.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Timeline sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6" component="div">
                    Step 3: Review & Contact
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Review matched candidates and contact the best fits for your position.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to={isAuthenticated ? (user?.role === 'job_seeker' ? '/resumes/upload' : '/jobs/create') : '/register'}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;