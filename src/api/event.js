import axiosServices from 'utils/axios';

export const getAllEvents = async () => {
  try {
    const api = `/event`;
    const response = await axiosServices.get(api);
    return response.data.data;
  } catch (e) {
    console.error('Error while fetching events:', e);
    // toast.error(e.response?.data?.message || 'Failed to fetch events');
    throw e;
  }
};
