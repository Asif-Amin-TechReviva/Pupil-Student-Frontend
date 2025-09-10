import React, { useState, useEffect } from 'react';
import { IconButton, Select, MenuItem, TextField, Box, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const Pagination = ({ totalRows, rowsPerPageOptions = [10, 20, 30], onPageChange, page, setPage, take }) => {
  const [inputPage, setInputPage] = useState(page + 1);

  const totalPages = Math.ceil(totalRows / take);

  useEffect(() => {
    setInputPage(page + 1);
  }, [page]);

  const handleRowsPerPageChange = (event) => {
    setPage(0);
    onPageChange(0, event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      onPageChange(newPage, take);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputPage(event.target.value);

    if (!isNaN(value) && value > 0 && value <= totalPages) {
      handlePageChange(value - 1);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2">Rows per page:</Typography>
        <Select value={take} onChange={handleRowsPerPageChange} size="small">
          {rowsPerPageOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          <ArrowBackIosNew />
        </IconButton>

        <TextField
          value={inputPage}
          onChange={handleInputChange}
          size="small"
          inputProps={{ min: 1, max: totalPages }}
          type="number"
          variant="outlined"
        />

        <IconButton onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Pagination;
