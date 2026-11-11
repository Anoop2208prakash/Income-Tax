
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Acts & Laws", path: "/acts-laws" },
  { label: "Tax Calculator", path: "/tax-calculator" },
];

const supportLinks = [
  { label: "Contact Us", path: "/help" },
  { label: "Grievance", path: "/help" },
  { label: "Income Tax Forms", path: "/forms" },
  { label: "Tutorials", path: "/E-Tutorial" },
];

export function FooterSkeleton() {
  return (
    <footer className="footer footer-skeleton">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Skeleton variant="text" width={190} height={35} />
          <Skeleton variant="text" width="100%" height={21} />
          <Skeleton variant="text" width="95%" height={21} />
          <Skeleton variant="text" width="70%" height={21} />
        </div>

        <div>
          <Skeleton variant="text" width={110} height={30} />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="text"
              width={105}
              height={25}
            />
          ))}
        </div>

        <div>
          <Skeleton variant="text" width={100} height={30} />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="text"
              width={115}
              height={25}
            />
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <Skeleton variant="text" width={250} height={22} />
      </div>
    </footer>
  );
}

export default function Footer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <FooterStyles />

      {isLoading ? (
        <FooterSkeleton />
      ) : (
        <footer className="footer">
          <div className="container footer-grid">
            {/* BRAND INFORMATION */}

            <div className="footer-brand">
              <Link to="/" className="footer-brand-title">
                <span className="footer-brand-mark">IT</span>
                <span>Income Tax Portal</span>
              </Link>

              <p>
                A professional information portal designed to make
                tax-related information, legal references, forms and
                learning resources easier to access.
              </p>

              <div className="footer-brand-caption">
                Clear information. Simple access.
              </div>
            </div>

            {/* QUICK LINKS */}

            <div className="footer-links">
              <h4>Quick Links</h4>

              <ul>
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SUPPORT LINKS */}

            <div className="footer-links">
              <h4>Support</h4>

              <ul>
                {supportLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="footer-bottom">
            <div className="container footer-bottom-inner">
              <p>
                © {new Date().getFullYear()} Income Tax Portal.
                All rights reserved.
              </p>

              <span>Information and resources portal</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

function FooterStyles() {
  return (
    <style>{`
      .footer {
        --footer-primary: #71C9CE;
        --footer-highlight: #A6E3E9;
        --footer-secondary: #CBF1F5;
        --footer-background: #E3FDFD;
        --footer-text: #173D43;
        --footer-muted: #647C80;
        --footer-border: #D5EDEF;

        width: 100%;
        background: #F2FAFA;
        color: var(--footer-text);
        border-top: 1px solid #E1EEEE;
      }

      .footer *,
      .footer *::before,
      .footer *::after {
        box-sizing: border-box;
      }

      .footer .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }

      /* FOOTER GRID */

      .footer-grid {
        display: grid;
        grid-template-columns: 1.7fr 1fr 1fr;
        gap: 70px;
        padding: 55px 24px 48px;
      }

      /* BRAND */

      .footer-brand-title {
        display: inline-flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 17px;
        color: var(--footer-text);
        text-decoration: none;
        font-size: 20px;
        font-weight: 750;
        letter-spacing: -.4px;
      }

      .footer-brand-mark {
        display: grid;
        place-items: center;
        width: 39px;
        height: 39px;
        flex-shrink: 0;
        color: #245D63;
        background: #D9F2F3;
        border: 1px solid #C7E9EB;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: -.5px;
      }

      .footer-brand p {
        max-width: 390px;
        margin: 0;
        color: var(--footer-muted);
        font-size: 13px;
        line-height: 1.9;
      }

      .footer-brand-caption {
        margin-top: 18px;
        color: #438E94;
        font-size: 12px;
        font-weight: 650;
      }

      /* LINKS */

      .footer-links h4 {
        margin: 5px 0 20px;
        color: var(--footer-text);
        font-size: 15px;
        font-weight: 750;
      }

      .footer-links ul {
        display: flex;
        flex-direction: column;
        gap: 13px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .footer-links li {
        margin: 0;
        padding: 0;
      }

      .footer-links a {
        display: inline-block;
        color: var(--footer-muted);
        font-size: 13px;
        line-height: 1.5;
        text-decoration: none;
        transition: color .2s ease, transform .2s ease;
      }

      .footer-links a:hover {
        color: #287F85;
        transform: translateX(3px);
      }

      .footer-links a:focus-visible,
      .footer-brand-title:focus-visible {
        outline: 2px solid var(--footer-primary);
        outline-offset: 4px;
        border-radius: 3px;
      }

      /* BOTTOM BAR */

      .footer-bottom {
        border-top: 1px solid #DDEBEC;
        background: #EDF7F7;
      }

      .footer-bottom-inner {
        min-height: 62px;
        padding: 15px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }

      .footer-bottom p {
        margin: 0;
        color: #647C80;
        font-size: 12px;
        line-height: 1.6;
      }

      .footer-bottom-inner > span {
        color: #789194;
        font-size: 12px;
      }

      /* SKELETON */

      .footer-skeleton {
        min-height: 280px;
      }

      .footer-skeleton .footer-grid {
        align-items: start;
      }

      .footer-skeleton .MuiSkeleton-root {
        background-color: #DDEBEC;
      }

      .footer-skeleton .footer-bottom {
        min-height: 62px;
        padding: 15px 24px;
        display: flex;
        align-items: center;
      }

      .footer-skeleton .footer-bottom > .MuiSkeleton-root {
        margin-left: max(0px, calc((100% - 1152px) / 2));
      }

      /* RESPONSIVE */

      @media (max-width: 850px) {
        .footer-grid {
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 35px;
        }
      }

      @media (max-width: 650px) {
        .footer-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 35px 25px;
          padding: 40px 20px;
        }

        .footer-brand {
          grid-column: 1 / -1;
        }

        .footer-brand p {
          max-width: 460px;
        }

        .footer-bottom-inner {
          align-items: flex-start;
          flex-direction: column;
          gap: 5px;
          padding: 16px 20px;
        }

        .footer-skeleton .footer-bottom {
          padding: 15px 20px;
        }

        .footer-skeleton .footer-bottom > .MuiSkeleton-root {
          margin-left: 0;
        }
      }

      @media (max-width: 380px) {
        .footer-grid {
          gap: 28px 15px;
          padding-right: 16px;
          padding-left: 16px;
        }

        .footer-brand-title {
          font-size: 18px;
        }

        .footer-bottom-inner {
          padding-right: 16px;
          padding-left: 16px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .footer-links a {
          transition: none;
        }

        .footer-skeleton .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
