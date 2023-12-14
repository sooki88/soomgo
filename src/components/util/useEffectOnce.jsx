import { useEffect } from "react";

export const useEffectOnce = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};
