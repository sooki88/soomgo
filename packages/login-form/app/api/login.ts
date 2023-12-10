class Fetcher {
  static baseUrl = process.env.BASE_URL;

  static baseHeader = {
    "Content-Type": "application/json",
  };

  static action = async <Return, Data>(
    method: "get" | "post" | "patch" | "put" | "delete",
    path: string,
    data: Data
  ): Promise<Return> => {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.baseHeader,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return result as Return;
  };

  static async get<Return, Data>(path: string, data: Data): Promise<Return> {
    return this.action("get", path, data);
  }

  static post<Return, Data>(path: string, data: Data): Promise<Return> {
    return this.action("post", path, data);
  }

  static patch<Return, Data>(path: string, data: Data): Promise<Return> {
    return this.action("patch", path, data);
  }

  static put<Return, Data>(path: string, data: Data): Promise<Return> {
    return this.action("put", path, data);
  }

  static delete<Return, Data>(path: string, data: Data): Promise<Return> {
    return this.action("delete", path, data);
  }
}

export const checkEmail = (email: string) => {};

export const signIn = (data: { email: string; password: string }) => {
  Fetcher.post("/sign-in", data);
};
