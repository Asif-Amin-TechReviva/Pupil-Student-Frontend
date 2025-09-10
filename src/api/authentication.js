import { toast } from "react-toastify";
import axiosServices from "utils/axios";
export const verifyInvitationCode = async (OTP) => {
  try {
    const response = await axiosServices.post('/auth/verify-invitation', { OTP });
    toast.success('OTP verified successfully');
    return response.data;
  } catch (error) {
    const message = error?.message || 'Error in verifying OTP';
    toast.error(message);
    console.error('Error in verifying OTP:', error);
    throw new Error(message);
  }
};