import axiosServices from 'utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FetchFeeEnquiry = async () => {
  try {
    let api = `/payment/student/my-enquiry`;

    const data = await axiosServices.get(api);

    return data;
  } catch (e) {
    console.error('Error fetching Fee enquiry:', e);
    toast.error(e.response?.data?.message || 'Failed to fetch payment enquiry');
    throw e;
  }
};

export const FetchPaymentDetails = async (id, page = 1, take = 10, searchQuery = '', sortOrder = 'asc') => {
  try {
    const api = `/payment/${id}?page=${page}&take=${take}&searchQuery=${searchQuery}&sortOrder=${sortOrder}`;
    const response = await axiosServices.get(api);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    toast.error(error.response?.data?.message || 'Failed to fetch payment details');
    throw error;
  }
};

