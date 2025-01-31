import "../../public/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark", !isDarkTheme);
  };

  return (
    <div className="header flex justify-between items-center bg-[var(--secondary-color)] p-12 gap-2">
      <div className="logo-container flex items-center gap-2">
        <img src="./public/logo.svg" className="w-10 h-10" alt="Logo" />
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Potify <span className="text-sm">®</span>
        </h1>
      </div>
      <div className="theme-toggle">
        <button type="button" className="theme-button text-[var(--primary-color)] text-xl" onClick={toggleTheme}>
          <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
        </button>
      </div>
    </div>
  );
};

export default Header;
