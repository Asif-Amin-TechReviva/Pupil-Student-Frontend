import { useState, useContext } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { openSnackbar } from 'api/snackbar';
import { minLength } from 'utils/password-validation';
import { JWTContext } from 'contexts/JWTContext';
// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';
// assets
import { Eye, EyeSlash, Minus, TickCircle } from 'iconsax-react';

// ==============================|| ACCOUNT PROFILE - PASSWORD CHANGE ||============================== //

export default function TabPassword() {
  const { changePassword } = useContext(JWTContext);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <MainCard title="Change Password">
      <Formik
        initialValues={{
          old: '',
          password: '',
          confirm: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          old: Yup.string().required('Old Password is required'),
          password: Yup.string()
            .required('New Password is required')
            .notOneOf([Yup.ref('old')], 'New password cannot be the same as old password'),

          confirm: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], `Passwords don't match.`)
        })}
        onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await changePassword(values.old, values.password);

            if (response.success) {
              openSnackbar({
                open: true,
                message: response.message,
                variant: 'alert',
                alert: { color: 'success' }
              });

              // Reset the form after successful submission
              resetForm();
            } else {
              openSnackbar({
                open: true,
                message: response.message || 'Failed to change password',
                variant: 'alert',
                alert: { color: 'error' }
              });
            }

            return response.data;
          } catch (error) {
            openSnackbar({
              open: true,
              message: 'An error occurred while changing the password.',
              variant: 'alert',
              alert: { color: 'error' }
            });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, resetForm }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Old Password Field */}
              <Stack spacing={1}>
                <InputLabel htmlFor="password-old">Old Password</InputLabel>
                <OutlinedInput
                  id="password-old"
                  placeholder="Enter Old Password"
                  type={showOldPassword ? 'text' : 'password'}
                  value={values.old}
                  name="old"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showOldPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-old"
                />
                {touched.old && errors.old && <FormHelperText error>{errors.old}</FormHelperText>}
              </Stack>

              {/* New Password Field */}
              <Stack spacing={1}>
                <InputLabel htmlFor="password-password">New Password</InputLabel>
                <OutlinedInput
                  id="password-password"
                  placeholder="Enter New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showNewPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-password"
                />
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </Stack>

              {/* Confirm Password Field */}
              <Stack spacing={1}>
                <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
                <OutlinedInput
                  id="password-confirm"
                  placeholder="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirm}
                  name="confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                        color="secondary"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="password-confirm"
                />
                {touched.confirm && errors.confirm && <FormHelperText error>{errors.confirm}</FormHelperText>}
              </Stack>

              {/* New Password Requirements */}
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" mb={2}>
                  New Password must contain:
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" color={minLength(values.password) ? 'success' : 'default'}>
                      {minLength(values.password) ? <TickCircle /> : <Minus />}
                    </IconButton>
                    <Typography variant="body2">At least 8 characters</Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Buttons */}
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button variant="outlined" color="secondary" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                  Update Password
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
