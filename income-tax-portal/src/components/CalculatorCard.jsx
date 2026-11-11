
import Skeleton from "@mui/material/Skeleton";
import InfoCard from "./InfoCard";

/* CALCULATOR CARD SKELETON */

export function CalculatorCardSkeleton({ count = 1 }) {
  return (
    <>
      <CalculatorCardStyles />

      {Array.from({ length: count }).map((_, index) => (
        <div className="calculator-card-wrapper" key={index}>
          <div className="calculator-card-skeleton">
            <div className="calculator-skeleton-top">
              <Skeleton variant="rounded" width={46} height={46} />
              <Skeleton variant="rounded" width={76} height={25} />
            </div>

            <Skeleton
              variant="text"
              width="72%"
              height={32}
              sx={{ mt: 2 }}
            />

            <Skeleton variant="text" width="100%" height={21} />
            <Skeleton variant="text" width="88%" height={21} />
            <Skeleton variant="text" width="55%" height={21} />

            <div className="calculator-skeleton-bottom">
              <Skeleton variant="text" width={90} height={24} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* CALCULATOR CARD */

export default function CalculatorCard({
  title,
  description,
  badge,
  onClick,
}) {
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <>
      <CalculatorCardStyles />

      <div
        className="calculator-card-wrapper"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${title} calculator`}
      >
        <div className="calculator-card-inner">
          <InfoCard
            title={title}
            description={description}
            badge={badge}
          />
        </div>
      </div>
    </>
  );
}

/* SHARED STYLES */

function CalculatorCardStyles() {
  return (
    <style>{`
      .calculator-card-wrapper {
        --calculator-primary: #71C9CE;
        --calculator-highlight: #A6E3E9;
        --calculator-secondary: #CBF1F5;
        --calculator-background: #E3FDFD;
        --calculator-text: #173D43;
        --calculator-muted: #647C80;
        --calculator-border: #D5EDEF;

        width: 100%;
        height: 100%;
        min-width: 0;
        display: flex;
        align-self: stretch;
      }

      /* GRID ALIGNMENT */

      .card-grid {
        align-items: stretch !important;
      }

      .card-grid > * {
        align-self: stretch !important;
        height: auto !important;
        min-height: 100%;
      }

      /* CARD WRAPPER */

      .calculator-card-inner {
        width: 100%;
        height: 100%;
        min-width: 0;
        display: flex;
        align-items: stretch;
      }

      .calculator-card-inner > .info-card {
        width: 100%;
        height: 100%;
        min-height: 215px;
        display: flex;
        flex-direction: column;
        padding: 25px 23px;
        border: 1px solid var(--calculator-border);
        border-radius: 10px;
        background: #FFFFFF;
        box-shadow: 0 3px 12px rgba(23, 61, 67, .025);
        transition:
          border-color .2s ease,
          box-shadow .2s ease,
          transform .2s ease;
      }

      /* HOVER */

      .calculator-card-wrapper[role="button"] {
        cursor: pointer;
        outline: none;
      }

      .calculator-card-wrapper[role="button"]:hover .info-card {
        border-color: var(--calculator-primary);
        box-shadow: 0 8px 22px rgba(23, 61, 67, .08);
        transform: translateY(-3px);
      }

      .calculator-card-wrapper[role="button"]:focus-visible .info-card {
        outline: 3px solid rgba(113, 201, 206, .35);
        outline-offset: 3px;
        border-color: var(--calculator-primary);
      }

      .calculator-card-inner .info-card h3 {
        color: var(--calculator-text);
        font-size: 19px;
        line-height: 1.45;
      }

      .calculator-card-inner .info-card p {
        color: var(--calculator-muted);
        font-size: 14px;
        line-height: 1.8;
      }

      /* SKELETON */

      .calculator-card-skeleton {
        width: 100%;
        height: 100%;
        min-height: 215px;
        padding: 25px 23px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #FFFFFF;
        border: 1px solid var(--calculator-border);
        border-radius: 10px;
      }

      .calculator-skeleton-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .calculator-card-wrapper .MuiSkeleton-root {
        background-color: #E6F1F2;
      }

      .calculator-skeleton-bottom {
        margin-top: auto;
        padding-top: 10px;
      }

      /* RESPONSIVE */

      @media (max-width: 600px) {
        .calculator-card-inner > .info-card {
          min-height: 190px;
          padding: 22px 20px;
        }

        .calculator-card-skeleton {
          min-height: 190px;
          padding: 22px 20px;
        }
      }

      /* REDUCED MOTION */

      @media (prefers-reduced-motion: reduce) {
        .calculator-card-inner > .info-card {
          transition: none;
        }

        .calculator-card-wrapper[role="button"]:hover .info-card {
          transform: none;
        }

        .calculator-card-wrapper .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
