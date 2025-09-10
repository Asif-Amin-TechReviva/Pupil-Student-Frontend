import { createContext, useEffect, useReducer } from 'react';
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { toast } from 'react-toastify';

const chance = new Chance();

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  return decoded;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && verifyToken(accessToken)) {
          setSession(accessToken);
          const userDetailsString = sessionStorage.getItem('user');
          const user = userDetailsString ? JSON.parse(userDetailsString) : null;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (schoolId, password) => {
    try {
      const response = await axios.post('/student/login', {
        schoolId,
        password
      });

      const accessToken = response.data.data.accessToken;
      const user = response.data.data.user;
      const id = response.data.data.user.id;

      sessionStorage.setItem('studentId', id);
      sessionStorage.setItem('user', JSON.stringify(user));

      setSession(accessToken);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user
        }
      });

      console.log(user);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const register = async (email, password, firstName, lastName) => {
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = async (user) => {
    try {
      const response = await axios.post('/user/logout', { user });
      sessionStorage.removeItem('studentId');
      sessionStorage.removeItem('user');
      localStorage.removeItem('accessToken');

      const accessToken = response.data.data.accessToken;
      setSession(null);
      dispatch({
        type: LOGOUT,
        payload: {
          isLoggedIn: false,
          user
        }
      });
      toast.success('Logged out successfully!');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.response?.data?.message || 'Logout failed. Please try again.');
      throw err;
    }
  };

  const sendOtp = async (email) => {
    window.localStorage.setItem('ResendEmail', email);

    try {
      const response = await axios.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
  const verifyOtp = async (OTP) => {
    try {
      const response = await axios.post('/auth/verify-otp', {
        OTP
      });
      window.localStorage.setItem('resetToken', response.data.data.token);
      return response.data;
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      throw error;
    }
  };
  const resetPassword = async (newPassword, token) => {
    try {
      const response = await axios.post('/auth/reset-password', {
        newPassword,
        token
      });

      if (response.status === 200) {
        return { success: true };
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: error.response?.message || 'Failed to reset password' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await axios.post('/auth/change-password', {
        currentPassword,
        newPassword
      });

      // Check if the response indicates success
      if (response.data.success) {
        return { success: true, message: response.data.message }; // Password changed successfully
      } else {
        // Handle if success is false (even though this may not happen here)
        return { success: false, message: response.data.message || 'Failed to change password' };
      }
    } catch (error) {
      console.error('Error changing password:', error);

      // Handle error cases (e.g., incorrect current password)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to change password';

      return { success: false, message: errorMessage }; // Return failure with error message
    }
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, verifyOtp, sendOtp, logout, register, resetPassword, updateProfile, changePassword }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
