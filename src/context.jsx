import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("puppies");

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newTheme);
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleTheme, setSearchTerm, searchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
