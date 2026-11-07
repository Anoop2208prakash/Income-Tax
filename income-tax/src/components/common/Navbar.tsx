
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.scss";

interface NavItem {
  name: string;
  path: string;
}

const navLinks: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Acts & Laws", path: "/acts-laws" },
  { name: "Tax Calculator", path: "/tax-calculator" },
  { name: "Knowledge Base", path: "/knowledge-base" },
  { name: "Income Tax Forms", path: "/tax-forms" },
  { name: "Help", path: "/help" },
];

type Theme = "light" | "dark";

const Navbar = () => {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("income-tax-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "light";
  });

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Logo error state
  const [logoError, setLogoError] = useState(false);

  // Apply theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("income-tax-theme", theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Theme icon
  const isDark = theme === "dark";

  return (
    <header className="main-navbar">
      <div className="navbar-container">

        {/* BRAND SECTION */}

        <NavLink
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          <div className="navbar-logo">
            {!logoError ? (
              <img
                src="/images/income-tax-logo.png"
                alt="Income Tax Portal Logo"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="logo-fallback">₹</span>
            )}
          </div>

          <div className="brand-details">
            <h2>Income Tax Portal</h2>
            <p>Government Style Professional Interface</p>
          </div>
        </NavLink>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className={`mobile-menu-toggle ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAVIGATION LINKS */}

        <nav
          className={`navbar-navigation ${
            menuOpen ? "show" : ""
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* CHANGE THEME BUTTON */}

          <button
            type="button"
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            aria-label={`Switch to ${
              isDark ? "light" : "dark"
            } mode`}
            title={`Switch to ${
              isDark ? "light" : "dark"
            } mode`}
          >
            <span className="theme-icon">
              {isDark ? "☀" : "☾"}
            </span>

            <span className="theme-label">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;
