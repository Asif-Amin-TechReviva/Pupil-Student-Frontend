import { toast } from 'react-toastify';
import axiosServices from 'utils/axios';

// export const getExaminations = async () => {
//     try {
//       const response = await axiosServices.get('/examination');
  
//       return {
//         data: response.data.data.data,
//         pageCount: response.data.data.meta.pageCount || 0
//       };
//     } catch (error) {
//       console.error('Error fetching examinations:', error);
//       throw new Error(error.response?.data?.message || 'Error fetching examinations');
//     }
//   };

export const getExaminations = async ({ take, page, sortOrder,  startDate, endDate, searchQuery }) => {
    try {
      const response = await axiosServices.get('/examination', {
        params: {
          take,
          page,
          sortOrder,
          startDate,
          endDate,
          searchQuery
        }
      });
  
      return {
        data: response.data.data.data,
        pageCount: response.data.data.meta.pageCount || 0
      };
    } catch (error) {
      console.error('Error fetching examinations:', error);
      throw new Error(error.response?.data?.message || 'Error fetching examinations');
    }
  };
  export const getExamResultDetails = async (id) => {
    try {
      const response = await axiosServices.get(`/examination/${id}/result`);
      return response.data.data.data;
    } catch (error) {
      console.error('Error fetching exam results:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch exam results');
      throw new Error(error.response?.data?.message || 'Error fetching exam results');
    }
  };