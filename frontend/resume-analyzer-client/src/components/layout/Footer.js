import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {currentYear} Resume Analyzer. All rights reserved.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              mt: { xs: 2, sm: 0 },
              alignItems: 'center',
            }}
          >
            <Link href="#" color="inherit" sx={{ mx: 1, my: { xs: 0.5, sm: 0 } }}>
              Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1, my: { xs: 0.5, sm: 0 } }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1, my: { xs: 0.5, sm: 0 } }}>
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;