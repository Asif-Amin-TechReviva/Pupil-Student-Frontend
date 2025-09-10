import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { getLeaveHistory, leaveRequest, UpdateLeaveRequest } from 'api/leave';
import { enqueueSnackbar } from 'notistack';

export const LeaveRequest = ({ open, handleClose, initialData = {}, mode = 'create',onSuccess }) => {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [description, setDescription] = useState('');
  const [leaveDuration, setLeaveDuration] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && mode === 'edit' && initialData) {
      setLeaveType((initialData.leaveType || '').toUpperCase());
      setDescription(initialData.reason || '');
      setLeaveDuration((initialData.leaveDuration || 'FULLDAY').toUpperCase());

      const from = initialData.fromDate || initialData.startDate;
      const to = initialData.toDate || initialData.endDate || initialData.startDate;

      setFromDate(from ? dayjs(from) : null);
      setToDate(to ? dayjs(to) : null);
    }

    if (open) setErrors({});
  }, [open, initialData, mode]);

  const validate = () => {
    const newErrors = {};

    if (!leaveType) newErrors.leaveType = 'Leave type is required.';
    if (!description) newErrors.description = 'Reason is required.';
    if (!leaveDuration) newErrors.leaveDuration = 'Duration is required.';
    if (!fromDate) newErrors.fromDate = 'From date is required.';
    if (!toDate) newErrors.toDate = 'To date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      leaveType: leaveType.toUpperCase(),
      reason: description,
      startDate: fromDate?.format('YYYY-MM-DD'),
      endDate: toDate?.format('YYYY-MM-DD'),
      leaveDuration
    };

    try {
      const response = mode === 'edit' ? await UpdateLeaveRequest(payload, initialData.id) : await leaveRequest(payload);

      // Example: { success: true, message: 'Updated successfully', data: {} }
      if (response?.success === false) {
        throw new Error(response.message || 'Something went wrong');
      }

      enqueueSnackbar(mode === 'edit' ? 'Leave request updated!' : 'Leave request submitted!', { variant: 'success' });
      handleClose();
      if (onSuccess) {
        onSuccess();
      }
      await getLeaveHistory(); // refresh
    } catch (error) {
      enqueueSnackbar(error.message || 'Failed to submit leave request', {
        variant: 'error'
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Update Leave Request' : 'Request Leave'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth required error={!!errors.leaveType}>
              <InputLabel>Leave Type</InputLabel>
              <Select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} label="Leave Type">
                <MenuItem value="SICK">Sick Leave</MenuItem>
                <MenuItem value="CASUAL">Casual Leave</MenuItem>
              </Select>
              {errors.leaveType && <FormHelperText>{errors.leaveType}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth required error={!!errors.leaveDuration}>
              <InputLabel>Leave Duration</InputLabel>
              <Select value={leaveDuration} onChange={(e) => setLeaveDuration(e.target.value)} label="Leave Duration">
                <MenuItem value="FULLDAY">Full Day</MenuItem>
                <MenuItem value="HALFDAYMORNING">Half Day Morning</MenuItem>
                <MenuItem value="HALFDAYEVENING">Half Day Evening</MenuItem>
              </Select>
              {errors.leaveDuration && <FormHelperText>{errors.leaveDuration}</FormHelperText>}
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={dayjs()}
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.fromDate,
                    helperText: errors.fromDate || ''
                  }
                }}
              />
              <DatePicker
                minDate={fromDate || dayjs()}
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.toDate,
                    helperText: errors.toDate || ''
                  }
                }}
              />
            </LocalizationProvider>

            <TextField
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              required
              error={!!errors.description}
              helperText={errors.description || 'Enter reason or additional details about the leave...'}
            />

            <TextField
              type="file"
              fullWidth
              onChange={(e) => setFile(e.target.files[0])}
              inputProps={{ accept: '.pdf,.jpg,.png,.jpeg' }}
              helperText="Attach a supporting document (not sent to server)"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {mode === 'edit' ? 'Update' : 'Apply'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

LeaveRequest.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  mode: PropTypes.oneOf(['create', 'edit'])
};
