import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Assessment,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  FileUpload as FileUploadIcon,
  Edit as EditIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { getResumes, deleteResume, processResume } from '../../store/slices/resumeSlice';
import LoadingScreen from '../../components/common/LoadingScreen';

const Resumes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { resumes, loading } = useSelector((state) => state.resume);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  
  // Fetch resumes on component mount
  useEffect(() => {
    dispatch(getResumes());
  }, [dispatch]);
  
  // Menu handlers
  const handleMenuOpen = (event, resume) => {
    setAnchorEl(event.currentTarget);
    setSelectedResume(resume);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedResume(null);
  };
  
  const handleDeleteResume = () => {
    if (selectedResume) {
      dispatch(deleteResume(selectedResume.id));
    }
    handleMenuClose();
  };
  
  const handleProcessResume = () => {
    if (selectedResume) {
      dispatch(processResume(selectedResume.id));
    }
    handleMenuClose();
  };
  
  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'analyzed':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };
  
  if (loading && !resumes.length) {
    return <LoadingScreen message="Loading resumes..." />;
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            My Resumes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/resumes/upload"
          >
            Upload Resume
          </Button>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your resumes and view analysis to optimize your job search.
        </Typography>
      </Box>
      
      {loading && (
        <Box sx={{ width: '100%', mb: 4 }}>
          <LinearProgress />
        </Box>
      )}
      
      {resumes.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <DescriptionIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Resumes Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You haven't uploaded any resumes yet. Upload your resume to get started.
          </Typography>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            component={RouterLink}
            to="/resumes/upload"
            sx={{ mt: 2 }}
          >
            Upload Your First Resume
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {resumes.map((resume) => (
            <Grid item xs={12} sm={6} md={4} key={resume.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="h6" component="div" gutterBottom>
                      {resume.title}
                    </Typography>
                    <IconButton
                      aria-label="resume menu"
                      onClick={(e) => handleMenuOpen(e, resume)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Chip
                    label={resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                    color={getStatusColor(resume.status)}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    File Type: {resume.file_type.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Uploaded: {new Date(resume.created_at).toLocaleDateString()}
                  </Typography>
                  {resume.status === 'analyzed' && resume.analysis && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Overall Score:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={resume.analysis.overall_score * 100}
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(resume.analysis.overall_score * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/resumes/${resume.id}`}
                  >
                    View
                  </Button>
                  {resume.status === 'analyzed' && (
                    <Button
                      size="small"
                      startIcon={<Assessment />}
                      component={RouterLink}
                      to={`/resumes/${resume.id}/analysis`}
                    >
                      Analysis
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Resume menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={RouterLink}
          to={selectedResume ? `/resumes/${selectedResume.id}` : '#'}
        >
          <DescriptionIcon sx={{ mr: 1 }} /> View Resume
        </MenuItem>
        {selectedResume && selectedResume.status === 'analyzed' && (
          <MenuItem
            component={RouterLink}
            to={`/resumes/${selectedResume.id}/analysis`}
          >
            <Assessment sx={{ mr: 1 }} /> View Analysis
          </MenuItem>
        )}
        {selectedResume && selectedResume.status === 'pending' && (
          <MenuItem onClick={handleProcessResume}>
            <Assessment sx={{ mr: 1 }} /> Process Resume
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleDeleteResume} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete Resume
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Resumes;