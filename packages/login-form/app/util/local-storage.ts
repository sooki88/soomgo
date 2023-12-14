interface LocalStorage {
  key: string;
  get: () => string | null;
  set: (value: string) => void;
  delete: () => void;
}

export const accessToken: LocalStorage = {
  key: "accessToken",
  get() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(this.key);
  },
  set(value: string) {
    localStorage.setItem(this.key, value);
  },
  delete() {
    localStorage.removeItem(this.key);
  },
};

export const localStorageUtil = {
  accessToken,
};
