import { useEffect, useState } from "react";

// อ่านค่าจาก localStorage อย่างปลอดภัย (JSON พัง / ถูกบล็อก -> ใช้ค่าเริ่มต้น)
function read(key, fallback, isValid) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function useLocalStorage(key, fallback, isValid = () => true) {
  const [value, setValue] = useState(() => read(key, fallback, isValid));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* โควตาเต็ม / private mode: ข้ามไป แอปยังทำงานได้ */
    }
  }, [key, value]);

  return [value, setValue];
}
