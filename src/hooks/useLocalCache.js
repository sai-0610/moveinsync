import { useState, useEffect } from "react";

export default function useLocalCache(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
