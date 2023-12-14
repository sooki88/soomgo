import { useCallback, useEffect, useState } from "react";

export function useApi<Return, Parmas>(
  api: (params: Parmas) => Promise<Return>,
  body: Parmas
) {
  const [response, setResponse] = useState<Return>();
  const fetcher = useCallback(
    (body: Parmas) => {
      setResponse(undefined);
      api(body).then((value) => setResponse(value));
    },
    [api]
  );

  useEffect(() => {
    fetcher(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    response,
    refetch: fetcher,
  };
}
