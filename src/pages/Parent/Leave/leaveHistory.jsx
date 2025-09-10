// // import PropTypes from 'prop-types';
// // import React, { useMemo, useState, useEffect } from 'react';

// // // material-ui
// // import {
// //   Chip,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableContainer,
// //   TableCell,
// //   TableHead,
// //   TableRow,
// //   Button,
// //   Typography,
// //   Stack,
// //   useMediaQuery,
// //   useTheme,
// //   Tooltip
// // } from '@mui/material';
// // import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// // // third-party
// // import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// // // project import
// // import ScrollX from 'components/ScrollX';
// // import MainCard from 'components/MainCard';
// // import { LeaveRequest } from './leaveRequest';
// // import { getLeaveHistory } from 'api/leave';
// // import LogoImageLoader from 'components/PupilLoader';
// // import { Box } from '@mui/system';

// // // ==============================|| REACT TABLE COMPONENT ||============================== //

// // function ReactTable({ columns, data, title, onRequestLeave }) {
// //   const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //   const renderMobileCards = () => (
// //     <Stack spacing={2} sx={{ p: 2 }}>
// //       {data.map((row, index) => (
// //         <Paper key={index} sx={{ p: 2 }}>
// //           {/* Status + Edit Row */}
// //           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
// //             <Stack direction="row" spacing={1} alignItems="center">
// //               <Typography variant="body2" fontWeight={500}>
// //                 <strong>Status</strong>
// //               </Typography>
// //               <Chip
// //                 color={row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'error' : 'info'}
// //                 label={row.status}
// //                 size="small"
// //                 variant="light"
// //               />
// //             </Stack>
// //             <Button size="small" variant="outlined" onClick={() => handleEdit(row)}>
// //               Edit
// //             </Button>
// //           </Stack>

// //           <Typography variant="body2">
// //             <strong>Applied For:</strong> {row.createdAt}
// //           </Typography>
// //           <Typography variant="body2">
// //             <strong>Applied On:</strong> {row.appliedOn}
// //           </Typography>
// //           <Typography variant="body2">
// //             <strong>Leave Type:</strong> {row.leaveType}
// //           </Typography>
// //           <Typography variant="body2">
// //             <strong>Action Taken On:</strong> {row.actionedOn || '—'}
// //           </Typography>
// //           <Typography variant="body2">
// //             <strong>Action Taken By:</strong> {row.actionedBy || '—'}
// //           </Typography>
// //           <Typography variant="body2">
// //             <strong>Reason:</strong> {row.reason?.length > 20 ? row.reason.slice(0, 20) + '...' : row.reason || '—'}
// //           </Typography>
// //         </Paper>
// //       ))}
// //     </Stack>
// //   );

// //   return (
// //     <MainCard
// //       content={false}
// //       title={title}
// //       secondary={
// //         <div style={{ display: 'flex', gap: '8px' }}>
// //           <Button variant="contained" color="primary" size="small" startIcon={<EventAvailableIcon />} onClick={onRequestLeave}>
// //             Request Leave
// //           </Button>
// //         </div>
// //       }
// //     >
// //       {isMobile ? (
// //         renderMobileCards()
// //       ) : (
// //         <ScrollX>
// //           <TableContainer component={Paper}>
// //             <Table size="small">
// //               <TableHead>
// //                 {table.getHeaderGroups().map((headerGroup) => (
// //                   <TableRow key={headerGroup.id}>
// //                     {headerGroup.headers.map((header) => (
// //                       <TableCell key={header.id} {...header.column.columnDef.meta}>
// //                         {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
// //                       </TableCell>
// //                     ))}
// //                   </TableRow>
// //                 ))}
// //               </TableHead>
// //               <TableBody>
// //                 {table.getRowModel().rows.map((row) => (
// //                   <TableRow key={row.id}>
// //                     {row.getVisibleCells().map((cell) => (
// //                       <TableCell key={cell.id} {...cell.column.columnDef.meta}>
// //                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                       </TableCell>
// //                     ))}
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </ScrollX>
// //       )}
// //     </MainCard>
// //   );
// // }

// // ReactTable.propTypes = {
// //   columns: PropTypes.array,
// //   data: PropTypes.array,
// //   title: PropTypes.string,
// //   onRequestLeave: PropTypes.func
// // };

// // // ==============================|| DENSE TABLE WRAPPER ||============================== //

// // export default function DenseTable() {
// //   const [openRequest, setOpenRequest] = useState(false);
// //   const [openEdit, setOpenEdit] = useState(false);
// //   const [editRowData, setEditRowData] = useState(null);
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const handleOpenRequest = () => setOpenRequest(true);
// //   const handleCloseRequest = () => setOpenRequest(false);
// //   const handleEdit = (row) => {
// //     setEditRowData(row);
// //     setOpenEdit(true);
// //   };
// //   const handleCloseEdit = () => {
// //     setEditRowData(null);
// //     setOpenEdit(false);
// //   };

// //   const fetchLeaveData = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await getLeaveHistory();
// //       const rows =
// //         response?.data?.map((item) => ({
// //           id: item.id,
// //           createdAt:
// //             new Date(item.startDate).toLocaleDateString() === new Date(item.endDate).toLocaleDateString()
// //               ? new Date(item.startDate).toLocaleDateString()
// //               : `${new Date(item.startDate).toLocaleDateString()} - ${new Date(item.endDate).toLocaleDateString()}`,
// //           status: item.status,
// //           appliedOn: new Date(item.createdAt).toLocaleDateString(),
// //           actionedOn: item.actionedAt ? new Date(item.actionedAt).toLocaleDateString() : null,
// //           reason: item.reason,
// //           startDate: item.startDate,
// //           endDate: item.endDate,
// //           leaveType: item.leaveType,
// //           actionedBy: item.actionBy
// //             ? `${item.actionBy.firstName} ${item.actionBy.lastName}`
// //             : item.actionById
// //               ? 'ID: ' + item.actionById
// //               : null
// //         })) || [];
// //       setData(rows);
// //     } catch (error) {
// //       console.error('Error fetching leave data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLeaveData();
// //   }, []);

// //   const columns = useMemo(
// //     () => [
// //       {
// //         header: 'Applied For',
// //         accessorKey: 'createdAt'
// //       },

// //       {
// //         header: 'Applied On',
// //         accessorKey: 'appliedOn'
// //       },
// //       {
// //         header: 'Leave TYPE',
// //         accessorKey: 'leaveType'
// //       },
// //       {
// //         header: 'Status',
// //         accessorKey: 'status',
// //         cell: (props) => {
// //           const val = props.getValue();
// //           const color = val === 'APPROVED' ? 'success' : val === 'REJECTED' ? 'error' : 'info';
// //           return <Chip color={color} label={val} size="small" variant="light" />;
// //         }
// //       },
// //       {
// //         header: 'Action Taken On',
// //         accessorKey: 'actionedOn',
// //         cell: (props) => props.getValue() || '—'
// //       },
// //       {
// //         header: 'Action Taken By',
// //         accessorKey: 'actionedBy',
// //         cell: (props) => props.getValue() || '—'
// //       },

// //       {
// //         header: 'Reason',
// //         accessorKey: 'reason',
// //         cell: (props) => {
// //           const reason = props.getValue();
// //           if (!reason) return '—';
// //           const truncated = reason.length > 20 ? reason.slice(0, 20) + '...' : reason;
// //           return (
// //             <Tooltip title={reason} arrow>
// //               <span>{truncated}</span>
// //             </Tooltip>
// //           );
// //         }
// //       },
// //       {
// //         header: 'Actions',
// //         accessorKey: 'actions',
// //         cell: ({ row }) => {
// //           const isDisabled = row.original.status === 'APPROVED' || row.original.status === 'REJECTED';
// //           return (
// //             <Button
// //               size="small"
// //               variant="outlined"
// //               onClick={() => handleEdit(row.original)}
// //               disabled={isDisabled}
// //             >
// //               Edit
// //             </Button>
// //           );
// //         }
// //       }
// //     ],
// //     []
// //   );
// //   if (loading) {
// //     return (
// //       <Box
// //         sx={{
// //           width: '100%',
// //           height: '70vh',
// //           display: 'flex',
// //           justifyContent: 'center',
// //           alignItems: 'center'
// //         }}
// //       >
// //         <LogoImageLoader />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <>
// //       <ReactTable data={data} columns={columns} title="Leave History" onRequestLeave={handleOpenRequest} />
// //       <LeaveRequest open={openRequest} handleClose={handleCloseRequest} onSuccess={fetchLeaveData} />
// //       {editRowData && <LeaveRequest open={openEdit} handleClose={handleCloseEdit}onSuccess={fetchLeaveData}  initialData={editRowData} mode="edit" />}
// //     </>
// //   );
// // }

// import PropTypes from 'prop-types';
// import React, { useMemo, useState, useEffect } from 'react';

// // material-ui
// import {
//   Chip,
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   Typography,
//   Stack,
//   useMediaQuery,
//   useTheme,
//   Tooltip
// } from '@mui/material';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// // third-party
// import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// // project import
// import ScrollX from 'components/ScrollX';
// import MainCard from 'components/MainCard';
// import { LeaveRequest } from './leaveRequest';
// import { getLeaveHistory } from 'api/leave';
// import LogoImageLoader from 'components/PupilLoader';
// import { Box } from '@mui/system';
// import { TablePagination } from 'components/third-party/react-table';

// // ==============================|| REACT TABLE COMPONENT ||============================== //

// function ReactTable({ columns, data, title, onRequestLeave, onEdit }) {
//   const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const renderMobileCards = () => {
//     if (!data || data.length === 0) {
//       return (
//         <Box sx={{ p: 3, textAlign: 'center' }}>
//           <Typography variant="body1">No Data</Typography>
//         </Box>
//       );
//     }

//     return (
//       <Stack spacing={2} sx={{ p: 2 }}>
//         {data.map((row, index) => {
//           const locked = row.status === 'APPROVED' || row.status === 'REJECTED';
//           return (
//             <Paper key={index} sx={{ p: 2 }}>
//               <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   <Typography variant="body2" fontWeight={500}>
//                     <strong>Status</strong>
//                   </Typography>
//                   <Chip
//                     color={row.status === 'APPROVED' ? 'success' : row.status === 'REJECTED' ? 'error' : 'info'}
//                     label={row.status}
//                     size="small"
//                     variant="light"
//                   />
//                 </Stack>
//                 <Button size="small" variant="outlined" onClick={() => onEdit?.(row)} disabled={locked}>
//                   Edit
//                 </Button>
//               </Stack>

//               <Typography variant="body2">
//                 <strong>Applied For:</strong> {row.createdAt}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Applied On:</strong> {row.appliedOn}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Leave Type:</strong> {row.leaveType}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Action Taken On:</strong> {row.actionedOn || '—'}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Action Taken By:</strong> {row.actionedBy || '—'}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Reason:</strong> {row.reason?.length > 20 ? row.reason.slice(0, 20) + '...' : row.reason || '—'}
//               </Typography>
//             </Paper>
//           );
//         })}
//       </Stack>
//     );
//   };

//   return (
//     <MainCard
//       content={false}
//       title={title}
//       secondary={
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <Button variant="contained" color="primary" size="small" startIcon={<EventAvailableIcon />} onClick={onRequestLeave}>
//             Request Leave
//           </Button>
//         </div>
//       }
//     >
//       {isMobile ? (
//         renderMobileCards()
//       ) : (
//         <ScrollX>
//           <TableContainer component={Paper}
//            sx={{
//             height: 'calc(100vh - 400px)',
//             overflow: 'auto',
//             position: 'relative'
//           }}>
//             <Table size="small"
//              sx={{
//               '& tbody .MuiTableCell-root': { py: 1.2 },
//               '& thead .MuiTableCell-root': { py: 1.25 }
//             }}>
//               <TableHead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <TableCell key={header.id} {...header.column.columnDef.meta}>
//                         {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHead>
//               <TableBody>
//                 {table.getRowModel().rows.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={table.getVisibleLeafColumns().length} align="center">
//                       No Data
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow key={row.id}>
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id} {...cell.column.columnDef.meta}>
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </ScrollX>
//       )}
//     </MainCard>
//   );
// }

// ReactTable.propTypes = {
//   columns: PropTypes.array,
//   data: PropTypes.array,
//   title: PropTypes.string,
//   onRequestLeave: PropTypes.func,
//   onEdit: PropTypes.func
// };

// // ==============================|| DENSE TABLE WRAPPER ||============================== //

// export default function DenseTable() {
//   const [openRequest, setOpenRequest] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editRowData, setEditRowData] = useState(null);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // pagination state (UI 0-based; API 1-based)
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);

//   const handleOpenRequest = () => setOpenRequest(true);
//   const handleCloseRequest = () => setOpenRequest(false);
//   const handleEdit = (row) => {
//     setEditRowData(row);
//     setOpenEdit(true);
//   };
//   const handleCloseEdit = () => {
//     setEditRowData(null);
//     setOpenEdit(false);
//   };

//   // clamp helpers
//   const toNumber = (val, fallback) => {
//     const n = typeof val === 'string' ? Number(val) : val;
//     return Number.isFinite(n) ? n : fallback;
//   };
//   const safeSetPageIndex = (next) => {
//     setPageIndex((prev) => {
//       const raw = typeof next === 'function' ? next(prev) : next;
//       return Math.max(0, toNumber(raw, prev));
//     });
//   };
//   const safeSetPageSize = (next) => {
//     setPageSize((prev) => {
//       const raw = typeof next === 'function' ? next(prev) : next;
//       return Math.max(1, toNumber(raw, prev));
//     });
//   };

//   // reset to first page when page size changes
//   useEffect(() => {
//     safeSetPageIndex(0);
//   }, [pageSize]);

//   const resetPaginationState = () => {
//     setPageIndex(0);
//     setPageSize(10);
//     setTotalCount(0);
//   };

//   const fetchLeaveData = async () => {
//     try {
//       setLoading(true);

//       const response = await getLeaveHistory({
//         page: pageIndex + 1,
//         take: pageSize,
//         sortOrder: 'desc'
//       });

//       const list = response?.data ?? [];
//       const rows =
//         list.map((item) => ({
//           id: item.id,
//           appliedFrom: new Date(item.startDate).toLocaleDateString(),
//           appliedTo: new Date(item.endDate ?? item.startDate).toLocaleDateString(),
//           status: item.status,
//           appliedOn: new Date(item.createdAt).toLocaleDateString(),
//           actionedOn: item.actionedAt ? new Date(item.actionedAt).toLocaleDateString() : null,
//           reason: item.reason,
//           startDate: item.startDate,
//           endDate: item.endDate,
//           leaveType: item.leaveType,
//           actionedBy: item.actionBy
//             ? `${item.actionBy.firstName} ${item.actionBy.lastName}`
//             : item.actionById
//               ? 'ID: ' + item.actionById
//               : null
//         })) || [];

//       setData(rows);

//       const meta = response?.meta ?? {};
//       const total = meta.itemCount ?? meta.totalItems ?? meta.total ?? rows.length;
//       setTotalCount(total);

//       const pageCount = Math.max(1, Math.ceil(total / pageSize));
//       if (pageIndex > pageCount - 1) safeSetPageIndex(pageCount - 1);
//     } catch (error) {
//       console.error('Error fetching leave data:', error);
//       setData([]);
//       resetPaginationState();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeaveData();
//   }, [pageIndex, pageSize]);

//   const columns = useMemo(
//     () => [
//       { header: 'Applied On', accessorKey: 'appliedOn' },
//       { header: 'Applied From', accessorKey: 'appliedFrom' },
//       { header: 'Applied To', accessorKey: 'appliedTo' },
//       { header: 'Leave TYPE', accessorKey: 'leaveType' },
//       { header: 'Action Taken On', accessorKey: 'actionedOn', cell: (props) => props.getValue() || '—' },
//       { header: 'Action Taken By', accessorKey: 'actionedBy', cell: (props) => props.getValue() || '—' },
//       {
//         header: 'Reason',
//         accessorKey: 'reason',
//         cell: (props) => {
//           const reason = props.getValue();
//           if (!reason) return '—';
//           const truncated = reason.length > 20 ? reason.slice(0, 20) + '...' : reason;
//           return (
//             <Tooltip title={reason} arrow>
//               <span>{truncated}</span>
//             </Tooltip>
//           );
//         }
//       },
//       {
//         header: 'Status',
//         accessorKey: 'status',
//         cell: (props) => {
//           const val = props.getValue();
//           const color = val === 'APPROVED' ? 'success' : val === 'REJECTED' ? 'error' : 'info';
//           return <Chip color={color} label={val} size="small" variant="light" />;
//         }
//       },
//       {
//         header: 'Actions',
//         accessorKey: 'actions',
//         cell: ({ row }) => {
//           const isDisabled = row.original.status === 'APPROVED' || row.original.status === 'REJECTED';
//           return (
//             <Button size="small" variant="outlined" onClick={() => handleEdit(row.original)} disabled={isDisabled}>
//               Edit
//             </Button>
//           );
//         }
//       }
//     ],
//     []
//   );

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '70vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <LogoImageLoader />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//         <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
//           <ReactTable
//             data={data}
//             columns={columns}
//             title="Leave History"
//             onRequestLeave={handleOpenRequest}
//             onEdit={handleEdit}
//           />
//         </Box>

//         <Box sx={{ mt: 1 }}>
//           <TablePagination
//             getPageCount={() => Math.max(1, Math.ceil(totalCount / pageSize))}
//             setPageIndex={safeSetPageIndex}
//             setPageSize={safeSetPageSize}
//             getState={() => ({ pagination: { pageIndex, pageSize } })}
//             initialPageSize={pageSize}
//             labelRowsPerPage="Rows per page:"
//           />
//         </Box>
//       </Box>

//       <LeaveRequest open={openRequest} handleClose={handleCloseRequest} onSuccess={fetchLeaveData} />
//       {editRowData && (
//         <LeaveRequest
//           open={openEdit}
//           handleClose={handleCloseEdit}
//           onSuccess={fetchLeaveData}
//           initialData={editRowData}
//           mode="edit"
//         />
//       )}
//     </>
//   );
// }
import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
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
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { LeaveRequest } from './leaveRequest';
import { getLeaveHistory } from 'api/leave';
import { TablePagination } from 'components/third-party/react-table';
import { fontWeight } from '@mui/system';
import LogoImageLoader from 'components/PupilLoader';

// ==============================|| REACT TABLE COMPONENT ||============================== //

function ReactTable({ columns, data, title, onRequestLeave, onEdit }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderMobileCards = () => {
    if (!data || data.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="body1">No Data</Typography>
        </Box>
      );
    }

    return (
      <Stack spacing={2} sx={{ p: 2 }}>
        {data.map((row, index) => {
          const locked = row.status === 'APPROVED' || row.status === 'REJECTED';
          return (
            <Paper key={index} sx={{ p: 2 }}>
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
                <Button size="small" variant="outlined" onClick={() => onEdit?.(row)} disabled={locked}>
                  Edit
                </Button>
              </Stack>

              <Typography variant="body2">
                <strong>Applied From:</strong> {row.appliedFrom}
              </Typography>
              <Typography variant="body2">
                <strong>Applied To:</strong> {row.appliedTo}
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
          );
        })}
      </Stack>
    );
  };

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
          <TableContainer
            component={Paper}
            sx={{
              height: 'calc(100vh - 400px)',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            <Table
              size="small"
              sx={{
                '& tbody .MuiTableCell-root': { py: 1.2 },
                '& thead .MuiTableCell-root': { py: 1.25 }
              }}
            >
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
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={table.getVisibleLeafColumns().length} align="center">
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          pointerEvents: 'none' 
                        }}
                      >
                        <Typography variant="body1">No Data</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
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
  onRequestLeave: PropTypes.func,
  onEdit: PropTypes.func
};

// ==============================|| DENSE TABLE WRAPPER ||============================== //

export default function DenseTable() {
  const ORDERABLE = {
    appliedOn: 'createdAt',
    appliedFrom: 'startDate',
    appliedTo: 'endDate',
    leaveType: 'leaveType',
    actionedOn: 'actionedAt',
    actionedBy: 'actionBy',
    reason: 'reason',
    status: 'status'
  };

  const [openRequest, setOpenRequest] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [orderBy, setOrderBy] = useState(ORDERABLE.appliedOn);
  const [sortOrder, setSortOrder] = useState('asc');

  const [reasonOpen, setReasonOpen] = useState(false);
  const [reasonText, setReasonText] = useState('');

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

  const openReasonDialog = (text) => {
    if (!text) return;
    setReasonText(text);
    setReasonOpen(true);
  };
  const closeReasonDialog = () => setReasonOpen(false);

  const toNumber = (val, fallback) => {
    const n = typeof val === 'string' ? Number(val) : val;
    return Number.isFinite(n) ? n : fallback;
  };
  const safeSetPageIndex = (next) => {
    setPageIndex((prev) => Math.max(0, toNumber(typeof next === 'function' ? next(prev) : next, prev)));
  };
  const safeSetPageSize = (next) => {
    setPageSize((prev) => Math.max(1, toNumber(typeof next === 'function' ? next(prev) : next, prev)));
  };
  // useEffect(() => {
  //   safeSetPageIndex(0);
  // }, [pageSize]);

  const resetPaginationState = () => {
    setPageIndex(0);
    setPageSize(10);
    setTotalCount(0);
  };

  const fetchLeaveData = async () => {
    try {
      setLoading(true);

      const response = await getLeaveHistory({
        page: pageIndex + 1,
        take: pageSize,
        orderBy,
        sortOrder
      });

      const list = response?.data ?? [];
      const rows =
        list.map((item) => ({
          id: item.id,
          appliedFrom: new Date(item.startDate).toLocaleDateString(),
          appliedTo: new Date(item.endDate ?? item.startDate).toLocaleDateString(),
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

      const meta = response?.meta ?? {};
      const total = meta.itemCount ?? meta.totalItems ?? meta.total ?? rows.length;
      setTotalCount(total);
    } catch (error) {
      console.error('Error fetching leave data:', error);
      setData([]);
      // resetPaginationState();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, [pageIndex, pageSize, orderBy, sortOrder]);

  const SortHeader = ({ label, accessor }) => {
    const apiKey = ORDERABLE[accessor];
    const activeAsc = orderBy === apiKey && sortOrder === 'asc';
    const activeDesc = orderBy === apiKey && sortOrder === 'desc';

    const clickAsc = () => {
      if (!apiKey) return;
      setOrderBy(apiKey);
      setSortOrder('asc');
    };
    const clickDesc = () => {
      if (!apiKey) return;
      setOrderBy(apiKey);
      setSortOrder('desc');
    };

    const btnBaseSx = {
      p: 0,
      m: 0,
      width: 14,
      height: 14,
      minWidth: 0,
      lineHeight: 1,
      '& .MuiSvgIcon-root': { fontSize: 14 }
    };

    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <span>{label}</span>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <IconButton
            aria-label={`sort ${label} ascending`}
            size="small"
            disableRipple
            onClick={clickAsc}
            sx={{
              ...btnBaseSx,
              position: 'relative',
              top: 2,
              color: activeAsc ? 'common.black' : 'gray',
              opacity: activeAsc ? 1 : 0.4,
              fontWeight: activeAsc ? 900 : 400
            }}
          >
            <KeyboardArrowUpIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label={`sort ${label} descending`}
            size="small"
            disableRipple
            onClick={clickDesc}
            sx={{
              ...btnBaseSx,
              position: 'relative',
              bottom: 2,
              color: activeDesc ? 'common.black' : 'gray',
              opacity: activeDesc ? 1 : 0.4,
              fontWeight: activeDesc ? 900 : 400
            }}
          >
            <KeyboardArrowDownIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
    );
  };

  const columns = useMemo(
    () => [
      {
        header: <SortHeader label="Applied On" accessor="appliedOn" />,
        accessorKey: 'appliedOn'
      },
      {
        header: <SortHeader label="Applied From" accessor="appliedFrom" />,
        accessorKey: 'appliedFrom'
      },
      {
        header: <SortHeader label="Applied To" accessor="appliedTo" />,
        accessorKey: 'appliedTo'
      },
      {
        header: 'Leave Type',
        accessorKey: 'leaveType'
      },
      {
        header: <SortHeader label="Action Taken On" accessor="actionedOn" />,
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
            <Button
              variant="text"
              size="small"
              onClick={() => openReasonDialog(reason)}
              sx={{ textTransform: 'none', padding: '2px 6px', minWidth: 0 }}
            >
              <Tooltip title="Click to view full reason" arrow>
                {/* <span style={{ textDecoration: 'none', cursor: 'pointer' }}>{truncated}</span> */}
                See Reason
              </Tooltip>
            </Button>
          );
        }
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
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => {
          const isDisabled = row.original.status === 'APPROVED' || row.original.status === 'REJECTED';
          return (
            <Button size="small" variant="outlined" onClick={() => handleEdit(row.original)} disabled={isDisabled}>
              Edit
            </Button>
          );
        }
      }
    ],
    [orderBy, sortOrder]
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <ReactTable data={data} columns={columns} title="Leave History" onRequestLeave={handleOpenRequest} onEdit={handleEdit} />
        </Box>
        <Box sx={{ mt: 1 }}>
          <TablePagination
            getPageCount={() => {
              const known = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 0;
              return Math.max(1, known, pageIndex + 1);
            }}
            setPageIndex={safeSetPageIndex}
            setPageSize={safeSetPageSize}
            getState={() => ({ pagination: { pageIndex, pageSize } })}
            initialPageSize={pageSize}
            labelRowsPerPage="Rows per page:"
          />
        </Box>
      </Box>

      <Dialog
        open={reasonOpen}
        onClose={closeReasonDialog}
        PaperProps={{
          sx: {
            minWidth: 300,
            minHeight: 150
          }
        }}
      >
        <DialogTitle sx={{ pr: 6 }}>
          Reason
          <IconButton aria-label="close" onClick={closeReasonDialog} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" whiteSpace="pre-wrap" textAlign="center">
            {reasonText}
          </Typography>
        </DialogContent>
      </Dialog>

      <LeaveRequest open={openRequest} handleClose={handleCloseRequest} onSuccess={fetchLeaveData} />
      {editRowData && (
        <LeaveRequest open={openEdit} handleClose={handleCloseEdit} onSuccess={fetchLeaveData} initialData={editRowData} mode="edit" />
      )}
    </>
  );
}
