declare global {
  interface Window {
    env: {
      BASE_URL: string;
    };
  }
}

interface Result<T> {
  status: number;
  data: T;
}

export class Fetcher {
  static baseUrl = typeof window !== "undefined" ? window.env.BASE_URL : "";

  static baseHeader = {
    "Content-Type": "application/json",
  };

  static action = async <Return, Data>(
    method: "get" | "post" | "patch" | "put" | "delete",
    path: string,
    body: Data
  ): Promise<Result<Return>> => {
    const response = (await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.baseHeader,
      body: JSON.stringify(body),
    }).catch((error) => {
      return error;
    })) as Response;

    const data = await response.json();

    return {
      status: response.status,
      data,
    } as Result<Return>;
  };

  static async get<Return>(
    path: string,
    data: unknown
  ): Promise<Result<Return>> {
    return this.action("get", path, data);
  }

  static post<Return>(path: string, data: unknown): Promise<Result<Return>> {
    return this.action("post", path, data);
  }

  static patch<Return>(path: string, data: unknown): Promise<Result<Return>> {
    return this.action("patch", path, data);
  }

  static put<Return>(path: string, data: unknown): Promise<Result<Return>> {
    return this.action("put", path, data);
  }

  static delete<Return>(path: string, data: unknown): Promise<Result<Return>> {
    return this.action("delete", path, data);
  }
}
