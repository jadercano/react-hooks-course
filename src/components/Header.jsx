import { useState } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="Header">
      <h1>React Hooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Header;
