import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery, TextField, InputAdornment } from '@mui/material';
import { Calendar } from 'lucide-react';
import { getExaminations } from 'api/exams';
import dayjs from 'dayjs';
import LogoImageLoader from 'components/PupilLoader';
import { useNavigate } from 'react-router-dom';
import { TablePagination } from 'components/third-party/react-table';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import SingleInputDateRangePicker from 'components/SingleInputDateRangePicker';
import SearchBar from 'components/SearchBar';

const ExamsView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data, pageCount } = await getExaminations({
        page: pageIndex + 1,
        take: pageSize,
        sortOrder: 'asc',
        startDate: dateRange[0] ? dayjs(dateRange[0]).format('YYYY-MM-DD') : undefined,
        endDate: dateRange[1] ? dayjs(dateRange[1]).format('YYYY-MM-DD') : undefined,
        searchQuery: searchQuery || undefined
      });

      const extracted = data.map((exam) => ({
        id: exam.id,
        name: exam.name,
        date: exam.examDetail?.[0]?.date || null
      }));

      setExams(extracted);
      setTotalRows(pageCount * pageSize);
    } catch (err) {
      console.error('Failed to fetch exams:', err);
    } finally {
      setLoading(false);
    }
  }, [pageIndex, pageSize, dateRange, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = debounce((value) => {
    setSearchQuery(value);
    setPageIndex(0);
  }, 500);

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LogoImageLoader />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        p: isMobile ? 2 : 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid',
        borderColor: 'divider',
        mt: 2
      }}
    >
      {/* Filters */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 2 }}>
        <Box sx={{ width: 'auto', minWidth: '70%' }}>
          <SearchBar
            value={searchQuery}
            onDebouncedChange={(value) => {
              setSearchQuery(value);
              setPageIndex(0);
            }}
            placeholder="Search exams…"
            sx={{ height: 50, flexGrow: 1, minWidth: isMobile ? 'auto' : 250 }}
          />
        </Box>
        <Box sx={{ minWidth: '30%' }}>
          <SingleInputDateRangePicker
            value={{
              startDate: dateRange[0] ? dayjs(dateRange[0]).format('MM/DD/YYYY') : '',
              endDate: dateRange[1] ? dayjs(dateRange[1]).format('MM/DD/YYYY') : ''
            }}
            onDateChange={({ startDate, endDate }) => {
              setPageIndex(0);
              setDateRange([
                startDate && dayjs(startDate, 'MM/DD/YYYY').isValid() ? dayjs(startDate, 'MM/DD/YYYY').toDate() : null,
                endDate && dayjs(endDate, 'MM/DD/YYYY').isValid() ? dayjs(endDate, 'MM/DD/YYYY').toDate() : null
              ]);
            }}
          />
        </Box>
      </Box>

      {/* Mobile View */}
      {isMobile ? (
        <Box>
          {exams.map((item) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                p: 2,
                mb: 2,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {item.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Calendar size={16} />
                <Typography variant="body2" color="text.secondary">
                  {item.date ? dayjs(item.date).format('DD/MM/YYYY') : 'N/A'}
                </Typography>
              </Box>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={() => navigate('/academics/results', { state: { examId: item.id } })}
              >
                View Results
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        // Desktop View
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f9fafb',
              borderRadius: '8px 8px 0 0',
              px: 2,
              py: 1.5,
              fontWeight: 600,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ width: 4 }} />
            <Typography sx={{ flex: 1, fontWeight: 'bold' }}>Exam Name</Typography>
            <Typography sx={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Date</Typography>
            <Typography sx={{ flex: 1, fontWeight: 'bold', textAlign: 'right' }}>Actions</Typography>
          </Box>

          {exams.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderBottom: '1px solid',
                borderColor: 'divider',
                px: 2,
                py: 2,
                '&:last-of-type': {
                  borderBottom: 'none',
                  borderRadius: '0 0 8px 8px'
                }
              }}
            >
              <Box sx={{ width: 4, height: '100%', bgcolor: '#1976d2' }} />
              <Typography sx={{ flex: 1 }}>{item.name}</Typography>
              <Typography sx={{ flex: 1, textAlign: 'center' }}>{item.date ? dayjs(item.date).format('DD/MM/YYYY') : 'N/A'}</Typography>
              <Box sx={{ flex: 1, textAlign: 'right' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate('/academics/results', { state: { examId: item.id, examName: item.name } })}
                >
                  View Results
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Pagination */}
      <Box sx={{ mt: 3 }}>
        <TablePagination
          getPageCount={() => Math.ceil(totalRows / pageSize)}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          getState={() => ({
            pagination: { pageIndex, pageSize }
          })}
          initialPageSize={pageSize}
        />
      </Box>
    </Box>
  );
};

export default ExamsView;
