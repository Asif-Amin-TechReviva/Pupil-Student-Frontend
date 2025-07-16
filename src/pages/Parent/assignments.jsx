import React, { useState, useEffect } from 'react';
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
const subjectColors = {
  Rhymes: '#FF9A5A',
  Science: '#4B8B68',
  History: '#2E5A84',
  Islamiyat: '#C89200',
  Hindi: '#3B3B3B',
  English: '#3E63AF',
  Mathematics: '#714AC6',
  Urdu: '#337367',
  SocialScience: '#E18E1E'
};
const Assignments = () => {
  const theme = useTheme();

  // State
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [searchText, setSearchText] = useState('');
  const [persistedSearchText, setPersistedSearchText] = useState('');

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
      const response = await FetchAllAssignments(
        pageIndex + 1,
        pageSize,
        searchText.trim(), // Pass search text (trimmed for clean input)
        'asc',
        status
      );
      let fetchedAssignments = response?.data?.data || [];
      if (searchText.trim()) {
        fetchedAssignments = fetchedAssignments.filter((assignment) => {
          const lowerSearch = searchText.toLowerCase();
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
    fetchAssignments();
  }, [activeTab, pageIndex, pageSize, searchText]);

  // Download attachment
  const handleDownload = (url, title) => {
    if (url) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch the attachment');
          }
          return response.blob();
        })
        .then((blob) => {
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = title || 'attachment';
          link.click();
          window.URL.revokeObjectURL(downloadUrl);
        })
        .catch((error) => {
          console.error('Download failed:', error);
          toast.error('Failed to download attachment.');
        });
    } else {
      toast.error('No attachment available.');
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
      <QuichLinks />
      <SwitchButton activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab)} switchNames={switchNames} />
      <Box mt={1} mb={2} display="flex" justifyContent="right" alignItems="center">
        <TextField
          variant="outlined"
          value={persistedSearchText}
          onChange={handleSearchChange}
          placeholder="Search By Title or Subject"
          sx={{
            width: { xs: '100%', sm: '20%' },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              borderRadius: { xs: '10px', sm: '25px' },
              '&:hover': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // More pronounced shadow on hover
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff', // Highlight on focus
                boxShadow: '0 0 0 2px #1976D2' // Blue outline when focused
              }
            },
            '& .MuiInputLabel-root': {
              color: '#1976D2', // Blue label color
              fontWeight: 'bold' // Bold label for emphasis
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#1565C0' // Darker blue for focused label
            }
          }}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#1976D2',
                  marginLeft: 1
                }}
              >
                <SearchIcon />
              </Box>
            )
          }}
        />
      </Box>

      {assignments.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {assignments.map((assignment) => {
              const subjectColor = subjectColors[assignment.subject.name];

              return (
                <Grid item xs={12} sm={6} md={6} key={assignment.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: subjectColor,
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.8rem', sm: '1rem' }, // Adjust font size for smaller screens
                        maxWidth: '100%' // Prevents overflow
                      }}
                    >
                      {assignment.subject.name}
                    </Box>

                    <CardContent
                      sx={{
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Adjust font size for smaller screens
                          overflowWrap: 'break-word', // Prevents overflow of title on smaller screens
                          wordBreak: 'break-word', // Ensures the title breaks on long words
                          marginTop: { xs: '2rem', sm: '2rem', md: '0' }
                        }}
                      >
                        {truncateText(assignment.title, 20)}
                        {/* {truncateText(assignment.description, 500)} */}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: { xs: '0.875rem', sm: '1rem' } // Adjust font size for smaller screens
                        }}
                      >
                        Assigned by: {`${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' } // Adjust font size for smaller screens
                        }}
                      >
                        Assigned On: {new Date(assignment.addedBy.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: 2,
                          marginBottom: 2,
                          fontSize: '0,8rem',
                          textAlign: 'justify'
                        }}
                      >
                        {truncateText(assignment.description, 500)}
                      </Typography>

                      <Box
                        sx={{
                          marginTop: 'auto',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          flexDirection: { xs: 'column', sm: 'row' }, // Stack buttons on smaller screens
                          gap: { xs: '1rem', sm: '0' } // Space between buttons on small screens
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                          sx={{
                            fontSize: { xs: '0.75rem', sm: '0.875rem' } // Adjust font size for smaller screens
                          }}
                        >
                          Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: { xs: '5rem', sm: '1rem', md: '2rem' }
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownloadIcon />}
                            onClick={() => handleDownload(assignment.attachmentUrl, assignment.title)}
                            sx={{
                              padding: { xs: '.4rem .8rem', sm: '.5rem 1rem', md: '1rem 1.5rem' },
                              fontSize: { xs: '1rem', sm: '0.75rem', md: '0.85rem' },
                              fontWeight: 'bold',
                              backgroundColor: '#1976D2',
                              '&:hover': {
                                backgroundColor: '#1565C0'
                              },
                              minWidth: 'auto' // Prevents a large default width
                            }}
                          >
                            Download
                          </Button>

                          <Button
                            variant="outlined"
                            color="success"
                            sx={{
                              padding: { xs: '.4rem .8rem', sm: '.5rem 1rem', md: '.5rem 1rem' },
                              fontSize: { xs: '1rem', sm: '0.75rem', md: '0.85rem' },
                              borderRadius: 1,
                              textTransform: 'none',
                              minWidth: 'auto' // Prevents a large default width
                            }}
                            onClick={() =>
                              handleOpenModal(assignment.id, {
                                addedBy: `${assignment.addedBy.user.firstName} ${assignment.addedBy.user.lastName}`
                              })
                            }
                          >
                            View More
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
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
        </>
      ) : (
        <Box>
          <Typography textAlign="center" mt={3}>
            No assignments found.
          </Typography>
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
        </Box>
      )}

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems="center"
          sx={{ padding: { xs: '0.5rem 1rem', sm: '1rem' } }}
        >
          <DialogTitle
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.5rem' },
              color: '#1976D2',
              textAlign: { xs: 'left', sm: 'left' },
              flexGrow: 1
            }}
          >
            Assignment Details
          </DialogTitle>
          <Button
            onClick={handleCloseModal}
            color="error"
            variant="outlined"
            sx={{
              marginTop: { xs: '1rem', sm: 0 }, // Add margin on small screens to separate it from the title
              padding: { xs: '0.5rem 1rem', sm: '0.75rem 1.5rem' },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              alignSelf: { xs: 'center', sm: 'flex-end' } // Center button on small screens
            }}
          >
            Close
          </Button>
        </Box>

        <DialogContent
          sx={{
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            overflowY: 'auto', // Allows scrolling when content overflows
            maxHeight: '70vh',
            scrollbarWidth: '4px',
            msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer
            '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar in Webkit-based browsers
          }}
        >
          {modalLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress />
            </Box>
          ) : (
            selectedAssignment && (
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', color: '#333', paddingTop: '15px' }}>
                  {selectedAssignment.title}
                </Typography>
                <Typography variant="body2" paragraph sx={{ lineHeight: 1.6, color: '#222', textAlign: 'justify', fontWeight: 'bold' }}>
                  Assigned by: {selectedAssignment?.addedBy || 'No data available'}
                </Typography>

                <Typography variant="body6" paragraph sx={{ lineHeight: 1.6, color: '#555', textAlign: 'justify' }}>
                  {selectedAssignment.description}
                </Typography>

                <Divider sx={{ my: 3, borderColor: '#1976D2' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <Typography variant="body3" color="text.primary">
                    Created On: {new Date(selectedAssignment.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body3" color="error">
                    Due Date: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>

                {selectedAssignment.attachmentUrl && (
                  <Box mt={3} textAlign="center" mb={3}>
                    <img
                      src={selectedAssignment.attachmentUrl}
                      alt="Attachment"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        borderRadius: 8,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                )}
              </Box>
            )
          )}
        </DialogContent>

        <DialogActions sx={{ padding: '1rem 2rem' }}>
          {selectedAssignment?.attachmentUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={() => handleDownload(selectedAssignment.attachmentUrl, selectedAssignment.title)}
              sx={{
                padding: '0.75rem 1.5rem',
                fontWeight: 'bold',
                backgroundColor: '#1976D2',
                '&:hover': {
                  backgroundColor: '#1565C0'
                }
              }}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Assignments;
