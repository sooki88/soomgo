import { useCallback, useEffect } from "react";
import { axiosInstance } from "../../components/util/axiosInstance";
import { useAsync } from "../../components/util/useAsync";

export const useGetPostById = (recipientId) => {
  const queryString = `recipients/${recipientId}/messages/`;

  //질문1 : useCallback을 안쓰면 코드가 제대로 작동이 안되던데 왜 그런가요?
  const getAxios = useCallback(
    () => axiosInstance.get(`${queryString}`),
    [queryString]
  );

  const { execute, data, loading, error } = useAsync(getAxios);

  // 질문2: 왜 useAsync(getAxios)로 받은 data, loaing, error를 바로 return 하지 않나요?
  // 질문3: useAsync안에 이미 useEffect가 있는데 왜 여기에 또 useEffect를 사용해야하나요?
  useEffect(() => {
    execute();
  }, [recipientId]);

  return { data, loading, error };
};
