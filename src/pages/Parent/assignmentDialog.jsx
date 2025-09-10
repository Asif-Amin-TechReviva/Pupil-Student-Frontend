import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';
import { Close, Description, PictureAsPdf, InsertDriveFile, VideoFile, AudioFile } from '@mui/icons-material';
import { CloudDownloadIcon } from 'lucide-react';

const FileIcon = ({ fileName }) => {
  const extension = fileName?.split('.').pop().toLowerCase();

  switch (extension) {
    case 'pdf':
      return <PictureAsPdf color="error" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return <Description color="primary" />;
    case 'mp4':
    case 'mov':
    case 'avi':
      return <VideoFile color="secondary" />;
    case 'mp3':
    case 'wav':
      return <AudioFile color="action" />;
    default:
      return <InsertDriveFile color="disabled" />;
  }
};

const AssignmentDialog = ({ openModal, handleCloseModal, modalLoading, selectedAssignment, handleDownload, handleBulkDownload }) => {
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);

  useEffect(() => {
    if (selectedAssignment?.attachmentUrl) {
      const urls = selectedAssignment.attachmentUrl.split(',');
      const previews = urls.map((url) => {
        const fileName = url.split('/').pop();
        const extension = fileName.split('.').pop().toLowerCase();
        const isImage = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension);

        return {
          url,
          fileName,
          isImage,
          extension
        };
      });

      setAttachmentPreviews(previews);
    }
  }, [selectedAssignment]);

  const downloadAllFiles = () => {
    if (selectedAssignment?.attachmentUrl) {
      const urls = selectedAssignment.attachmentUrl.split(',');
      urls.forEach((url, index) => {
        const fileName = url.split('/').pop();
        handleDownload(url, fileName || `attachment-${index + 1}`);
      });
    }
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          overflow: 'hidden'
        }
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          background: 'linear-gradient(135deg, #1976D2, #1565C0)',
          color: 'white'
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Assignment Details
        </Typography>
        <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>

      {/* CONTENT */}
      <DialogContent sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
        {modalLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={200}>
            <CircularProgress />
          </Box>
        ) : (
          selectedAssignment && (
            <Box>
              {/* Title */}
              <Typography variant="h4" fontWeight="700" textAlign="center" color="text.primary" gutterBottom>
                {selectedAssignment.title}
              </Typography>

              {/* Assigned by */}
              <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ fontStyle: 'italic', mb: 3 }}>
                Assigned by <b>{selectedAssignment?.addedBy || 'Unknown'}</b>
              </Typography>

              {/* Dates */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Created On
                    </Typography>
                    <Typography fontWeight={600}>{new Date(selectedAssignment.createdAt).toLocaleDateString()}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, borderRadius: 1, boxShadow: 1, bgcolor: '#fff5f5' }}>
                    <Typography variant="subtitle2" color="error.main">
                      Due Date
                    </Typography>
                    <Typography fontWeight={700} color="error.main">
                      {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Description */}
              <Paper sx={{ p: 3, borderRadius: 1, boxShadow: 2, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {selectedAssignment.description}
                </Typography>
              </Paper>

              {/* Attachments */}
              {selectedAssignment.attachmentUrl && (
                <Paper sx={{ p: 2.5, borderRadius: 1, boxShadow: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
                    Attachments ({attachmentPreviews.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {attachmentPreviews.map((file, idx) => (
                      <Grid item xs={12} sm={12} key={idx}>
                        <Box
                          sx={{
                            p: 1.5,
                            bgcolor: 'white',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                          }}
                        >
                          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            {file.isImage ? (
                              <img
                                src={file.url}
                                alt={`Attachment ${idx + 1}`}
                                style={{
                                  width: '100%',
                                  maxHeight: '150px',
                                  borderRadius: 8,
                                  objectFit: 'contain'
                                }}
                              />
                            ) : (
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                <FileIcon fileName={file.fileName} sx={{ fontSize: 48, mb: 1 }} />
                                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                  {file.fileName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {file.extension.toUpperCase()} file
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Box>
          )
        )}
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          backgroundColor: '#f1f3f5',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        {selectedAssignment?.attachmentUrl && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            onClick={() => handleBulkDownload(selectedAssignment.attachmentUrl, selectedAssignment.title)}
            sx={{ fontWeight: 'bold', px: 3, borderRadius: 2, textTransform: 'none' }}
          >
            Download Assignment
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDialog;
