
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import logo from "../assets/logo.png";

const navClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function HeaderSkeleton() {
  return (
    <header className="portal-header portal-header-skeleton">
      <div className="portal-header-container portal-navbar">
        <div className="portal-brand">
          <Skeleton
            variant="rounded"
            width={52}
            height={52}
            sx={{ borderRadius: "8px" }}
          />

          <div className="portal-brand-text">
            <Skeleton width={175} height={27} />
            <Skeleton width={205} height={17} />
          </div>
        </div>

        <div className="portal-nav-skeleton">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Skeleton
              key={item}
              variant="rounded"
              width={item === 3 ? 100 : 75}
              height={38}
              sx={{ borderRadius: "5px" }}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Header({ loading }) {
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    // Use the Layout loading state when provided.
    if (loading !== undefined) return;

    const timer = window.setTimeout(() => {
      setInternalLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [loading]);

  const isLoading =
    loading !== undefined ? loading : internalLoading;

  return (
    <>
      <HeaderStyles />

      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <header className="portal-header">
          {/* MAIN NAVBAR */}
          <div className="portal-header-container portal-navbar">

            {/* BRAND */}
            <Link to="/" className="portal-brand">
              <div className="portal-logo-wrap">
                <img
                  src={logo}
                  alt="Income Tax Portal Logo"
                  className="portal-brand-logo"
                />
              </div>

              <div className="portal-brand-text">
                <h1>Income Tax Portal</h1>
                <p>Information and Services</p>
              </div>
            </Link>

            {/* NAVIGATION */}
            <nav
              className="portal-nav-menu"
              aria-label="Main navigation"
            >
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>

              <NavLink to="/about" className={navClass}>
                About Us
              </NavLink>

              <NavLink to="/acts-laws" className={navClass}>
                Acts & Laws
              </NavLink>

              <NavLink to="/tax-calculator" className={navClass}>
                Tax Calculator
              </NavLink>

              <NavLink to="/E-Tutorial" className={navClass}>
                Knowledge Base
              </NavLink>

              <NavLink to="/forms" className={navClass}>
                Income Tax Forms
              </NavLink>

              <NavLink to="/help" className={navClass}>
                Help
              </NavLink>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

function HeaderStyles() {
  return (
    <style>{`
      /* HEADER */

      .portal-header {
        --header-primary: #71C9CE;
        --header-highlight: #A6E3E9;
        --header-secondary: #CBF1F5;
        --header-background: #E3FDFD;
        --header-text: #173D43;
        --header-muted: #647C80;
        --header-border: #D5EDEF;

        position: relative;
        z-index: 1000;
        width: 100%;
        background: #FFFFFF;
        color: var(--header-text);
        border-bottom: 1px solid var(--header-border);
      }

      .portal-header *,
      .portal-header *::before,
      .portal-header *::after {
        box-sizing: border-box;
      }

      .portal-header a {
        text-decoration: none;
      }

      .portal-header-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding-left: 28px;
        padding-right: 28px;
      }

      /* MAIN NAVBAR */

      .portal-navbar {
        min-height: 82px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 28px;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      /* BRAND */

      .portal-brand {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        gap: 12px;
        min-width: 230px;
        color: var(--header-text);
      }

      .portal-logo-wrap {
        display: grid;
        place-items: center;
        width: 52px;
        height: 52px;
        flex-shrink: 0;
        overflow: hidden;
        border: 1px solid #E4EEEE;
        border-radius: 8px;
        background: #FFFFFF;
      }

      .portal-brand-logo {
        display: block;
        width: 100%;
        height: 100%;
        padding: 4px;
        object-fit: contain;
      }

      .portal-brand-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }

      .portal-brand-text h1 {
        margin: 0;
        color: #173D43;
        font-size: 19px;
        font-weight: 750;
        line-height: 1.25;
        letter-spacing: -.4px;
      }

      .portal-brand-text p {
        margin: 4px 0 0;
        color: #71878A;
        font-size: 11px;
        font-weight: 500;
        line-height: 1.3;
      }

      /* NAVIGATION */

      .portal-nav-menu {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;
        flex-wrap: wrap;
      }

      .portal-header .nav-link {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 9px 12px;
        border-radius: 5px;
        color: #526D71;
        background: transparent;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        transition: color .2s ease, background .2s ease;
      }

      .portal-header .nav-link:hover {
        color: #245D63;
        background: #F0FAFA;
      }

      .portal-header .nav-link.active {
        color: #245D63;
        background: #E8F8F8;
      }

      .portal-header .nav-link.active::after {
        content: "";
        position: absolute;
        right: 12px;
        bottom: 4px;
        left: 12px;
        height: 2px;
        border-radius: 2px;
        background: #71C9CE;
      }

      /* SKELETON */

      .portal-header-skeleton {
        background: #FFFFFF;
      }

      .portal-header-skeleton .portal-navbar {
        min-height: 82px;
      }

      .portal-nav-skeleton {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 9px;
      }

      .portal-header-skeleton .MuiSkeleton-root {
        background-color: #EAF4F5;
      }

      /* TABLET */

      @media (max-width: 1100px) {
        .portal-navbar {
          gap: 16px;
        }

        .portal-brand {
          min-width: auto;
        }

        .portal-brand-text h1 {
          font-size: 17px;
        }

        .portal-brand-text p {
          font-size: 10px;
        }

        .portal-header .nav-link {
          padding: 9px;
          font-size: 12px;
        }
      }

      /* MOBILE */

      @media (max-width: 850px) {
        .portal-navbar {
          flex-direction: column;
          align-items: stretch;
          gap: 12px;
          padding-top: 14px;
          padding-bottom: 13px;
        }

        .portal-brand {
          justify-content: flex-start;
        }

        .portal-nav-menu {
          justify-content: flex-start;
          width: 100%;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 5px;
          padding-bottom: 5px;
          scrollbar-width: thin;
          scrollbar-color: #B8DDDF transparent;
        }

        .portal-nav-menu::-webkit-scrollbar {
          height: 4px;
        }

        .portal-nav-menu::-webkit-scrollbar-thumb {
          background: #B8DDDF;
          border-radius: 5px;
        }

        .portal-header .nav-link {
          flex-shrink: 0;
          min-height: 37px;
          padding: 8px 12px;
          font-size: 12px;
        }

        .portal-nav-skeleton {
          width: 100%;
          justify-content: flex-start;
          overflow: hidden;
        }
      }

      /* SMALL MOBILE */

      @media (max-width: 520px) {
        .portal-header-container {
          padding-left: 15px;
          padding-right: 15px;
        }

        .portal-navbar {
          padding-top: 12px;
          padding-bottom: 10px;
        }

        .portal-logo-wrap {
          width: 45px;
          height: 45px;
        }

        .portal-brand-text h1 {
          font-size: 16px;
        }

        .portal-brand-text p {
          font-size: 9px;
        }

        .portal-header .nav-link {
          min-height: 35px;
          padding: 7px 10px;
          font-size: 11px;
        }
      }

      /* REDUCED MOTION */

      @media (prefers-reduced-motion: reduce) {
        .portal-header *,
        .portal-header *::before,
        .portal-header *::after {
          transition: none !important;
          animation: none !important;
        }
      }
    `}</style>
  );
}
