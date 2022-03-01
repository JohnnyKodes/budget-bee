import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage("darkMode", false);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
