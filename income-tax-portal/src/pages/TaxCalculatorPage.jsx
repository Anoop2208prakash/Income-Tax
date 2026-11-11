
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import CalculatorCard, {
  CalculatorCardSkeleton,
} from "../components/CalculatorCard";

const calculatorItems = [
  {
    title: "Advance Tax Calculator",
    description:
      "Calculate total tax liability and installment-wise advance tax payable.",
    badge: "Calculator",
    route: "/AdvanceTaxCalculator",
  },
  {
    title: "HRA Calculator",
    description:
      "Calculate House Rent Allowance exemption and taxable HRA amount.",
    badge: "Calculator",
    route: "/HRA_Calculator",
  },
  {
    title: "Leave Encashment Calculator",
    description:
      "Calculate leave encashment exemption and taxable amount.",
    badge: "Calculator",
    route: "/LeaveEncashmentCalculator",
  },
  {
    title: "TDS Calculator",
    description:
      "Calculate TDS liability section-wise with applicable rate.",
    badge: "Calculator",
    route: "/tds-calculator",
  },
  {
    title: "TCS Calculator",
    description:
      "Calculate tax collected at source on applicable transactions.",
    badge: "Calculator",
    route: "/tcs-calculator",
  },
  {
    title: "Partner Remuneration Calculator",
    description:
      "Calculate allowable partner salary and remuneration.",
    badge: "Calculator",
    route: "/Partner-Remuneration-calculator",
  },
  {
    title: "AMT and MAT Calculator",
    description:
      "Calculate Alternate Minimum Tax and Minimum Alternate Tax.",
    badge: "Calculator",
    route: "/AMT_MAT_Calculator",
  },
  {
    title: "Capital Gain Exemption Calculator",
    description:
      "Calculate exemption available under capital gain provisions.",
    badge: "Calculator",
    route: "/CapitalGainExemptionCalculator",
  },
  {
    title: "Period Of Holding Calculator",
    description:
      "Check asset holding period for short term or long term capital gain.",
    badge: "Calculator",
    route: "/PeriodOfHoldingCalculator",
  },
  {
    title: "NSC Calculator",
    description:
      "Interest on NSC is taxable on annual accrual basis. The same will be treated as an investment during the year of accrual and will qualify for deduction under section 80C.",
    badge: "Calculator",
    route: "/NSC_calculator",
  },
  {
    title: "Section 80G",
    description:
      "Calculate the deduction available for eligible donations under Section 80G of the Income Tax Act based on donation category and applicable qualifying limits.",
    badge: "Calculator",
    route: "/Section80G80GGC80GGBCalculator",
  },
  {
    title: "Surcharge & Marginal Relief Calculator",
    description:
      "Calculate applicable surcharge and marginal relief based on Assessment Year, status, income range, and tax payable.",
    badge: "Calculator",
    route: "/SurchargeMarginalReliefCalculatorStatusWise",
  },
  {
    title: "Section 234C Calculator",
    description:
      "Calculate Section 234C interest for AY 2026-27 with quarter-wise income, tax liability, advance tax paid, TDS/credit adjustment and installment-wise shortfall working.",
    badge: "Calculator",
    route: "/Section234CCalculatorAY2026_27",
  },
  {
    title: "Gratuity Calculator",
    description:
      "Calculate gratuity exemption under Section 10(10) for Government, Statutory Corporation, Local Authority, and Other Employees.",
    badge: "Calculator",
    route: "/taxable-gratuity-calculator",
  },
  {
    title: "Relief under Section 89 Calculator",
    description:
      "This relief is allowed when an employee receives past dues in the current year. As the amount is taxable in the current year, Section 89 aims to provide relief from additional tax paid in the current year on past years' income.",
    badge: "Calculator",
    route: "/Section89ReliefCalculator",
  },
  {
    title: "Advance Tax Calculator for 2027-28",
    description:
      "Calculate your advance tax accurately based on your estimated annual income. Track due dates, schedule your quarterly installments, and avoid interest or penalties under Sections 234B and 234C.",
    badge: "Calculator",
    route: "/AdvanceTaxCalculatorAY2027_28",
  },
];

function TaxCalculatorSkeleton() {
  return (
    <div className="tax-calculator-page">
      <section className="tax-calculator-hero">
        <div className="tax-calculator-container">
          <Skeleton variant="text" width={110} height={24} />
          <Skeleton variant="text" width="45%" height={58} />
          <Skeleton variant="text" width="60%" height={25} />
          <Skeleton variant="text" width="42%" height={25} />
        </div>
      </section>

      <section className="tax-calculator-content">
        <div className="tax-calculator-container">
          <div className="tax-calculator-heading-skeleton">
            <Skeleton variant="text" width={140} height={25} />
            <Skeleton variant="text" width={260} height={36} />
            <Skeleton variant="text" width="55%" height={22} />
          </div>

          <div className="tax-calculator-toolbar-skeleton">
            <Skeleton variant="rounded" width="100%" height={48} />
            <Skeleton variant="rounded" width={130} height={40} />
          </div>

          <div className="tax-calculator-grid">
            <CalculatorCardSkeleton count={6} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function TaxCalculatorPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, []);

  const filteredCalculators = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return calculatorItems;

    return calculatorItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }, [searchTerm]);

  if (isLoading) {
    return (
      <>
        <TaxCalculatorStyles />
        <TaxCalculatorSkeleton />
      </>
    );
  }

  return (
    <>
      <TaxCalculatorStyles />

      <div className="tax-calculator-page">
        {/* HERO */}

        <section className="tax-calculator-hero">
          <div className="tax-calculator-container">
            <div className="tax-calculator-eyebrow">
              <span className="tax-calculator-eyebrow-line" />
              TAX TOOLS & RESOURCES
            </div>

            <h1 className="tax-calculator-main-title">
              Tax calculators
              <span> made simpler.</span>
            </h1>

            <p className="tax-calculator-hero-description">
              Access a collection of tax calculators to estimate tax
              liability, exemptions, deductions and other tax-related
              calculations.
            </p>

            <div className="tax-calculator-hero-bottom">
              <span className="tax-calculator-hero-dot" />
              Simple calculations. Useful insights. Better understanding.
            </div>
          </div>
        </section>

        {/* CALCULATOR CONTENT */}

        <section className="tax-calculator-content">
          <div className="tax-calculator-container">
            <div className="tax-calculator-section-heading">
              <div>
                <span className="tax-calculator-section-label">
                  CALCULATOR COLLECTION
                </span>

                <h2>Explore tax calculators</h2>
              </div>

              <p>
                Select a calculator to get started with your
                tax-related calculations.
              </p>
            </div>

            {/* SEARCH AND COUNT */}

            <div className="tax-calculator-toolbar">
              <div className="tax-calculator-search">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m16 16 4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  type="search"
                  placeholder="Search calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search tax calculators"
                />

                {searchTerm && (
                  <button
                    type="button"
                    className="tax-calculator-clear"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="tax-calculator-count">
                <span className="tax-calculator-count-number">
                  {filteredCalculators.length}
                </span>
                <span>
                  {filteredCalculators.length === 1
                    ? "Calculator"
                    : "Calculators"}
                </span>
              </div>
            </div>

            {/* CALCULATOR GRID */}

            {filteredCalculators.length > 0 ? (
              <div className="tax-calculator-grid">
                {filteredCalculators.map((item) => (
                  <CalculatorCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    badge={item.badge}
                    onClick={() => navigate(item.route)}
                  />
                ))}
              </div>
            ) : (
              <div className="tax-calculator-empty">
                <div className="tax-calculator-empty-mark">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="m16 16 4 4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h3>No calculators found</h3>

                <p>
                  We couldn't find a calculator matching "{searchTerm}".
                  Try another search term.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* BOTTOM NOTE */}

            <div className="tax-calculator-bottom-note">
              <div className="tax-calculator-note-mark">i</div>

              <div>
                <h3>Choose the right calculator</h3>
                <p>
                  Select the relevant calculator to access its
                  calculation features and enter the required details.
                  Review the applicable provisions before relying on
                  any calculated result.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function TaxCalculatorStyles() {
  return (
    <style>{`
      .tax-calculator-page {
        --tax-primary: #0f3d75;
        --tax-primary-dark: #08213f;
        --tax-primary-soft: #eaf2ff;
        --tax-accent: #d4a63f;
        --tax-accent-dark: #b88924;
        --tax-accent-soft: #fff5de;
        --tax-bg: #f4f8fc;
        --tax-bg-soft: #edf4fb;
        --tax-text: #162433;
        --tax-muted: #64748b;
        --tax-border: #dbe7f3;

        width: 100%;
        min-height: 100%;
        color: var(--tax-text);
        background: #FFFFFF;
      }

      .tax-calculator-page *,
      .tax-calculator-page *::before,
      .tax-calculator-page *::after {
        box-sizing: border-box;
      }

      .tax-calculator-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }

      /* HERO */

      .tax-calculator-hero {
        position: relative;
        overflow: hidden;
        padding: 76px 24px 68px;
        background: #f4f8fc;
        border-bottom: 1px solid #e3ebf5;
      }

      .tax-calculator-hero::after {
        content: "";
        position: absolute;
        top: -120px;
        right: -85px;
        width: 370px;
        height: 370px;
        border: 1px solid rgba(15, 61, 117, .12);
        border-radius: 50%;
        pointer-events: none;
      }

      .tax-calculator-eyebrow {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        color: var(--tax-primary);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 1.5px;
      }

      .tax-calculator-eyebrow-line {
        width: 27px;
        height: 2px;
        background: var(--tax-accent);
      }

      .tax-calculator-main-title {
        max-width: 800px;
        margin: 0;
        color: var(--tax-primary-dark);
        font-size: clamp(36px, 5vw, 58px);
        font-weight: 800;
        line-height: 1.13;
        letter-spacing: -2px;
      }

      .tax-calculator-main-title span {
        display: block;
        color: var(--tax-primary);
      }

      .tax-calculator-hero-description {
        max-width: 660px;
        margin: 22px 0 0;
        color: var(--tax-muted);
        font-size: 16px;
        line-height: 1.85;
      }

      .tax-calculator-hero-bottom {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        color: #536b84;
        font-size: 13px;
        font-weight: 600;
      }

      .tax-calculator-hero-dot {
        width: 8px;
        height: 8px;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--tax-accent);
      }

      /* CONTENT */

      .tax-calculator-content {
        padding: 65px 24px 80px;
        background: #FFFFFF;
      }

      .tax-calculator-section-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 25px;
        margin-bottom: 28px;
      }

      .tax-calculator-section-label {
        display: block;
        margin-bottom: 9px;
        color: var(--tax-primary);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1.3px;
      }

      .tax-calculator-section-heading h2 {
        margin: 0;
        color: var(--tax-primary-dark);
        font-size: 30px;
        font-weight: 800;
        letter-spacing: -.8px;
      }

      .tax-calculator-section-heading > p {
        max-width: 380px;
        margin: 0 0 3px;
        color: var(--tax-muted);
        font-size: 14px;
        line-height: 1.7;
      }

      /* SEARCH TOOLBAR */

      .tax-calculator-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 28px;
      }

      .tax-calculator-search {
        width: 100%;
        max-width: 460px;
        height: 48px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 15px;
        background: #FFFFFF;
        border: 1px solid var(--tax-border);
        border-radius: 9px;
        transition: border-color .2s ease, box-shadow .2s ease;
      }

      .tax-calculator-search:focus-within {
        border-color: var(--tax-primary);
        box-shadow: 0 0 0 3px rgba(15, 61, 117, .08);
      }

      .tax-calculator-search svg {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
        color: #8294a8;
      }

      .tax-calculator-search input {
        width: 100%;
        min-width: 0;
        height: 100%;
        padding: 0;
        border: none;
        outline: none;
        background: transparent;
        color: var(--tax-text);
        font: inherit;
        font-size: 13px;
      }

      .tax-calculator-search input::placeholder {
        color: #94a3b8;
      }

      .tax-calculator-clear {
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        border: none;
        border-radius: 5px;
        background: var(--tax-bg-soft);
        color: var(--tax-muted);
        font-size: 19px;
        cursor: pointer;
      }

      .tax-calculator-count {
        display: flex;
        align-items: center;
        gap: 9px;
        color: var(--tax-muted);
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
      }

      .tax-calculator-count-number {
        display: grid;
        place-items: center;
        min-width: 34px;
        height: 34px;
        padding: 0 8px;
        color: var(--tax-primary);
        background: var(--tax-primary-soft);
        border: 1px solid #dce9fa;
        border-radius: 7px;
        font-size: 13px;
        font-weight: 800;
      }

      /* GRID */

      .tax-calculator-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
        align-items: stretch;
        width: 100%;
      }

      .tax-calculator-grid > * {
        min-width: 0;
        height: 100%;
        align-self: stretch;
      }

      .tax-calculator-grid .calculator-card-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-self: stretch;
      }

      /* EMPTY STATE */

      .tax-calculator-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 280px;
        padding: 40px 20px;
        text-align: center;
        background: #f8fbff;
        border: 1px dashed #cbd9e9;
        border-radius: 12px;
      }

      .tax-calculator-empty-mark {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        margin-bottom: 15px;
        color: var(--tax-primary);
        background: var(--tax-primary-soft);
        border-radius: 10px;
      }

      .tax-calculator-empty-mark svg {
        width: 23px;
        height: 23px;
      }

      .tax-calculator-empty h3 {
        margin: 0 0 8px;
        color: var(--tax-primary-dark);
        font-size: 18px;
      }

      .tax-calculator-empty p {
        max-width: 390px;
        margin: 0;
        color: var(--tax-muted);
        font-size: 13px;
        line-height: 1.7;
      }

      .tax-calculator-empty button {
        margin-top: 18px;
        padding: 10px 17px;
        color: #FFFFFF;
        background: var(--tax-primary);
        border: none;
        border-radius: 7px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: background .2s ease;
      }

      .tax-calculator-empty button:hover {
        background: var(--tax-primary-dark);
      }

      /* BOTTOM NOTE */

      .tax-calculator-bottom-note {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-top: 42px;
        padding: 24px 26px;
        background: #f4f8fc;
        border: 1px solid #e1eaf4;
        border-radius: 9px;
      }

      .tax-calculator-note-mark {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
        color: #7a5610;
        background: var(--tax-accent-soft);
        border-radius: 7px;
        font-size: 17px;
        font-weight: 800;
      }

      .tax-calculator-bottom-note h3 {
        margin: 0 0 5px;
        color: var(--tax-primary-dark);
        font-size: 15px;
        font-weight: 750;
      }

      .tax-calculator-bottom-note p {
        margin: 0;
        color: var(--tax-muted);
        font-size: 13px;
        line-height: 1.7;
      }

      /* SKELETON */

      .tax-calculator-page .MuiSkeleton-root {
        background-color: #e4ecf5;
      }

      .tax-calculator-heading-skeleton {
        min-height: 100px;
        margin-bottom: 28px;
      }

      .tax-calculator-toolbar-skeleton {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 28px;
      }

      /* RESPONSIVE */

      @media (max-width: 1024px) {
        .tax-calculator-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .tax-calculator-hero {
          padding-top: 60px;
          padding-bottom: 55px;
        }
      }

      @media (max-width: 700px) {
        .tax-calculator-section-heading {
          align-items: flex-start;
          flex-direction: column;
          gap: 12px;
        }
      }

      @media (max-width: 640px) {
        .tax-calculator-hero {
          padding: 46px 18px 42px;
        }

        .tax-calculator-main-title {
          font-size: 38px;
          letter-spacing: -1.4px;
        }

        .tax-calculator-hero-description {
          margin-top: 17px;
          font-size: 14px;
        }

        .tax-calculator-hero-bottom {
          align-items: flex-start;
          font-size: 12px;
          line-height: 1.6;
        }

        .tax-calculator-content {
          padding: 43px 16px 52px;
        }

        .tax-calculator-section-heading h2 {
          font-size: 26px;
        }

        .tax-calculator-toolbar {
          align-items: stretch;
          flex-direction: column;
          gap: 13px;
        }

        .tax-calculator-search {
          max-width: none;
        }

        .tax-calculator-count {
          align-self: flex-start;
        }

        .tax-calculator-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .tax-calculator-bottom-note {
          margin-top: 28px;
          padding: 19px;
        }

        .tax-calculator-toolbar-skeleton {
          align-items: stretch;
          flex-direction: column;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .tax-calculator-search,
        .tax-calculator-empty button {
          transition: none;
        }

        .tax-calculator-page .MuiSkeleton-root {
          animation: none;
        }
      }
    `}</style>
  );
}
