import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const FetchAllAssignments = async (page = 1, take = '25', searchQuery = '', sortOrder = 'asc', status='') => {
  try {
    let api = `/assignments?page=${page}&take=${take}&sortOrder=${sortOrder}&status=${status}`;

    if (searchQuery) {
      api += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }

    const data = await axiosServices.get(api);
    return data.data;
  } catch (e) {
    console.error('Error fetching Assignments:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch assignments');
    throw e;
  }
};
export const FetchAssignmentDetails = async (assignmentId) => {
  try {
    const api = `/assignments/${assignmentId}`;
    const response = await axiosServices.get(api);

    return response.data.data;
  } catch (e) {
    console.error('Error fetching assignment details:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch assignment details');
    throw e;
  }
};