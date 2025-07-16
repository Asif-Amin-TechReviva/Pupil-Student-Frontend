import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';

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
  Tooltip
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { LeaveRequest } from './leaveRequest';
import { getLeaveHistory } from 'api/leave';
import LogoImageLoader from 'components/PupilLoader';
import { Box } from '@mui/system';

// ==============================|| REACT TABLE COMPONENT ||============================== //

function ReactTable({ columns, data, title, onRequestLeave }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const renderMobileCards = () => (
    <Stack spacing={2} sx={{ p: 2 }}>
      {data.map((row, index) => (
        <Paper key={index} sx={{ p: 2 }}>
          {/* Status + Edit Row */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={500}>
                <strong>Status</strong>
              </Typography>
              <Chip
                color={row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'error' : 'info'}
                label={row.status}
                size="small"
                variant="light"
              />
            </Stack>
            <Button size="small" variant="outlined" onClick={() => handleEdit(row)}>
              Edit
            </Button>
          </Stack>

          <Typography variant="body2">
            <strong>Applied For:</strong> {row.createdAt}
          </Typography>
          <Typography variant="body2">
            <strong>Applied On:</strong> {row.appliedOn}
          </Typography>
          <Typography variant="body2">
            <strong>Leave Type:</strong> {row.leaveType}
          </Typography>
          <Typography variant="body2">
            <strong>Action Taken On:</strong> {row.actionedOn || '—'}
          </Typography>
          <Typography variant="body2">
            <strong>Action Taken By:</strong> {row.actionedBy || '—'}
          </Typography>
          <Typography variant="body2">
            <strong>Reason:</strong> {row.reason?.length > 20 ? row.reason.slice(0, 20) + '...' : row.reason || '—'}
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

// ==============================|| DENSE TABLE WRAPPER ||============================== //

export default function DenseTable() {
  const [openRequest, setOpenRequest] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpenRequest = () => setOpenRequest(true);
  const handleCloseRequest = () => setOpenRequest(false);
  const handleEdit = (row) => {
    setEditRowData(row);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setEditRowData(null);
    setOpenEdit(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getLeaveHistory(); 
        const rows =
          response?.data?.map((item) => ({
            id: item.id,
            createdAt:
              new Date(item.startDate).toLocaleDateString() === new Date(item.endDate).toLocaleDateString()
                ? new Date(item.startDate).toLocaleDateString()
                : `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`,
            status: item.status,
            appliedOn: new Date(item.createdAt).toLocaleDateString(),
            actionedOn: item.actionedAt ? new Date(item.actionedAt).toLocaleDateString() : null,
            reason: item.reason,
            startDate: item.startDate,
            endDate: item.endDate,

            leaveType: item.leaveType,
            actionedBy: item.actionBy
              ? `${item.actionBy.firstName} ${item.actionBy.lastName}`
              : item.actionById
                ? 'ID: ' + item.actionById
                : null
          })) || [];
        setData(rows);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Applied For',
        accessorKey: 'createdAt'
      },

      {
        header: 'Applied On',
        accessorKey: 'appliedOn'
      },
      {
        header: 'Leave TYPE',
        accessorKey: 'leaveType'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          const val = props.getValue();
          const color = val === 'APPROVED' ? 'success' : val === 'REJECTED' ? 'error' : 'info';
          return <Chip color={color} label={val} size="small" variant="light" />;
        }
      },
      {
        header: 'Action Taken On',
        accessorKey: 'actionedOn',
        cell: (props) => props.getValue() || '—'
      },
      {
        header: 'Action Taken By',
        accessorKey: 'actionedBy',
        cell: (props) => props.getValue() || '—'
      },

      {
        header: 'Reason',
        accessorKey: 'reason',
        cell: (props) => {
          const reason = props.getValue();
          if (!reason) return '—';
          const truncated = reason.length > 20 ? reason.slice(0, 20) + '...' : reason;
          return (
            <Tooltip title={reason} arrow>
              <span>{truncated}</span>
            </Tooltip>
          );
        }
      },
      ,
      {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => (
          <Button size="small" variant="outlined" onClick={() => handleEdit(row.original)}>
            Edit
          </Button>
        )
      }
    ],
    []
  );
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
    <>
      <ReactTable data={data} columns={columns} title="Leave History" onRequestLeave={handleOpenRequest} />
      <LeaveRequest open={openRequest} handleClose={handleCloseRequest} />
      {editRowData && <LeaveRequest open={openEdit} handleClose={handleCloseEdit} initialData={editRowData} mode="edit" />}
    </>
  );
}
