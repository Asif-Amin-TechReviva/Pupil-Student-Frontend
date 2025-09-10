import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Stack,
  Grid,
  Button
} from '@mui/material';
import dayjs from 'dayjs';
import { getExamResultDetails } from 'api/exams';
import LogoImageLoader from 'components/PupilLoader';
import { useLocation, useNavigate } from 'react-router';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ComputerIcon from '@mui/icons-material/Computer';
import { ArrowBack } from '@mui/icons-material';

const subjectIcons = {
  Mathematics: <SchoolIcon fontSize="small" />,
  Science: <ScienceIcon fontSize="small" />,
  English: <MenuBookIcon fontSize="small" />,
  'Information Technology': <ComputerIcon fontSize="small" />
};

const getColorAndRemark = (percentage) => {
  if (percentage >= 75) return { color: '#00897B', remark: 'Very good improvement' };
  if (percentage >= 60) return { color: '#F9A825', remark: 'Average' };
  return { color: '#E53935', remark: 'Needs Improvement' };
};

const ExamResultTable = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const examId = state?.examId;
  const examName = state?.examName;
  const navigate = useNavigate();
  useEffect(() => {
    if (!examId) return;
    const fetchResults = async () => {
      try {
        const res = await getExamResultDetails(examId);
        const rows = res.map((item) => {
          const { date } = item.examinationDetail || {};
          const teacherName = `${item.recordedBy?.firstName || ''} ${item.recordedBy?.lastName || ''}`;
          const subject = item.subject?.name || '';
          const obtained = item.obtainedMarks;
          const max = item.examinationDetail?.maximumMarks || 100;
          const percentage = ((obtained / max) * 100).toFixed(0);
          const { color, remark } = getColorAndRemark(percentage);
          return {
            date: date ? dayjs(date).format('DD/MM/YYYY') : '',
            teacher: teacherName,
            subject,
            percentage,
            color,
            remark
          };
        });
        setResults(rows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [examId]);

  if (loading) {
    return (
      <Box sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LogoImageLoader />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2, px: 1 }}>
        <Box>
          {isMobile ? (
            <Button onClick={() => navigate('/academics/exams')} sx={{ minWidth: 0, p: 1 }}>
              <ArrowBack fontSize="small" />
            </Button>
          ) : (
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/academics/exams')} sx={{ textTransform: 'none' }}>
              Back to Exams List
            </Button>
          )}
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            flexGrow: 1,
            ml: isMobile ? 0 : -6
          }}
        >
          {examName ? `Results for ${examName}` : 'Results'}
        </Typography>
        {!isMobile && <Box sx={{ width: 160 }} />}
      </Box>

      {isMobile ? (
        <Grid container spacing={2} gap={0}>
          {results.map((row, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
                <CardContent>
                  {/* Subject header with icon */}
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    {subjectIcons[row.subject] || <SchoolIcon fontSize="small" />}
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                      {row.subject}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Typography variant="h6" fontWeight="600">
                    {row.subject} Test
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight="500" mb={1}>
                    {row.teacher}
                  </Typography>

                  {/* Score */}
                  <Typography variant="h5" fontWeight="bold" color={row.color}>
                    {row.percentage}%
                  </Typography>

                  {/* Remark */}
                  <Typography variant="body2" fontWeight="bold" mt={1}>
                    {row.remark}
                  </Typography>

                  {/* Date */}
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <CalendarMonthIcon fontSize="small" color="disabled" />
                    <Typography variant="body2" color="text.secondary">
                      Date: {row.date}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ width: '15%', textAlign: 'left' }}>
                  <strong>Date</strong>
                </TableCell>
                <TableCell sx={{ width: '25%', textAlign: 'center' }}>
                  <strong>Teacher</strong>
                </TableCell>
                <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                  <strong>Subject</strong>
                </TableCell>
                <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                  <strong>Marks</strong>
                </TableCell>
                <TableCell sx={{ width: '25%', textAlign: 'center' }}>
                  <strong>Remarks</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ textAlign: 'left' }}> {row.date}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 500 }}>{row.teacher}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.subject}</TableCell>
                  <TableCell sx={{ color: row.color, fontWeight: 600, textAlign: 'center' }}>{row.percentage}%</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>{row.remark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ExamResultTable;
