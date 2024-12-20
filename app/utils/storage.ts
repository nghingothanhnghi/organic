// app/utils/storage.ts
export const safeSessionStorage = {
    getItem: (key: string) => (typeof window !== "undefined" ? sessionStorage.getItem(key) : null),
    setItem: (key: string, value: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, value);
      }
    },
    removeItem: (key: string) => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
      }
    },
  };
  