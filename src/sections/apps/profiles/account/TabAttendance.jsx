import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

// material-ui
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
// import { CSVExport } from 'components/third-party/react-table';

import makeData from 'data/react-table';
import Calendar from 'pages/apps/calendar';
import DenseTable from 'pages/Parent/Leave/leaveHistory';
// import { LeaveRequest } from 'pages/Parent/Leave/LeaveRequest';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, title, onRequestLeave }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const headers = table?.getAllColumns()?.map((col) => ({
    label: typeof col.columnDef.header === 'string' ? col.columnDef.header : '#',
    key: col.columnDef.accessorKey
  }));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderMobileCards = () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      {data.map((row, index) => (
        <Paper key={index} sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              <strong>Status</strong>
            </Typography>
            {(() => {
              switch (row.status) {
                case 'Complicated':
                  return <Chip color="error" label="Rejected" size="small" variant="light" />;
                case 'Relationship':
                  return <Chip color="success" label="Approved" size="small" variant="light" />;
                default:
                  return <Chip color="info" label="Applied" size="small" variant="light" />;
              }
            })()}
          </Stack>
          <Typography variant="body2">
            <strong>Applied For:</strong> {row.firstName}
          </Typography>
          <Typography variant="body2">
            <strong>Applied On:</strong> {row.lastName}
          </Typography>
          <Typography variant="body2">
            <strong>Action Taken On:</strong> {row.age}
          </Typography>
          <Typography variant="body2">
            <strong>Action Taken By:</strong> {row.role}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );

  return (
    <MainCard
      content={false}
      title={title}
      secondary={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="contained" color="primary" size="small" startIcon={<EventAvailableIcon />} onClick={onRequestLeave}>
            Request Leave
          </Button>
          {/* <CSVExport {...{ data, headers, filename: 'dense.csv' }} /> */}
        </div>
      }
    >
      {isMobile ? (
        renderMobileCards()
      ) : (
        <ScrollX>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} {...header.column.columnDef.meta}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>
      )}
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  title: PropTypes.string,
  onRequestLeave: PropTypes.func
};

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function TabAttendance() {
  const calendarFrom = 'profile'
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <MainCard>
            <Calendar calendarFrom = {calendarFrom}/>
          </MainCard>
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <DenseTable />
        </Grid> */}
      </Grid>
    </>
  );
}
