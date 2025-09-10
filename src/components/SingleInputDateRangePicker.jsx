// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import TextField from '@mui/material/TextField';
// import Popover from '@mui/material/Popover';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { format, parse } from 'date-fns';
// import { Close } from '@mui/icons-material';
// import { IconButton } from '@mui/material';

// export default function SingleInputDateRangePicker({ onDateChange, reset, setReset, value }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [currentSelection, setCurrentSelection] = useState('start');

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentSelection('start');
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'date-range-popover' : undefined;

//   const handleDateChange = (date) => {
//     if (currentSelection === 'start') {
//       setStartDate(date);
//       setCurrentSelection('end');
//     } else {
//       setEndDate(date);
//       setAnchorEl(null);
//       if (date) {
//         const formattedStartDate = startDate ? format(startDate, 'MM/dd/yyyy') : '';
//         const formattedEndDate = format(date, 'MM/dd/yyyy');
//         onDateChange({ startDate: formattedStartDate, endDate: formattedEndDate });
//       }
//     }
//   };

//   const formatDateRange = (start, end) => {
//     if (!start && !end) return '';
//     if (start && !end) return `${format(start, 'MM/dd/yyyy')} - `;
//     if (!start && end) return ` - ${format(end, 'MM/dd/yyyy')}`;
//     return `${format(start, 'MM/dd/yyyy')} - ${format(end, 'MM/dd/yyyy')}`;
//   };

//   // Reset effect
//   useEffect(() => {
//     if (reset) {
//       setStartDate(null);
//       setEndDate(null);
//       setCurrentSelection('start');
//       setReset(false);
//     }
//   }, [reset, setReset]);

//   // Sync with external value prop
//   useEffect(() => {
//     const { startDate: extStart, endDate: extEnd } = value || {};
  
//     if (extStart) {
//       setStartDate(parse(extStart, 'MM/dd/yyyy', new Date()));
//     }
  
//     if (extEnd) {
//       setEndDate(parse(extEnd, 'MM/dd/yyyy', new Date()));
//     }
  
//     if (!extStart && !extEnd) {
//       setStartDate(null);
//       setEndDate(null);
//     }
//   }, [value?.startDate, value?.endDate]);

//   const clearDates = (e) => {
//     e.stopPropagation();
//     setStartDate(null);
//     setEndDate(null);
//     setCurrentSelection('start');
//     onDateChange({ startDate: '', endDate: '' });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <TextField
//         onClick={handleClick}
//         value={formatDateRange(startDate, endDate)}
//         placeholder="Select date range"
//         InputProps={{
//           readOnly: true,
//           endAdornment: (startDate || endDate) && (
//             <IconButton
//               size="small"
//               onClick={clearDates}
//               sx={{ mr: 1 }}
//             >
//               <Close fontSize="small" />
//             </IconButton>
//           )
//         }}
//         sx={{
//           width: '100%',
//           '& .MuiInputBase-input::placeholder': {
//             color: '#5b6b79',
//             opacity: 1
//           }
//         }}
//       />
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left'
//         }}
//       >
//         <Box p={2} width={330}>
//           <StaticDatePicker
//             displayStaticWrapperAs="desktop"
//             value={currentSelection === 'start' ? startDate : endDate}
//             onChange={handleDateChange}
//             renderInput={(params) => <TextField {...params} />}
//           />
//           <Box mt={2} display="flex" justifyContent="space-between">
//             <Button 
//               onClick={() => setCurrentSelection('start')} 
//               variant={currentSelection === 'start' ? 'contained' : 'outlined'}
//               disabled={!startDate && !!endDate}
//             >
//               Start Date
//             </Button>
//             <Button 
//               onClick={() => setCurrentSelection('end')} 
//               variant={currentSelection === 'end' ? 'contained' : 'outlined'}
//               disabled={!startDate}
//             >
//               End Date
//             </Button>
//           </Box>
//         </Box>
//       </Popover>
//     </LocalizationProvider>
//   );
// }


import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { format, parse } from 'date-fns';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function SingleInputDateRangePicker({ onDateChange, reset, setReset, value }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentSelection, setCurrentSelection] = useState('start');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentSelection('start');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-range-popover' : undefined;

  const handleDateChange = (date) => {
    if (currentSelection === 'start') {
      setStartDate(date);
      setCurrentSelection('end');
    } else {
      setEndDate(date);
      setAnchorEl(null);
      if (date) {
        const formattedStartDate = startDate ? format(startDate, 'MM/dd/yyyy') : '';
        const formattedEndDate = format(date, 'MM/dd/yyyy');
        onDateChange({ startDate: formattedStartDate, endDate: formattedEndDate });
      }
    }
  };

  // const formatDateRange = (start, end) => {
  //   if (!start && !end) return '';
  //   if (start && !end) return `${format(start, 'MM/dd/yyyy')} - `;
  //   if (!start && end) return ` - ${format(end, 'MM/dd/yyyy')}`;
  //   return `${format(start, 'MM/dd/yyyy')} - ${format(end, 'MM/dd/yyyy')}`;
  // };

  const formatDateRange = (start, end) => {
    try {
      const startDateObj = start instanceof Date ? start : (start ? parse(start, 'MM/dd/yyyy', new Date()) : null);
      const endDateObj = end instanceof Date ? end : (end ? parse(end, 'MM/dd/yyyy', new Date()) : null);
      
      if (!startDateObj && !endDateObj) return '';
      if (startDateObj && !endDateObj) return `${format(startDateObj, 'MM/dd/yyyy')} - `;
      if (!startDateObj && endDateObj) return ` - ${format(endDateObj, 'MM/dd/yyyy')}`;
      return `${format(startDateObj, 'MM/dd/yyyy')} - ${format(endDateObj, 'MM/dd/yyyy')}`;
    } catch {
      return '';
    }
  };

  // Reset effect
  useEffect(() => {
    if (reset) {
      setStartDate(null);
      setEndDate(null);
      setCurrentSelection('start');
      setReset(false);
    }
  }, [reset, setReset]);

  // Safely sync with external value prop
  useEffect(() => {
    const { startDate: extStart, endDate: extEnd } = value || {};

    try {
      if (extStart && !isNaN(Date.parse(extStart))) {
        setStartDate(parse(extStart, 'MM/dd/yyyy', new Date()));
      } else {
        setStartDate(null);
      }

      if (extEnd && !isNaN(Date.parse(extEnd))) {
        setEndDate(parse(extEnd, 'MM/dd/yyyy', new Date()));
      } else {
        setEndDate(null);
      }

      if (!extStart && !extEnd) {
        setStartDate(null);
        setEndDate(null);
      }
    } catch {
      setStartDate(null);
      setEndDate(null);
    }
  }, [value?.startDate, value?.endDate]);

  const clearDates = (e) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setCurrentSelection('start');
    onDateChange({ startDate: '', endDate: '' });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField
        onClick={handleClick}
        value={formatDateRange(startDate, endDate)}  
        placeholder="Select date range"
        InputProps={{
          readOnly: true,
          endAdornment: (startDate || endDate) && (
            <IconButton size="small" onClick={clearDates} sx={{ mr: 1 }}>
              <Close fontSize="small" />
            </IconButton>
          )
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-input::placeholder': {
            color: '#5b6b79',
            opacity: 1
          }
        }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box p={2} width={330}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={currentSelection === 'start' ? startDate : endDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={() => setCurrentSelection('start')}
              variant={currentSelection === 'start' ? 'contained' : 'outlined'}
              disabled={!startDate && !!endDate}
            >
              Start Date
            </Button>
            <Button
              onClick={() => setCurrentSelection('end')}
              variant={currentSelection === 'end' ? 'contained' : 'outlined'}
              disabled={!startDate}
            >
              End Date
            </Button>
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
