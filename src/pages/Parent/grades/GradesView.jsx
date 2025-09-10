import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ComputerIcon from '@mui/icons-material/Computer';

const subjectIcons = {
  Mathematics: <SchoolIcon fontSize="small" />,
  Science: <ScienceIcon fontSize="small" />,
  English: <MenuBookIcon fontSize="small" />,
  'Information Technology': <ComputerIcon fontSize="small" />,
};

const grades = [
  {
    subject: 'Mathematics',
    score: 80,
    remark: 'Very good improvement',
    color: '#00897B',
    date: '11/09/2024',
  },
  {
    subject: 'Science',
    score: 65,
    remark: 'Average',
    color: '#F9A825',
    date: '11/09/2024',
  },
  {
    subject: 'English',
    score: 40,
    remark: 'There is still room for improvement',
    color: '#E53935',
    date: '11/09/2024',
  },
  {
    subject: 'Information Technology',
    score: 80,
    remark: 'Very good improvement',
    color: '#00897B',
    date: '11/09/2024',
  },
  {
    subject: 'Science',
    score: 80,
    remark: 'Very good improvement',
    color: '#00897B',
    date: '11/09/2024',
  },
  {
    subject: 'English',
    score: 80,
    remark: 'Very good improvement',
    color: '#00897B',
    date: '11/09/2024',
  },
];

const GradesView = () => {
  return (
    <Grid container spacing={2} p={2}>
      {grades.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              {/* Subject header with icon */}
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {subjectIcons[item.subject] || <SchoolIcon fontSize="small" />}
                <Typography variant="body2" color="text.secondary" fontWeight="500">
                  {item.subject}
                </Typography>
              </Box>

              {/* Title */}
              <Typography variant="h6" fontWeight="600">
                Division and Subtractions Test
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500" mb={1}>
                Yasir Sir
              </Typography>

              {/* Score */}
              <Typography variant="h5" fontWeight="bold" color={item.color}>
                {item.score}%
              </Typography>

              {/* Remark */}
              <Typography variant="body2" fontWeight="bold" mt={1}>
                {item.remark}
              </Typography>

              {/* Date */}
              <Box display="flex" alignItems="center" gap={1} mt={2}>
                <CalendarMonthIcon fontSize="small" color="disabled" />
                <Typography variant="body2" color="text.secondary">
                  Date: {item.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GradesView;
