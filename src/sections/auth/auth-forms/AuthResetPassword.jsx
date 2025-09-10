import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'api/snackbar';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// Add axios import here
import axiosServices from 'utils/axios';

// ============================|| FIREBASE - RESET PASSWORD ||============================ //
const resetPassword = async (newPassword, token) => {
  try {
    const response = await axiosServices.post('/auth/reset-password', {
      newPassword,
      token
    });

    // Make sure to check if the response status and response data are as expected
    if (response.status === 200 && response.data?.success) {
      return { success: true, message: response.data.message || 'Password reset successfully' };
    }

    return { success: false, message: response.data?.message || 'Unexpected response from server' };
  } catch (error) {
    console.error('Error resetting password:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to reset password'
    };
  }
};

export default function AuthResetPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/^\S*$/, 'Password cannot contain whitespace'), // Disallow whitespace
          confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Both Passwords must match!') // Ensures passwords match
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const token = window.localStorage.getItem('resetToken');
            const response = await resetPassword(values.password, token);

            // Log the response to ensure you're getting the expected result
            console.log('Reset password response: ', response);

            // Check if the response message includes "Password reset successfully" (even if success is false)
            if (response.message.toLowerCase().includes('password reset successfully')) {
              setStatus({ success: true });
              setSubmitting(false);

              // Show success snackbar
              openSnackbar({
                open: true,
                message: 'password reset successfully" ',
                variant: 'alert',
                alert: {
                  color: 'success'
                }
              });

              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            } else {
              setStatus({ success: false, errorMessage: response.message || 'Failed to reset password.' });
              setSubmitting(false);

              openSnackbar({
                open: true,
                message: response.message || 'Failed to reset password.',
                variant: 'alert',
                alert: {
                  color: 'error'
                }
              });
            }
          } catch (err) {
            console.error(err);

            setStatus({ success: false, errorMessage: err.message || 'An unexpected error occurred.' });
            setSubmitting(false);

            openSnackbar({
              open: true,
              message: err.message || 'An unexpected error occurred.',
              variant: 'alert',
              alert: {
                color: 'error'
              }
            });
          }
        }}
      >
        {({ status, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Status Messages */}
              {status && status.success && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="success">
                    Password reset successfully! Please check your email.
                  </Typography>
                </Grid>
              )}
              {status && status.errorMessage && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error">
                    {status.errorMessage}
                  </Typography>
                </Grid>
              )}

              {/* Password Field */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-reset">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-reset"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-reset">
                    {errors.password}
                  </FormHelperText>
                )}
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>

              {/* Confirm Password Field */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirm-password-reset">Confirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    id="confirm-password-reset"
                    type="password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter confirm password"
                  />
                </Stack>
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="helper-text-confirm-password-reset">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </Grid>

              {/* Submit Button */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Reset Password
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
