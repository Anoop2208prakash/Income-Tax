
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

import Header from "./Header";
import Footer from "./Footer";

function LayoutSkeleton() {
  return (
    <div className="site-shell layout-skeleton">
      {/* HEADER SKELETON - NO TOP BAR */}
      <div className="layout-header-skeleton">
        <div className="layout-nav-skeleton">
          <Skeleton
            variant="rounded"
            width={48}
            height={48}
            sx={{ borderRadius: "8px", flexShrink: 0 }}
          />

          <div className="layout-brand-skeleton">
            <Skeleton variant="text" width={190} height={27} />
            <Skeleton variant="text" width={145} height={18} />
          </div>

          <div className="layout-links-skeleton">
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={index === 2 ? 95 : 75}
                height={38}
                sx={{ borderRadius: "5px" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PAGE CONTENT SKELETON */}
      <main className="main-content layout-content-skeleton">
        <div className="layout-content-inner">
          <Skeleton variant="text" width="35%" height={45} />
          <Skeleton variant="text" width="65%" height={25} />

          <Skeleton
            variant="rounded"
            width="100%"
            height={190}
            sx={{ mt: 3, borderRadius: "8px" }}
          />

          <div className="layout-card-skeleton">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="layout-card-item" key={index}>
                <Skeleton variant="rounded" width={42} height={42} />
                <Skeleton variant="text" width="75%" height={25} />
                <Skeleton variant="text" width="100%" height={18} />
                <Skeleton variant="text" width="85%" height={18} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER SKELETON */}
      <footer className="layout-footer-skeleton">
        <Skeleton variant="text" width="30%" height={25} />
        <Skeleton variant="text" width="55%" height={18} />
      </footer>
    </div>
  );
}

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <LayoutStyles />

      {isLoading ? (
        <LayoutSkeleton />
      ) : (
        <div className="site-shell">
          {/* Pass the loading state to Header */}
          <Header loading={isLoading} />

          <main className="main-content">
            <Outlet />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

function LayoutStyles() {
  return (
    <style>{`
      :root {
        --layout-primary: #71C9CE;
        --layout-highlight: #A6E3E9;
        --layout-secondary: #CBF1F5;
        --layout-background: #E3FDFD;
        --layout-text: #173D43;
        --layout-muted: #647C80;
        --layout-border: #D5EDEF;
        --layout-white: #FFFFFF;
      }

      /* MAIN LAYOUT */

      .site-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--layout-white);
        color: var(--layout-text);
      }

      .main-content {
        flex: 1;
        width: 100%;
        min-width: 0;
      }

      /* SKELETON LAYOUT */

      .layout-skeleton {
        background: var(--layout-white);
      }

      .layout-skeleton .MuiSkeleton-root {
        background-color: #EAF4F5;
      }

      /* HEADER SKELETON */

      .layout-header-skeleton {
        width: 100%;
        background: #FFFFFF;
        border-bottom: 1px solid var(--layout-border);
      }

      .layout-nav-skeleton {
        min-height: 82px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 12px 28px;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .layout-brand-skeleton {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        min-width: 0;
      }

      .layout-links-skeleton {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 9px;
      }

      /* CONTENT SKELETON */

      .layout-content-skeleton {
        flex: 1;
        padding: 65px 5%;
        background: #F8FCFC;
      }

      .layout-content-inner {
        max-width: 1200px;
        margin: 0 auto;
      }

      .layout-card-skeleton {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
        margin-top: 28px;
      }

      .layout-card-item {
        min-height: 145px;
        padding: 22px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        background: var(--layout-white);
        border: 1px solid var(--layout-border);
        border-radius: 8px;
      }

      /* FOOTER SKELETON */

      .layout-footer-skeleton {
        min-height: 110px;
        padding: 24px 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: #F8FCFC;
        border-top: 1px solid var(--layout-border);
      }

      /* RESPONSIVE */

      @media (max-width: 1100px) {
        .layout-nav-skeleton {
          gap: 12px;
        }

        .layout-links-skeleton {
          gap: 6px;
        }

        .layout-links-skeleton .MuiSkeleton-root {
          width: 65px;
        }
      }

      @media (max-width: 850px) {
        .layout-nav-skeleton {
          flex-wrap: wrap;
          min-height: 82px;
        }

        .layout-links-skeleton {
          width: 100%;
          margin-left: 0;
          justify-content: flex-start;
          overflow: hidden;
        }
      }

      @media (max-width: 768px) {
        .layout-nav-skeleton {
          min-height: 72px;
          padding: 12px 4%;
        }

        .layout-links-skeleton {
          display: none;
        }

        .layout-content-skeleton {
          padding: 40px 5%;
        }

        .layout-card-skeleton {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 520px) {
        .layout-nav-skeleton {
          padding: 12px 15px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .layout-skeleton .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
