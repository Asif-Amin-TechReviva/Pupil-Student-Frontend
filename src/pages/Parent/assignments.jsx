import React, { useState, useEffect } from 'react';
import { Chip, IconButton, InputAdornment, Paper, ToggleButton, ToggleButtonGroup, Tooltip, useMediaQuery } from '@mui/material';
import { FetchAllAssignments, FetchAssignmentDetails } from 'api/assignments';
import { toast } from 'react-toastify';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Divider,
  TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QuichLinks from 'components/QuickLinks';
import SwitchButton from 'components/SwitchButton';
import TablePagination from 'components/third-party/react-table/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import LogoImageLoader from 'components/PupilLoader';
import { Stack } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Close } from '@mui/icons-material';
import AssignmentDialog from './assignmentDialog';

const subjectColors = {
  Rhymes: '#FF9A5A',
  Science: '#4B8B68',
  History: '#2E5A84',
  Islamiyat: '#C89200',
  Hindi: '#3B3B3B',
  English: '#3E63AF',
  Mathematics: '#714AC6',
  Urdu: '#337367',
  SocialScience: '#E18E1E',
  Arabic: '#E18E1F'
};
const Assignments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // State
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [searchText, setSearchText] = useState('');
  const [persistedSearchText, setPersistedSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const switchNames = 'fromAssignments';

  // Fetch assignments
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const status = activeTab === 'ongoing' ? 'ongoing' : 'completed';
      const response = await FetchAllAssignments(pageIndex + 1, pageSize, debouncedSearchText.trim(), 'asc', status);
      let fetchedAssignments = response?.data?.data || [];
      // if (searchText.trim()) {
      //   fetchedAssignments = fetchedAssignments.filter((assignment) => {
      //     const lowerSearch = searchText.toLowerCase();
      //     return assignment.title.toLowerCase().includes(lowerSearch) || assignment.subject.name.toLowerCase().includes(lowerSearch);
      //   });
      // }
      if (debouncedSearchText.trim()) {
        fetchedAssignments = fetchedAssignments.filter((assignment) => {
          const lowerSearch = debouncedSearchText.toLowerCase();
          return assignment.title.toLowerCase().includes(lowerSearch) || assignment.subject.name.toLowerCase().includes(lowerSearch);
        });
      }

      setAssignments(fetchedAssignments);
      setTotalPageCount(response?.data?.meta?.pageCount || 0);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // Fetch assignment details
  const handleOpenModal = async (assignmentId, assignmentData) => {
    try {
      setModalLoading(true);
      setOpenModal(true);
      const response = await FetchAssignmentDetails(assignmentId);
      setSelectedAssignment({
        ...response,
        ...assignmentData
      });
    } catch (error) {
      console.error('Failed to fetch assignment details:', error);
      toast.error('Failed to load assignment details.');
      setOpenModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAssignment(null);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 400); // debounce delay in ms

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    fetchAssignments();
  }, [activeTab, pageIndex, pageSize, debouncedSearchText]);

  // Download attachment
  // const handleDownload = (url, title) => {
  //   if (url) {
  //     fetch(url)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch the attachment');
  //         }
  //         return response.blob();
  //       })
  //       .then((blob) => {
  //         const downloadUrl = window.URL.createObjectURL(blob);
  //         const link = document.createElement('a');
  //         link.href = downloadUrl;
  //         link.download = title || 'attachment';
  //         link.click();
  //         window.URL.revokeObjectURL(downloadUrl);
  //       })
  //       .catch((error) => {
  //         console.error('Download failed:', error);
  //         toast.error('Failed to download attachment.');
  //       });
  //   } else {
  //     toast.error('No attachment available.');
  //   }
  // };
  // Single file download

  const handleDownload = async (url, title) => {
    if (!url) {
      toast.error('No attachment available.');
      return;
    }

    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch file');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = title || url.split('/').pop(); // 👈 forces "Save as..."
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download attachment.');
    }
  };

  // const handleBulkDownload = (urls, titlePrefix) => {
  //   if (!urls) {
  //     toast.error('No attachments available.');
  //     return;
  //   }

  //   urls.split(',').forEach((url, i) => {
  //     const fileName = url.split('/').pop();
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${titlePrefix || 'Attachment'}-${i + 1}-${fileName}`;
  //     link.target = '_blank';
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };

  // Multiple files download

  const handleBulkDownload = async (urls, titlePrefix) => {
    if (!urls) {
      toast.error('No attachments available.');
      return;
    }

    const urlList = urls.split(',');
    for (let i = 0; i < urlList.length; i++) {
      try {
        const url = urlList[i].trim();
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error('Failed to fetch file');

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${titlePrefix || 'Attachment'}-${i + 1}-${url.split('/').pop()}`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error(`Download ${i + 1} failed:`, error);
        toast.error(`Failed to download file ${i + 1}`);
      }
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    setPersistedSearchText(value);
  };
  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LogoImageLoader />
      </Box>
    );
  }
  return (
    <div>
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* Toggle Buttons */}
          <Grid item xs={12} md={6}>
            <ToggleButtonGroup
              value={activeTab}
              exclusive
              onChange={(e, newValue) => {
                if (newValue !== null) {
                  setActiveTab(newValue);
                  setPageIndex(0);
                }
              }}
              size="small"
              sx={{
                backgroundColor: 'background.default',
                borderRadius: 2,
                width: isMobile ? '100%' : 'auto',
                boxShadow: 1,
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  border: 'none',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }
                }
              }}
            >
              <ToggleButton value="ongoing" sx={{ width: isMobile ? '50%' : 'auto' }}>
                <PendingActionsIcon fontSize="small" sx={{ mr: 1 }} />
                Ongoing
              </ToggleButton>
              <ToggleButton value="completed" sx={{ width: isMobile ? '50%' : 'auto' }}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                Completed
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* Search and Create Button */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
              <Grid item xs={12} sm="auto">
                <TextField
                  variant="outlined"
                  size="small"
                  autoFocus
                  value={persistedSearchText}
                  onChange={handleSearchChange}
                  placeholder="Search assignments..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      backgroundColor: 'background.default',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }
                  }}
                  sx={{
                    minWidth: { xs: '100%', sm: 250 },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm="auto"></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {assignments.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {assignments.map((assignment) => {
              const subjectColor = subjectColors[assignment.subject.name];

              return (
                <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 3,
                      position: 'relative'
                    }}
                  >
                    {/* Subject Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        px: 2,
                        py: 0.5,
                        backgroundColor: subjectColor,
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        color: '#fff'
                      }}
                    >
                      {assignment.subject.name}
                    </Box>

                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      {/* Title */}
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ mb: 1, overflowWrap: 'break-word', wordBreak: 'break-word' }}
                      >
                        {truncateText(assignment.title, 40)}
                      </Typography>

                      {/* Assigned by */}
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                        Assigned by: {`${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`}
                      </Typography>

                      {/* Assigned On */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Assigned On: {new Date(assignment.addedBy.createdAt).toLocaleDateString()}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '0.95rem',
                          textAlign: 'justify',
                          mb: 2,
                          minHeight: '50px'
                        }}
                      >
                        {truncateText(assignment.description, 95)}
                      </Typography>

                      {/* Due Date */}
                      <Typography
                        variant="body2"
                        color={new Date(assignment.dueDate) < new Date() ? 'error.main' : 'text.secondary'}
                        sx={{ fontWeight: 500 }}
                      >
                        Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Typography>
                    </CardContent>

                    {/* Buttons */}
                    <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end" flexWrap="wrap">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => handleDownload(assignment.attachmentUrl, assignment.title)}
                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                      >
                        Download
                      </Button>

                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() =>
                          handleOpenModal(assignment.id, {
                            addedBy: `${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`
                          })
                        }
                        sx={{ textTransform: 'none' }}
                      >
                        View More
                      </Button>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {assignments.length > 10 && (
            <Box mt={3}>
              <TablePagination
                getPageCount={() => Math.ceil(totalPageCount)}
                setPageIndex={setPageIndex}
                setPageSize={(newSize) => {
                  setPageSize(newSize);
                }}
                getState={() => ({ pagination: { pageIndex, pageSize } })}
                initialPageSize={pageSize}
                labelRowsPerPage="Assignments Per Page"
              />
            </Box>
          )}
        </>
      ) : (
        <Box>
          <Typography textAlign="center" mt={3}>
            No assignments found.
          </Typography>
          {assignments.length > 10 && (
            <Box mt={3}>
              <TablePagination
                getPageCount={() => Math.ceil(totalPageCount)}
                setPageIndex={setPageIndex}
                setPageSize={(newSize) => {
                  setPageSize(newSize);
                }}
                getState={() => ({ pagination: { pageIndex, pageSize } })}
                initialPageSize={pageSize}
                labelRowsPerPage="Assignments Per Page"
              />
            </Box>
          )}
        </Box>
      )}

      <AssignmentDialog
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        modalLoading={modalLoading}
        selectedAssignment={selectedAssignment}
        handleDownload={handleDownload}
        handleBulkDownload={handleBulkDownload}
      />
    </div>
  );
};

export default Assignments;
