import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

// third-party
import ReactApexChart from 'react-apexcharts';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import MoreIcon from 'components/@extended/MoreIcon';
import { ThemeMode } from 'config';

// assets
import { ArrowUp } from 'iconsax-react';

// Dynamic chart labels
const chartLabels = [
  'Total Unpaid Monthly Fee',
  'Total Unpaid Months',
  'Total Unpaid Bus Fee',
  'Total OTP',
  'Total Discount',
  'Balance'
];

// chart options
const pieChartOptions = {
  chart: {
    type: 'donut',
    height: 320
  },
  labels: chartLabels, // Dynamic labels
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  }
};

// ==============================|| CHART ||============================== //

function ApexDonutChart({ series, options }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div id="chart">
      {series.length === 0 ? (
        <Typography variant="h6" align="center">
          No Pending Fee
        </Typography>
      ) : (
        <ReactApexChart options={options} series={series} type="donut" height={downSM ? 280 : 320} />
      )}
    </div>
  );
}

// ==============================|| CHART WIDGETS - TOTAL INCOME ||============================== //

export default function TotalIncome() {
  const [feeData, setFeeData] = useState(null); // Initialize with null
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Fetch fee data on component mount
  useEffect(() => {
    const fetchFeeEnquiry = async () => {
      try {
        let api = '/payment/student/my-enquiry';
        const response = await axiosServices.get(api);
        setFeeData(response.data.data); // Set feeData with the fetched data
      } catch (e) {
        console.error('Error fetching Fee enquiry:', e);
        toast.error(e.response?.data?.message || 'Failed to fetch payment enquiry');
      }
    };

    fetchFeeEnquiry();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  if (!feeData) {
    // Return a loading state or an empty component until feeData is available
    return <Typography>Loading...</Typography>;
  }

  // Dynamic chart series based on fee data
  const chartSeries = [
    feeData.totalUnPaidMonthlyFee || 0,
    feeData.totalUnPaidMonths || 0,
    feeData.totalUnPaidBusFee || 0,
    feeData.totalOTP || 0,
    feeData.totalDiscount || 0,
    feeData.balance || 0
  ];

  const theme = useTheme();
  const { primary, secondary, divider, background } = theme.palette;

  const pieChartOptions = {
    chart: {
      type: 'donut',
      height: 320
    },
    labels: chartLabels,
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    colors: [
      primary.main, // Primary
      secondary.main, // Secondary
      theme.palette.warning.main, // Warning
      theme.palette.success.main, // Success
      theme.palette.info.main, // Info
      theme.palette.error.main // Error
    ],
    xaxis: {
      labels: {
        style: {
          colors: [
            primary.main, 
            theme.palette.warning.main, 
            theme.palette.success.main, 
            theme.palette.primary[100], 
            theme.palette.info.main, 
            theme.palette.error.main
          ]
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: [primary.main]
        }
      }
    },
    grid: {
      borderColor: divider
    },
    stroke: {
      colors: [background.paper]
    },
    theme: {
      mode: theme.palette.mode === ThemeMode.DARK ? 'dark' : 'light'
    }
  };

  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">Pending Fee</Typography>
            <IconButton
              color="secondary"
              id="wallet-button"
              aria-controls={open ? 'wallet-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="wallet-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ 'aria-labelledby': 'wallet-button', sx: { p: 1.25, minWidth: 150 } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <ListItemButton onClick={handleClose}>Today</ListItemButton>
              <ListItemButton onClick={handleClose}>Weekly</ListItemButton>
              <ListItemButton onClick={handleClose}>Monthly</ListItemButton>
            </Menu>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ApexDonutChart series={chartSeries} options={pieChartOptions} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
            <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Dot componentDiv />
                <Typography>Total Unpaid Monthly Fee</Typography>
              </Stack>
              <Typography variant="subtitle1">₹ {feeData.totalUnPaidMonthlyFee}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6}>
        <MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
  <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Dot componentDiv />
      <Typography>Total Unpaid Bus Fee</Typography>
    </Stack>
    <Typography variant="subtitle1">₹ {feeData.totalUnPaidBusFee}</Typography>
  </Stack>
</MainCard>
</Grid>
<Grid item xs={12} sm={6}>
<MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
  <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Dot componentDiv />
      <Typography>Total One Time Payment</Typography>
    </Stack>
    <Typography variant="subtitle1">₹ {feeData.totalOTP}</Typography>
  </Stack>
</MainCard>
</Grid>
<Grid item xs={12} sm={6}>
<MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
  <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Dot componentDiv />
      <Typography>Total Discount</Typography>
    </Stack>
    <Typography variant="subtitle1">₹ {feeData.totalDiscount}</Typography>
  </Stack>
</MainCard>
</Grid>
<Grid item xs={12} sm={6}>
<MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
  <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Dot componentDiv />
      <Typography>Balance at Last Payment</Typography>
    </Stack>
    <Typography variant="subtitle1">₹ {feeData.balance}</Typography>
  </Stack>
</MainCard>
</Grid>
<Grid item xs={12} sm={6}>
<MainCard content={false} border={false} sx={{ bgcolor: 'background.default' }}>
  <Stack alignItems="flex-start" sx={{ p: 2 }} spacing={0.5}>
    <Stack direction="row" alignItems="center" spacing={1}>
      <Dot componentDiv />
      <Typography>Total Outstanding</Typography>
    </Stack>
    <Typography variant="subtitle1">₹ {feeData.grandTotal}</Typography>
  </Stack>
</MainCard>
</Grid>
      </Grid>
    </MainCard>
  );
}
