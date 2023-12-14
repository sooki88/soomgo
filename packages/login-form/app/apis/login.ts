import { Fetcher } from ".";

interface Response {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const signIn = async (data: { email: string; password: string }) => {
  return await Fetcher.post<Response>("/sign-in", data);
};
