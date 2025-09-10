import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

// third-party
import OtpInput from 'react18-input-otp';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { ThemeMode } from 'config';
import { openSnackbar } from 'api/snackbar';
import axiosServices from 'utils/axios';
import { verifyInvitationCode } from 'api/authentication';
import JWTContext from 'contexts/JWTContext';
export default function AuthCodeVerification({ codeVerificationFor }) {
  const { verifyOtp } = useContext(JWTContext);
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [timer, setTimer] = useState(15);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const navigate = useNavigate();
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;

  const NUM_INPUTS = 6;

  const sanitizeOtp = (value) => value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const sendOtp = async (email) => {
    const response = await axiosServices.post('/auth/forgot-password', { email });
    return response.data;
  };
  const handleSubmit = async () => {
    try {
      const cleaned = sanitizeOtp(otp);

      if (!cleaned) {
        openSnackbar({ open: true, message: 'Please enter the OTP.', variant: 'alert', alert: { color: 'error' } });
        return;
      }

      if (!/^[A-Z0-9]+$/.test(cleaned)) {
        openSnackbar({
          open: true,
          message: 'OTP should contain only letters and numbers.',
          variant: 'alert',
          alert: { color: 'error' }
        });
        return;
      }
      if (codeVerificationFor === 'forgotPassword') {
        await verifyOtp (cleaned);
        openSnackbar({
          open: true,
          message: 'OTP verified! Please set a new password.',
          variant: 'alert',
          alert: { color: 'success' }
        });
        navigate('/reset-password'); 
      } else {
        const resp = await verifyInvitationCode(cleaned);
        const data = resp?.data;
        openSnackbar({ open: true, message: 'OTP verified!', variant: 'alert', alert: { color: 'success' } });
        navigate('/register', { state: { data } });
      }


    }
     catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'Invalid OTP. Please try again.',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  const handleResendOtp = async () => {
    try {
      openSnackbar({ open: true, message: 'Resending OTP...', variant: 'alert', alert: { color: 'info' } });

      setIsResendEnabled(false);
      setTimer(15);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendEnabled(true);
            return 15;
          }
          return prev - 1;
        });
      }, 1000);

      setCountdownInterval(interval);

      const email = localStorage.getItem('ResendEmail');
      if (email) {
        await sendOtp(email);
      } else {
        openSnackbar({ open: true, message: 'Email not found in localStorage.', variant: 'alert', alert: { color: 'error' } });
      }
    } catch {
      openSnackbar({ open: true, message: 'Failed to resend OTP. Please try again.', variant: 'alert', alert: { color: 'error' } });
    }
  };

  useEffect(() => {
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [countdownInterval]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OtpInput
            value={otp}
            onChange={(val) => setOtp(sanitizeOtp(val))}
            numInputs={NUM_INPUTS}
            inputType="text"
            isInputNum={false}
            shouldAutoFocus
            containerStyle={{ justifyContent: 'space-between' }}
            inputStyle={{
              width: '100%',
              margin: '8px',
              padding: '10px',
              border: '1px solid',
              borderColor: borderColor,
              borderRadius: 4
            }}
            focusStyle={{
              outline: 'none',
              boxShadow: theme.customShadows?.primary,
              border: '1px solid',
              borderColor: theme.palette.primary.main
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation fullWidth size="large" type="button" variant="contained" onClick={handleSubmit}>
              Continue
            </Button>
          </AnimateButton>
        </Grid>
        {codeVerificationFor === 'forgotPassword' && (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
              <Typography>Not received Code?</Typography>
              <Typography
                variant="body1"
                sx={{
                  minWidth: 85,
                  ml: 2,
                  cursor: isResendEnabled ? 'pointer' : 'not-allowed',
                  color: '#4680ff'
                }}
                onClick={isResendEnabled ? handleResendOtp : undefined}
              >
                {isResendEnabled ? 'Resend code' : `Resend in ${timer}s`}
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
