import { React, useReducer, createContext, useState } from "react";
const lightTheme = {
  backgroundColor: "white",
  color: "black",
};

const darkTheme = {
  backgroundColor: "black",
  color: "white",
};
export const ThemeContext = createContext(lightTheme); // Default theme
function ProviderTheme({ children }) {
  function themeReducer(state, action) {
    switch (action.type) {
      case "TOGGLE_THEME":
        return state === lightTheme ? darkTheme : lightTheme;
      default:
        return state;
    }
  }

  const [theme, dispatch] = useReducer(themeReducer, lightTheme);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ProviderTheme;
