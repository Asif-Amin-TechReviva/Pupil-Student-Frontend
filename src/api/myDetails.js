import axiosServices from 'utils/axios';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FetchStudentDetails = async () => {
  try {
    const api = `/student/me`;
    const response = await axiosServices.get(api);
    return response.data.data;
  } catch (e) {
    console.error('Error fetching student details:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch student details');
    throw e;
  }
};
export const UpdateStudent = async (payload) => {
  try {
    const api = `/student/update`; 
    const response = await axiosServices.post(api, payload); 
    toast.success('Student profile updated successfully');
    return response.data.data;
  } catch (e) {
    console.error('Error updating student profile:', e);
    toast.error(e.response?.data?.message || 'Failed to update student profile');
    throw e;
  }
};
export const AddSocialMediaAccount = async (payload) => {
  try {
    const api = `/user/social-media`;
    const response = await axiosServices.post(api, payload);
    toast.success('Social media account added successfully');
    return response.data.data;
  } catch (e) {
    console.error('Error adding social media account:', e);
    toast.error(e.response?.data?.message || 'Failed to add social media account');
    throw e;
  }
};

export const UpdateSocialMediaAccount = async (id, payload) => {
  try {
    const api = `/user/social-media/${id}`;
    const response = await axiosServices.put(api, payload);
    toast.success('Social media account updated successfully');
    return response.data.data;
  } catch (e) {
    console.error('Error updating social media account:', e);
    toast.error(e.response?.data?.message || 'Failed to update social media account');
    throw e;
  }
};

export const DeleteSocialMediaAccount = async (id) => {
  try {
    const api = `/user/social-media/${id}`;
    const response = await axiosServices.delete(api);
    toast.success('Social media account removed successfully');
    return response.data.data;
  } catch (e) {
    console.error('Error deleting social media account:', e);
    toast.error(e.response?.data?.message || 'Failed to remove social media account');
    throw e;
  }
};



export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://api.lx-medical.staging.techreviva.com/v1/users/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading report:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload report');
  }
};

export const fetchMyAttendance = async ({ startDate, endDate, status, subjectId }) => {
  try {
    const response = await axiosServices.get('/attendance/view', {
      params: {
        startDate,
        endDate,
        status,
        subjectId
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    throw new Error(error.response?.data?.message || 'Error fetching attendance records');
  }
};
