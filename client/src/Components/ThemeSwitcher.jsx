import { React, useContext } from "react";
import { ThemeContext } from "../context/ProviderTheme";
function ThemeSwitcher() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default ThemeSwitcher;
