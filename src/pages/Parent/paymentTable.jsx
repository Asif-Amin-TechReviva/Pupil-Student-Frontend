import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CSVExport, DebouncedInput, EmptyTable, TablePagination } from 'components/third-party/react-table';
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { FetchPaymentDetails } from 'api/allPayments';
import LogoImageLoader from 'components/PupilLoader';

const PaymentTable = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0); 

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const theme = useTheme();

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const id = sessionStorage.getItem('studentId');
      if (!id) throw new Error('No student ID found.');

      const data = await FetchPaymentDetails(id, pageIndex + 1, pageSize, globalFilter);
      setPaymentDetails(data.data || []);
      setTotalRows(data?.meta?.pageCount); 
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [pageIndex, pageSize, globalFilter]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString()
      },
      {
        accessorKey: 'amountPaid',
        header: 'Amount Paid',
        cell: (info) => `₹${info.getValue()}`
      },
      {
        accessorKey: 'amountDue',
        header: 'Amount Due',
        cell: (info) => `₹${info.getValue()}`
      },
      {
        accessorKey: 'balance',
        header: 'Balance',
        cell: (info) => `₹${info.getValue()}`
      },
      {
        accessorKey: 'mode',
        header: 'Mode'
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks'
      }
    ],
    []
  );

  const table = useReactTable({
    data: paymentDetails,
    columns,
    state: { globalFilter, pagination: { pageIndex, pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy', // Replace with your filter function
    manualPagination: true, // Enable server-side pagination
    pageCount: Math.ceil(totalRows / pageSize)
  });

  const headers = columns.map((col) => ({
    label: col.header,
    key: col.accessorKey
  }));
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
    <Paper>
      <Stack mt={3} direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${totalRows} records...`}
        />
        <CSVExport data={table.getRowModel().rows.map((row) => row.original)} headers={headers} filename="payments.csv" />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Loading payment details...
                </TableCell>
              </TableRow>
            ) : paymentDetails.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <EmptyTable msg="No Payment Details Available" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2 }}>
        <TablePagination
          getPageCount={() => Math.ceil(totalRows)}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          getState={() => ({
            pagination: { pageIndex, pageSize }
          })}
          initialPageSize={10}
        />
      </Box>
    </Paper>
  );
};

export default PaymentTable;
