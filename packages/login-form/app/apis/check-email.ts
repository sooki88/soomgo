import { useApi } from "@login-form/hooks/use-api";
import { Fetcher } from ".";

export const checkEmail = async (email: string) => {
  return await Fetcher.post<string>("/check-email", { email });
};

export const useCheckEmail = (email: string) => {
  return useApi(checkEmail, email);
};
