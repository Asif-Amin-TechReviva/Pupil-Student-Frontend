// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthCodeVerification from 'sections/auth/auth-forms/AuthCodeVerification';

// ================================|| CODE VERIFICATION ||================================ //

export default function CodeVerification() {
  const location = useLocation();
  const { codeVerificationFor } = location?.state || {};
  let email = window.localStorage.getItem('ResendEmail');
  let finalArr = [];

  if (email) {
    let emailSplit = email.split('');
    let len = emailSplit.indexOf('@');
    emailSplit.forEach((item, pos) => {
      pos >= 1 && pos <= len - 2 ? finalArr.push('*') : finalArr.push(emailSplit[pos]);
    });
  }
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography>Please enter the code you received in your email.</Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography>We`ve send you code on {email && finalArr.length > 0 ? finalArr.join('') : '****'}</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <AuthCodeVerification codeVerificationFor={codeVerificationFor} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
