
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import InfoCard from "../components/InfoCard";
import { aboutItems } from "../data/siteData";

function AboutPageSkeleton() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <Skeleton variant="text" width={105} height={24} />
          <Skeleton variant="text" width="48%" height={58} />
          <Skeleton variant="text" width="65%" height={25} />
          <Skeleton variant="text" width="52%" height={25} />
        </div>
      </section>

      <section className="about-content">
        <div className="about-container">
          <div className="about-section-heading">
            <Skeleton variant="text" width={150} height={25} />
            <Skeleton variant="text" width={260} height={36} />
          </div>

          <div className="about-card-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="about-card-skeleton" key={index}>
                <Skeleton variant="rounded" width={42} height={42} />
                <Skeleton variant="text" width="70%" height={30} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="65%" height={20} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AboutPageStyles />

      {isLoading ? (
        <AboutPageSkeleton />
      ) : (
        <div className="about-page">
          <section className="about-hero">
            <div className="about-container">
              <div className="about-eyebrow">
                <span className="about-eyebrow-line" />
                ABOUT OUR PORTAL
              </div>

              <h1 className="about-main-title">
                Making tax information
                <span> easier to understand.</span>
              </h1>

              <p className="about-hero-description">
                A centralized information portal designed to make tax-related
                information, resources and services easier to access and
                understand.
              </p>

              <div className="about-hero-bottom">
                <span className="about-hero-dot" />
                Clear information. Simple access. Better understanding.
              </div>
            </div>
          </section>

          <section className="about-content">
            <div className="about-container">
              <div className="about-section-heading">
                <div>
                  <span className="about-section-label">
                    WHAT WE OFFER
                  </span>

                  <h2>Explore the portal</h2>
                </div>

                <p>
                  Discover the key sections and resources available
                  throughout this website.
                </p>
              </div>

              <div className="about-card-grid">
                {aboutItems.map((item) => (
                  <div className="about-card-wrapper" key={item.title}>
                    <InfoCard
                      title={item.title}
                      description={item.description}
                      badge="ABOUT"
                    />
                  </div>
                ))}
              </div>

              <div className="about-bottom-note">
                <div className="about-note-mark">i</div>

                <div>
                  <h3>Information at one place</h3>
                  <p>
                    Explore the available sections to find useful tax
                    information, learning resources and related services.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function AboutPageStyles() {
  return (
    <style>{`
      .about-page {
        --about-primary: #71C9CE;
        --about-highlight: #A6E3E9;
        --about-secondary: #CBF1F5;
        --about-background: #E3FDFD;
        --about-text: #173D43;
        --about-muted: #647C80;
        --about-border: #D5EDEF;

        width: 100%;
        min-height: 100%;
        color: var(--about-text);
        background: #FFFFFF;
      }

      .about-page *,
      .about-page *::before,
      .about-page *::after {
        box-sizing: border-box;
      }

      .about-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }

      /* HERO */

      .about-hero {
        position: relative;
        overflow: hidden;
        padding: 76px 24px 68px;
        background: #F2FAFA;
        border-bottom: 1px solid #E5F1F1;
      }

      .about-hero::after {
        content: "";
        position: absolute;
        top: -110px;
        right: -80px;
        width: 360px;
        height: 360px;
        border: 1px solid rgba(113, 201, 206, .22);
        border-radius: 50%;
        pointer-events: none;
      }

      .about-eyebrow {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        color: #397F84;
        font-size: 12px;
        font-weight: 750;
        letter-spacing: 1.5px;
      }

      .about-eyebrow-line {
        width: 27px;
        height: 2px;
        background: var(--about-primary);
      }

      .about-main-title {
        max-width: 800px;
        margin: 0;
        color: var(--about-text);
        font-size: clamp(36px, 5vw, 58px);
        font-weight: 750;
        line-height: 1.13;
        letter-spacing: -2px;
      }

      .about-main-title span {
        display: block;
        color: #438E94;
      }

      .about-hero-description {
        max-width: 660px;
        margin: 22px 0 0;
        color: var(--about-muted);
        font-size: 16px;
        line-height: 1.85;
      }

      .about-hero-bottom {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        color: #52777A;
        font-size: 13px;
        font-weight: 600;
      }

      .about-hero-dot {
        width: 8px;
        height: 8px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--about-primary);
      }

      /* CONTENT */

      .about-content {
        padding: 65px 24px 80px;
        background: #FFFFFF;
      }

      .about-section-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 25px;
        margin-bottom: 32px;
      }

      .about-section-label {
        display: block;
        margin-bottom: 9px;
        color: #438E94;
        font-size: 11px;
        font-weight: 750;
        letter-spacing: 1.3px;
      }

      .about-section-heading h2 {
        margin: 0;
        color: var(--about-text);
        font-size: 30px;
        font-weight: 750;
        letter-spacing: -.8px;
      }

      .about-section-heading > p {
        max-width: 380px;
        margin: 0 0 3px;
        color: var(--about-muted);
        font-size: 14px;
        line-height: 1.7;
      }

      /* CARDS */

      .about-card-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
        align-items: stretch;
      }

      .about-card-wrapper {
        min-width: 0;
      }

      .about-card-wrapper .info-card {
        height: 100%;
        min-height: 215px;
        padding: 34px 23px 23px;
        border-radius: 10px;
        border-color: #DDEBEC;
        box-shadow: 0 3px 12px rgba(23, 61, 67, .025);
      }

      .about-card-wrapper .info-card h3 {
        font-size: 19px;
        line-height: 1.45;
      }

      .about-card-wrapper .info-card p {
        font-size: 14px;
        line-height: 1.8;
      }

      /* BOTTOM NOTE */

      .about-bottom-note {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-top: 42px;
        padding: 24px 26px;
        background: #F2FAFA;
        border: 1px solid #DDEFEF;
        border-radius: 9px;
      }

      .about-note-mark {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        color: #245D63;
        background: #D9F2F3;
        border-radius: 7px;
        font-size: 17px;
        font-weight: 700;
      }

      .about-bottom-note h3 {
        margin: 0 0 5px;
        color: var(--about-text);
        font-size: 15px;
        font-weight: 700;
      }

      .about-bottom-note p {
        margin: 0;
        color: var(--about-muted);
        font-size: 13px;
        line-height: 1.7;
      }

      /* SKELETON */

      .about-page .MuiSkeleton-root {
        background-color: #E6F1F2;
      }

      .about-intro-skeleton {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        margin-bottom: 38px;
      }

      .about-section-heading {
        min-height: 65px;
      }

      .about-card-skeleton {
        min-height: 215px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        background: #FFFFFF;
        border: 1px solid var(--about-border);
        border-radius: 10px;
      }

      /* RESPONSIVE */

      @media (max-width: 950px) {
        .about-card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .about-hero {
          padding-top: 60px;
          padding-bottom: 55px;
        }

        .about-section-heading {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
        }
      }

      @media (max-width: 600px) {
        .about-hero {
          padding: 46px 18px 42px;
        }

        .about-main-title {
          font-size: 38px;
          letter-spacing: -1.4px;
        }

        .about-hero-description {
          margin-top: 17px;
          font-size: 14px;
        }

        .about-hero-bottom {
          align-items: flex-start;
          font-size: 12px;
          line-height: 1.6;
        }

        .about-content {
          padding: 43px 16px 52px;
        }

        .about-section-heading h2 {
          font-size: 26px;
        }

        .about-card-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .about-card-wrapper .info-card {
          min-height: 190px;
          padding: 32px 20px 20px;
        }

        .about-bottom-note {
          margin-top: 28px;
          padding: 19px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .about-page .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
