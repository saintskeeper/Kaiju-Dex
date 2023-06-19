import React, { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<String | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggle = () => {
    setTheme((prevValue) => {
      if (prevValue === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };

  return [theme, toggle] as const;
};

export default useTheme;
