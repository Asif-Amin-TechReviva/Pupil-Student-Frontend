import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value = '', onDebouncedChange, placeholder = 'Search…', sx = {}, delay = 500 }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(internalValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [internalValue, delay, onDebouncedChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        px: 2,
        py: 0.5,
        minWidth: 250,
        height: 40,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        ...sx
      }}
    >
      <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
      <InputBase
        fullWidth
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        inputProps={{ 'aria-label': placeholder }}
        autoFocus
      />
    </Box>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onDebouncedChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
  delay: PropTypes.number
};

export default SearchBar;
