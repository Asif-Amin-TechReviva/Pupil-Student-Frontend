// ComingSoon.js or ComingSoon.tsx

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router';
const ComingSoon = () => {
    const navigate= useNavigate()
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2
      }}
    >
      <AccessTimeIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
      <Typography variant="h4" fontWeight={600} gutterBottom color="primary">
        Online Payments
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
        This feature is coming soon! We're working hard to bring you secure and convenient online payment options.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Back To Home
      </Button>
    </Box>
  );
};

export default ComingSoon;
