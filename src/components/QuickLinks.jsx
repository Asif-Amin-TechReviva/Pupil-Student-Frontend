import React from 'react'
import Typography from '@mui/material/Typography';
import {  Grid } from "@mui/material";
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from "sections/widget/chart/EcommerceDataChart";
import { ArrowDown, ArrowUp, Book, Calendar, CloudChange, Wallet3 } from 'iconsax-react';
import { useTheme } from '@mui/material/styles';
const QuichLinks = () => {
const theme = useTheme()

  return (
    <Grid container spacing={3} >
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Form Teacher"
      count="$3000"
      iconPrimary={<Wallet3 />}
      percentage={
        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.primary.main} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Track Assignments"
      count="290+"
      color="warning"
      iconPrimary={<Book color={theme.palette.warning.dark} />}
      percentage={
        <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowDown size={16} style={{ transform: 'rotate(-45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.warning.dark} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Last Feedback"
      count="1,568"
      color="success"
      iconPrimary={<Calendar color={theme.palette.success.darker} />}
      percentage={
        <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.success.darker} />
    </EcommerceDataCard>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <EcommerceDataCard
      title="Announcements"
      count="$200"
      color="error"
      iconPrimary={<CloudChange color={theme.palette.error.dark} />}
      percentage={
        <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 30.6%
        </Typography>
      }
    >
      <EcommerceDataChart color={theme.palette.error.dark} />
    </EcommerceDataCard>
  </Grid>
</Grid>
  )
}

export default QuichLinks