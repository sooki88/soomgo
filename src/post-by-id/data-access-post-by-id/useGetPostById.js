import { axiosInstance } from "../../components/util/axiosInstance";
import { useAsync } from "../../components/util/useAsync";

export const getPostById = (recipientId) => {
  const queryString = `recipients/${recipientId}/messages/`;

  return () => axiosInstance.get(`${queryString}`);
};

export const useGetPostById = (recipientId) => {
  return useAsync(getPostById(recipientId));
};
