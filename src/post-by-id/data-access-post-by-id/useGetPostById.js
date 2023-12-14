import { useCallback, useEffect } from "react";
import { axiosInstance } from "../../components/util/axiosInstance";
import { useAsync } from "../../components/util/useAsync";

export const useGetPostById = (selectedId) => {
  const queryString = `recipients/${selectedId}/messages/`;
  const getData = useCallback(() => {
    return axiosInstance.get(`${queryString}`);
  }, [queryString]);

  const { data, execute, loading, error } = useAsync(getData);

  useEffect(() => {
    execute();
  }, [selectedId]);

  return { data, loading, error };
};
