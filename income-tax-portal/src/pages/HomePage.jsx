
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import InfoCard from "../components/InfoCard";
import { homeHighlights } from "../data/siteData";

const theme = {
  primary: "#71C9CE",
  highlight: "#A6E3E9",
  secondary: "#CBF1F5",
  background: "#E3FDFD",
  text: "#173D43",
  muted: "#647C80",
  white: "#FFFFFF",
  border: "#D5EDEF",
};

const circulars = [
  {
    title: "Income Tax Circular 1",
    description: "Open the first circular PDF.",
    url: "/pdfs/notice1.pdf",
    date: "Latest update",
  },
  {
    title: "Income Tax Circular 2",
    description: "Open the second circular PDF.",
    url: "/pdfs/notice2.pdf",
    date: "Latest update",
  },
];

const quickLinks = [
  {
    number: "01",
    title: "Tax Calculators",
    description: "Calculate and understand your income tax.",
    target: "#home-services",
  },
  {
    number: "02",
    title: "Acts & Rules",
    description: "Browse applicable acts, sections and rules.",
    target: "#home-services",
  },
  {
    number: "03",
    title: "Forms & Downloads",
    description: "Find forms and useful documents.",
    target: "#home-services",
  },
  {
    number: "04",
    title: "Notifications",
    description: "Read circulars and important updates.",
    target: "#latest-updates",
  },
];

function HomePageSkeleton() {
  const color = "#DCEFF0";

  return (
    <main className="tax-home-skeleton" aria-busy="true" aria-label="Loading homepage">
      <section className="tax-hero">
        <div className="container tax-hero-layout">
          <div>
            <Skeleton variant="text" width={190} height={25} sx={{ bgcolor: color, mb: 2 }} />
            <Skeleton variant="text" width="85%" height={65} sx={{ bgcolor: color }} />
            <Skeleton variant="text" width="65%" height={65} sx={{ bgcolor: color, mb: 2 }} />
            <Skeleton variant="text" width="95%" height={24} sx={{ bgcolor: color }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ bgcolor: color, mb: 3 }} />
            <div className="tax-skeleton-actions">
              <Skeleton variant="rounded" width={145} height={44} sx={{ bgcolor: color }} />
              <Skeleton variant="rounded" width={145} height={44} sx={{ bgcolor: color }} />
            </div>
          </div>

          <div className="tax-skeleton-overview">
            <Skeleton variant="text" width={150} height={30} sx={{ bgcolor: color, mb: 2 }} />
            <Skeleton variant="text" width="85%" height={35} sx={{ bgcolor: color, mb: 2 }} />
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                height={48}
                sx={{ bgcolor: color, mb: 1.5 }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="tax-section">
        <div className="container">
          <Skeleton variant="text" width={180} height={25} sx={{ bgcolor: color }} />
          <Skeleton variant="text" width={280} height={42} sx={{ bgcolor: color, mb: 3 }} />

          <div className="tax-skeleton-grid">
            {[1, 2, 3, 4].map((item) => (
              <div className="tax-skeleton-card" key={item}>
                <Skeleton variant="text" width="65%" height={30} sx={{ bgcolor: color }} />
                <Skeleton variant="text" width="100%" height={22} sx={{ bgcolor: color }} />
                <Skeleton variant="text" width="80%" height={22} sx={{ bgcolor: color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .tax-skeleton-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tax-skeleton-overview {
          padding: 28px;
          border: 1px solid ${theme.border};
          border-radius: 8px;
          background: #fff;
        }

        .tax-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .tax-skeleton-card {
          padding: 22px;
          border: 1px solid ${theme.border};
          border-radius: 8px;
          background: #fff;
        }

        @media (max-width: 850px) {
          .tax-skeleton-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .tax-skeleton-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tax-home-skeleton * {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showModal) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);

  if (isLoading) return <HomePageSkeleton />;

  return (
    <main className="tax-home">
      <style>{`
        .tax-home {
          --tax-primary: #71C9CE;
          --tax-highlight: #A6E3E9;
          --tax-secondary: #CBF1F5;
          --tax-background: #E3FDFD;
          --tax-text: #173D43;
          --tax-muted: #647C80;
          --tax-border: #D5EDEF;

          color: var(--tax-text);
          background: #fff;
          overflow: hidden;
        }

        .tax-home *,
        .tax-home *::before,
        .tax-home *::after {
          box-sizing: border-box;
        }

        .tax-home a {
          text-decoration: none;
        }

        .tax-home button {
          font-family: inherit;
        }

        .tax-hero {
          padding: 76px 0;
          background: #F5FBFB;
          border-bottom: 1px solid #E6F0F0;
        }

        .tax-hero-layout {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          align-items: center;
          gap: 65px;
        }

        .tax-eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          color: #398F95;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .tax-hero-title {
          max-width: 650px;
          margin: 0;
          color: var(--tax-text);
          font-size: clamp(36px, 4.2vw, 54px);
          font-weight: 700;
          line-height: 1.16;
          letter-spacing: -1.8px;
        }

        .tax-hero-title span {
          color: #389DA3;
        }

        .tax-hero-description {
          max-width: 570px;
          margin: 21px 0 27px;
          color: var(--tax-muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .tax-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tax-button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 19px;
          border: 1px solid transparent;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 650;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }

        .tax-button-primary {
          background: #245D63;
          color: #fff !important;
          border-color: #245D63;
        }

        .tax-button-primary:hover {
          background: #173D43;
          border-color: #173D43;
        }

        .tax-button-secondary {
          color: #245D63 !important;
          background: #fff;
          border-color: #C9DFE0;
        }

        .tax-button-secondary:hover {
          background: #F0FAFA;
          border-color: #71C9CE;
        }

        .tax-hero-overview {
          padding: 28px;
          background: #fff;
          border: 1px solid #DCEAEA;
          border-radius: 8px;
        }

        .tax-overview-label {
          margin: 0 0 10px;
          color: #498E93;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .tax-overview-title {
          margin: 0 0 8px;
          color: var(--tax-text);
          font-size: 22px;
          font-weight: 700;
        }

        .tax-overview-description {
          margin: 0 0 20px;
          color: var(--tax-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .tax-overview-list {
          display: grid;
          gap: 0;
        }

        .tax-overview-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 0;
          border-top: 1px solid #EAF1F1;
          color: #365B60;
          font-size: 13px;
        }

        .tax-overview-item span:last-child {
          color: #57999D;
          font-size: 17px;
        }

        .tax-section {
          padding: 70px 0;
          background: #fff;
        }

        .tax-section-soft {
          background: #F7FBFB;
        }

        .tax-section-heading {
          margin-bottom: 30px;
        }

        .tax-section-kicker {
          display: block;
          margin-bottom: 9px;
          color: #39999F;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .tax-section-title {
          margin: 0;
          color: var(--tax-text);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 700;
          letter-spacing: -.8px;
        }

        .tax-section-description {
          max-width: 580px;
          margin: 10px 0 0;
          color: var(--tax-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .tax-quick-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }

        .tax-quick-card {
          display: block;
          min-height: 160px;
          padding: 22px;
          background: #fff;
          border: 1px solid #DFEBEB;
          border-radius: 7px;
          transition: border-color .2s ease, background .2s ease;
        }

        .tax-quick-card:hover {
          border-color: #8CCFD2;
          background: #FAFEFE;
        }

        .tax-quick-number {
          display: block;
          margin-bottom: 19px;
          color: #55A9AE;
          font-size: 12px;
          font-weight: 700;
        }

        .tax-quick-card h3 {
          margin: 0 0 8px;
          color: var(--tax-text);
          font-size: 15px;
          font-weight: 700;
        }

        .tax-quick-card p {
          margin: 0;
          color: var(--tax-muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .tax-module-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .tax-module-grid > * {
          min-width: 0;
        }

        .tax-updates-section {
          padding: 70px 0;
          background: #F5FBFB;
          border-top: 1px solid #E5F0F0;
          border-bottom: 1px solid #E5F0F0;
        }

        .tax-updates-layout {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 45px;
          align-items: center;
        }

        .tax-updates-intro h2 {
          margin: 0 0 12px;
          color: var(--tax-text);
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -.7px;
        }

        .tax-updates-intro p {
          margin: 0;
          color: var(--tax-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        .tax-updates-list {
          display: grid;
          gap: 12px;
        }

        .tax-update-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 17px 18px;
          background: #fff;
          border: 1px solid #DFEBEB;
          border-radius: 6px;
        }

        .tax-update-number {
          flex: 0 0 35px;
          color: #46969B;
          font-size: 13px;
          font-weight: 700;
        }

        .tax-update-info {
          flex: 1;
          min-width: 0;
        }

        .tax-update-info h3 {
          margin: 0 0 5px;
          color: var(--tax-text);
          font-size: 14px;
          font-weight: 700;
        }

        .tax-update-info p {
          margin: 0;
          color: var(--tax-muted);
          font-size: 12px;
        }

        .tax-update-link {
          color: #328F95 !important;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
        }

        .tax-bottom-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .tax-bottom-card {
          padding: 27px;
          border: 1px solid #DFEBEB;
          border-radius: 7px;
          background: #fff;
        }

        .tax-bottom-card h3 {
          margin: 0 0 10px;
          color: var(--tax-text);
          font-size: 18px;
          font-weight: 700;
        }

        .tax-bottom-card p {
          margin: 0;
          color: var(--tax-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .tax-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(15, 38, 42, .55);
        }

        .tax-modal {
          width: 100%;
          max-width: 520px;
          max-height: 85vh;
          overflow-y: auto;
          padding: 26px;
          border: 1px solid #DCEAEA;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 18px 50px rgba(0, 0, 0, .16);
        }

        .tax-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 23px;
        }

        .tax-modal-header small {
          color: #39999F;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .tax-modal-header h2 {
          margin: 7px 0 0;
          color: var(--tax-text);
          font-size: 22px;
          font-weight: 700;
        }

        .tax-modal-close {
          width: 34px;
          height: 34px;
          border: 1px solid #DFEBEB;
          border-radius: 5px;
          background: #fff;
          color: var(--tax-text);
          font-size: 21px;
          cursor: pointer;
        }

        .tax-modal-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 22px;
        }

        @media (max-width: 1000px) {
          .tax-hero-layout {
            gap: 35px;
          }

          .tax-quick-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 800px) {
          .tax-hero-layout {
            grid-template-columns: 1fr;
          }

          .tax-hero-overview {
            max-width: 620px;
          }

          .tax-module-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tax-updates-layout {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        @media (max-width: 600px) {
          .tax-hero {
            padding: 48px 0;
          }

          .tax-hero-title {
            font-size: 38px;
            letter-spacing: -1.2px;
          }

          .tax-hero-description {
            font-size: 14px;
          }

          .tax-actions {
            flex-direction: column;
          }

          .tax-button {
            width: 100%;
          }

          .tax-hero-overview {
            padding: 21px;
          }

          .tax-section,
          .tax-updates-section {
            padding: 52px 0;
          }

          .tax-quick-grid,
          .tax-module-grid,
          .tax-bottom-grid {
            grid-template-columns: 1fr;
          }

          .tax-quick-card {
            min-height: auto;
          }

          .tax-update-item {
            flex-wrap: wrap;
          }

          .tax-update-link {
            margin-left: 51px;
          }

          .tax-modal {
            padding: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tax-home *,
          .tax-home *::before,
          .tax-home *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="tax-hero">
        <div className="container tax-hero-layout">
          <div>
            <span className="tax-eyebrow">
              Income Tax Information Portal
            </span>

            <h1 className="tax-hero-title">
              Income Tax Resources,
              <br />
              <span>Made Simple.</span>
            </h1>

            <p className="tax-hero-description">
              Access income tax calculators, acts, rules, forms and
              important notifications through one organized platform.
              Find the information you need without unnecessary complexity.
            </p>

            <div className="tax-actions">
              <a
                href="#home-services"
                className="tax-button tax-button-primary"
              >
                Explore Services
              </a>

              <button
                type="button"
                className="tax-button tax-button-secondary"
                onClick={() => setShowModal(true)}
              >
                View Notifications
              </button>
            </div>
          </div>

          <div className="tax-hero-overview">
            <p className="tax-overview-label">Portal Overview</p>

            <h2 className="tax-overview-title">
              Your tax information, organized.
            </h2>

            <p className="tax-overview-description">
              Explore the main resources available on this platform.
            </p>

            <div className="tax-overview-list">
              {[
                "Income tax calculators and tools",
                "Acts, sections and legal resources",
                "Forms and downloadable documents",
                "Circulars and notifications",
              ].map((item, index) => (
                <div className="tax-overview-item" key={item}>
                  <span>{item}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="tax-section">
        <div className="container">
          <div className="tax-section-heading">
            <span className="tax-section-kicker">Quick Access</span>
            <h2 className="tax-section-title">Find what you need</h2>
            <p className="tax-section-description">
              Navigate directly to commonly used tax resources and services.
            </p>
          </div>

          <div className="tax-quick-grid">
            {quickLinks.map((item) => (
              <a
                href={item.target}
                className="tax-quick-card"
                key={item.title}
                onClick={
                  item.title === "Notifications"
                    ? (event) => {
                        event.preventDefault();
                        setShowModal(true);
                      }
                    : undefined
                }
              >
                <span className="tax-quick-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section className="tax-section tax-section-soft" id="home-services">
        <div className="container">
          <div className="tax-section-heading">
            <span className="tax-section-kicker">Portal Services</span>
            <h2 className="tax-section-title">Core Modules</h2>
            <p className="tax-section-description">
              Explore the main sections and services available throughout
              the income tax portal.
            </p>
          </div>

          <div className="tax-module-grid">
            {homeHighlights.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                badge="Explore"
              />
            ))}
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      <section className="tax-updates-section" id="latest-updates">
        <div className="container tax-updates-layout">
          <div className="tax-updates-intro">
            <span className="tax-section-kicker">Information Centre</span>
            <h2>Latest Circulars & Notifications</h2>
            <p>
              Access available circular documents and important
              tax-related updates in one place.
            </p>

            <button
              type="button"
              className="tax-button tax-button-primary"
              style={{ marginTop: "22px" }}
              onClick={() => setShowModal(true)}
            >
              View All Notifications
            </button>
          </div>

          <div className="tax-updates-list">
            {circulars.map((item, index) => (
              <div className="tax-update-item" key={item.title}>
                <span className="tax-update-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="tax-update-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tax-update-link"
                >
                  View PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM INFORMATION */}
      <section className="tax-section">
        <div className="container">
          <div className="tax-bottom-grid">
            <div className="tax-bottom-card">
              <h3>Structured Information</h3>
              <p>
                Find tax-related information through organized sections,
                straightforward navigation and clear content layouts.
              </p>
            </div>

            <div className="tax-bottom-card">
              <h3>Designed for Growth</h3>
              <p>
                A flexible platform structure that can support future
                calculators, forms, authentication and administrative
                features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS MODAL */}
      {showModal && (
        <div
          className="tax-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="tax-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tax-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="tax-modal-header">
              <div>
                <small>INFORMATION CENTRE</small>
                <h2 id="tax-modal-title">Circulars & Notifications</h2>
              </div>

              <button
                type="button"
                className="tax-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close notifications"
              >
                ×
              </button>
            </div>

            <div className="tax-updates-list">
              {circulars.map((item, index) => (
                <div className="tax-update-item" key={item.title}>
                  <span className="tax-update-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="tax-update-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tax-update-link"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>

            <div className="tax-modal-footer">
              <button
                type="button"
                className="tax-button tax-button-primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
