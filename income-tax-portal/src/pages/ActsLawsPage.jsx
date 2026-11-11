
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import SectionHeader from "../components/SectionHeader";
import InfoCard from "../components/InfoCard";
import { lawCards } from "../data/siteData";

function ActsLawsSkeleton() {
  return (
    <div className="acts-laws-page">
      <section className="acts-laws-hero">
        <div className="acts-laws-container">
          <Skeleton variant="text" width={110} height={24} />
          <Skeleton variant="text" width="48%" height={58} />
          <Skeleton variant="text" width="65%" height={25} />
          <Skeleton variant="text" width="52%" height={25} />
        </div>
      </section>

      <section className="acts-laws-content">
        <div className="acts-laws-container">
          <div className="acts-laws-heading-skeleton">
            <Skeleton variant="text" width={150} height={25} />
            <Skeleton variant="text" width={260} height={36} />
            <Skeleton variant="text" width="55%" height={22} />
          </div>

          <div className="acts-laws-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="acts-laws-card-skeleton" key={index}>
                <Skeleton variant="rounded" width={42} height={42} />
                <Skeleton variant="text" width="70%" height={30} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width={90} height={24} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ActsLawsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <ActsLawsStyles />

      {isLoading ? (
        <ActsLawsSkeleton />
      ) : (
        <div className="acts-laws-page">
          <section className="acts-laws-hero">
            <div className="acts-laws-container">
              <div className="acts-laws-eyebrow">
                <span className="acts-laws-eyebrow-line" />
                LEGAL INFORMATION
              </div>

              <h1 className="acts-laws-main-title">
                Acts, laws and
                <span> legal provisions.</span>
              </h1>

              <p className="acts-laws-hero-description">
                Access important tax legislation, legal provisions and
                reference materials through a clear and organized
                information portal.
              </p>

              <div className="acts-laws-hero-bottom">
                <span className="acts-laws-hero-dot" />
                Reliable references. Organized information. Easy navigation.
              </div>
            </div>
          </section>

          <section className="acts-laws-content">
            <div className="acts-laws-container">
              <div className="acts-laws-section-heading">
                <div>
                  <span className="acts-laws-section-label">
                    LEGAL RESOURCES
                  </span>

                  <h2>Explore Acts & Laws</h2>
                </div>

                <p>
                  Choose a legal reference to explore its relevant
                  provisions and information.
                </p>
              </div>

              <div className="acts-laws-grid">
                {lawCards.map((item) => (
                  <InfoCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    route={item.route}
                    badge="LAW"
                  />
                ))}
              </div>

              <div className="acts-laws-bottom-note">
                <div className="acts-laws-note-mark">i</div>

                <div>
                  <h3>Legal information and references</h3>
                  <p>
                    Select the relevant section to access the available
                    legislation and legal reference materials.
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

function ActsLawsStyles() {
  return (
    <style>{`
      .acts-laws-page {
        --law-primary: #71C9CE;
        --law-highlight: #A6E3E9;
        --law-secondary: #CBF1F5;
        --law-background: #E3FDFD;
        --law-text: #173D43;
        --law-muted: #647C80;
        --law-border: #D5EDEF;

        width: 100%;
        min-height: 100%;
        color: var(--law-text);
        background: #FFFFFF;
      }

      .acts-laws-page *,
      .acts-laws-page *::before,
      .acts-laws-page *::after {
        box-sizing: border-box;
      }

      .acts-laws-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }

      /* HERO */

      .acts-laws-hero {
        position: relative;
        overflow: hidden;
        padding: 76px 24px 68px;
        background: #F2FAFA;
        border-bottom: 1px solid #E5F1F1;
      }

      .acts-laws-hero::after {
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

      .acts-laws-eyebrow {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        color: #397F84;
        font-size: 12px;
        font-weight: 750;
        letter-spacing: 1.5px;
      }

      .acts-laws-eyebrow-line {
        width: 27px;
        height: 2px;
        background: var(--law-primary);
      }

      .acts-laws-main-title {
        max-width: 800px;
        margin: 0;
        color: var(--law-text);
        font-size: clamp(36px, 5vw, 58px);
        font-weight: 750;
        line-height: 1.13;
        letter-spacing: -2px;
      }

      .acts-laws-main-title span {
        display: block;
        color: #438E94;
      }

      .acts-laws-hero-description {
        max-width: 660px;
        margin: 22px 0 0;
        color: var(--law-muted);
        font-size: 16px;
        line-height: 1.85;
      }

      .acts-laws-hero-bottom {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        color: #52777A;
        font-size: 13px;
        font-weight: 600;
      }

      .acts-laws-hero-dot {
        width: 8px;
        height: 8px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--law-primary);
      }

      /* CONTENT */

      .acts-laws-content {
        padding: 65px 24px 80px;
        background: #FFFFFF;
      }

      .acts-laws-section-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 25px;
        margin-bottom: 32px;
      }

      .acts-laws-section-label {
        display: block;
        margin-bottom: 9px;
        color: #438E94;
        font-size: 11px;
        font-weight: 750;
        letter-spacing: 1.3px;
      }

      .acts-laws-section-heading h2 {
        margin: 0;
        color: var(--law-text);
        font-size: 30px;
        font-weight: 750;
        letter-spacing: -.8px;
      }

      .acts-laws-section-heading > p {
        max-width: 380px;
        margin: 0 0 3px;
        color: var(--law-muted);
        font-size: 14px;
        line-height: 1.7;
      }

      /* CARDS */

      .acts-laws-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
        align-items: stretch;
      }

      .acts-laws-grid > .info-card {
        height: 100%;
        min-height: 215px;
        padding: 25px 23px;
        border-radius: 10px;
        border-color: #DDEBEC;
        box-shadow: 0 3px 12px rgba(23, 61, 67, .025);
      }

      .acts-laws-grid > .info-card h3 {
        font-size: 19px;
        line-height: 1.45;
      }

      .acts-laws-grid > .info-card p {
        font-size: 14px;
        line-height: 1.8;
      }

      /* BOTTOM NOTE */

      .acts-laws-bottom-note {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-top: 42px;
        padding: 24px 26px;
        background: #F2FAFA;
        border: 1px solid #DDEFEF;
        border-radius: 9px;
      }

      .acts-laws-note-mark {
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

      .acts-laws-bottom-note h3 {
        margin: 0 0 5px;
        color: var(--law-text);
        font-size: 15px;
        font-weight: 700;
      }

      .acts-laws-bottom-note p {
        margin: 0;
        color: var(--law-muted);
        font-size: 13px;
        line-height: 1.7;
      }

      /* SKELETON */

      .acts-laws-page .MuiSkeleton-root {
        background-color: #E6F1F2;
      }

      .acts-laws-heading-skeleton {
        min-height: 100px;
        margin-bottom: 32px;
      }

      .acts-laws-card-skeleton {
        min-height: 215px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        background: #FFFFFF;
        border: 1px solid var(--law-border);
        border-radius: 10px;
      }

      /* RESPONSIVE */

      @media (max-width: 950px) {
        .acts-laws-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .acts-laws-hero {
          padding-top: 60px;
          padding-bottom: 55px;
        }

        .acts-laws-section-heading {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
        }
      }

      @media (max-width: 600px) {
        .acts-laws-hero {
          padding: 46px 18px 42px;
        }

        .acts-laws-main-title {
          font-size: 38px;
          letter-spacing: -1.4px;
        }

        .acts-laws-hero-description {
          margin-top: 17px;
          font-size: 14px;
        }

        .acts-laws-hero-bottom {
          align-items: flex-start;
          font-size: 12px;
          line-height: 1.6;
        }

        .acts-laws-content {
          padding: 43px 16px 52px;
        }

        .acts-laws-section-heading h2 {
          font-size: 26px;
        }

        .acts-laws-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .acts-laws-grid > .info-card {
          min-height: 190px;
          padding: 23px 20px;
        }

        .acts-laws-bottom-note {
          margin-top: 28px;
          padding: 19px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .acts-laws-page .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
