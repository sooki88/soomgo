import { useState } from "react";
import { useEffectOnce } from "./useEffectOnce";

export const useAsync = (asyncFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async () => {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response?.data);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffectOnce(execute);

  return { data, loading, error, execute };
};
