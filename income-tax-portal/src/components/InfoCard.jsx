
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";

/* =========================================
   INFO CARD SKELETON
========================================= */

export function InfoCardSkeleton({ count = 1 }) {
  return (
    <>
      <InfoCardStyles />

      {Array.from({ length: count }).map((_, index) => (
        <div className="info-card-skeleton" key={index}>
          <div className="info-card-skeleton-top">
            <Skeleton variant="rounded" width={40} height={40} />
            <Skeleton variant="rounded" width={75} height={25} />
          </div>

          <Skeleton variant="text" width="72%" height={32} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="65%" height={20} />

          <div className="info-card-skeleton-bottom">
            <Skeleton variant="text" width={85} height={23} />
          </div>
        </div>
      ))}
    </>
  );
}

/* =========================================
   INFO CARD COMPONENT
========================================= */

export default function InfoCard({
  title,
  description,
  route,
  badge,
  link,
}) {
  const content = (
    <>
      <div className="info-card-top">
        <div className="info-card-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        {badge && <span className="card-badge">{badge}</span>}
      </div>

      <div className="info-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {(route || link) && (
        <div className="info-card-bottom">
          <span className="card-link">
            Explore
            <span className="card-link-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      )}
    </>
  );

  if (route) {
    return (
      <>
        <InfoCardStyles />
        <Link to={route} className="info-card clickable-card">
          {content}
        </Link>
      </>
    );
  }

  if (link) {
    return (
      <>
        <InfoCardStyles />
        <a
          href={link}
          className="info-card clickable-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </>
    );
  }

  return (
    <>
      <InfoCardStyles />
      <article className="info-card">
        {content}
      </article>
    </>
  );
}

/* =========================================
   INFO CARD STYLES
========================================= */

function InfoCardStyles() {
  return (
    <style>{`
      /* THEME */

      .info-card {
        --card-primary: #71C9CE;
        --card-highlight: #A6E3E9;
        --card-secondary: #CBF1F5;
        --card-background: #E3FDFD;
        --card-text: #173D43;
        --card-muted: #647C80;
        --card-border: #D5EDEF;

        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 0;
        min-height: 245px;
        padding: 23px;

        color: var(--card-text);
        background: #FFFFFF;
        border: 1px solid var(--card-border);
        border-radius: 10px;
        text-decoration: none;

        transition:
          border-color .22s ease,
          box-shadow .22s ease,
          transform .22s ease;
      }

      .info-card *,
      .info-card *::before,
      .info-card *::after {
        box-sizing: border-box;
      }

      /* TOP ROW */

      .info-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 24px;
      }

      /* DECORATIVE MARK */

      .info-card-mark {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;

        background: #EFFAFA;
        border: 1px solid #DCEFF0;
        border-radius: 8px;
      }

      .info-card-mark span {
        display: block;
        width: 4px;
        border-radius: 3px;
        background: #71C9CE;
      }

      .info-card-mark span:nth-child(1) {
        height: 12px;
      }

      .info-card-mark span:nth-child(2) {
        height: 20px;
        background: #4FAEB5;
      }

      .info-card-mark span:nth-child(3) {
        height: 15px;
      }

      /* BADGE */

      .info-card .card-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 25px;
        padding: 5px 10px;

        color: #287078;
        background: #F0FAFA;
        border: 1px solid #DCEFF0;
        border-radius: 5px;

        font-size: 11px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .2px;
      }

      /* CONTENT */

      .info-card-content {
        flex: 1;
      }

      .info-card h3 {
        margin: 0 0 11px;
        color: #173D43;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: -.35px;
      }

      .info-card p {
        margin: 0;
        color: #647C80;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.8;
      }

      /* BOTTOM LINK */

      .info-card-bottom {
        display: flex;
        align-items: center;
        margin-top: 22px;
        padding-top: 15px;
        border-top: 1px solid #EDF4F4;
      }

      .info-card .card-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #287C83;
        font-size: 13px;
        font-weight: 700;
      }

      .info-card .card-link-arrow {
        display: inline-block;
        font-size: 17px;
        line-height: 1;
        transition: transform .2s ease;
      }

      /* HOVER */

      .info-card.clickable-card {
        cursor: pointer;
      }

      .info-card.clickable-card:hover {
        border-color: #9BD9DD;
        box-shadow: 0 9px 24px rgba(23, 61, 67, .07);
        transform: translateY(-4px);
      }

      .info-card.clickable-card:hover .card-link-arrow {
        transform: translateX(4px);
      }

      .info-card.clickable-card:hover .info-card-mark {
        background: #E3FDFD;
        border-color: #A6E3E9;
      }

      .info-card.clickable-card:focus-visible {
        outline: 3px solid #A6E3E9;
        outline-offset: 3px;
      }

      /* SKELETON */

      .info-card-skeleton {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 0;
        min-height: 245px;
        padding: 23px;

        background: #FFFFFF;
        border: 1px solid #D5EDEF;
        border-radius: 10px;
      }

      .info-card-skeleton-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }

      .info-card-skeleton-bottom {
        display: flex;
        align-items: center;
        margin-top: auto;
        padding-top: 14px;
      }

      .info-card-skeleton .MuiSkeleton-root {
        background-color: #E6F1F2;
      }

      /* RESPONSIVE */

      @media (max-width: 768px) {
        .info-card,
        .info-card-skeleton {
          min-height: 225px;
          padding: 20px;
        }

        .info-card-top {
          margin-bottom: 19px;
        }

        .info-card h3 {
          font-size: 18px;
        }

        .info-card p {
          font-size: 13px;
          line-height: 1.75;
        }
      }

      /* REDUCED MOTION */

      @media (prefers-reduced-motion: reduce) {
        .info-card,
        .info-card .card-link-arrow,
        .info-card-mark {
          transition: none !important;
        }

        .info-card.clickable-card:hover {
          transform: none;
        }

        .info-card-skeleton .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
