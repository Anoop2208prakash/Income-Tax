
import { useNavigate } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb";
import CalculatorCard from "../../components/CalculatorCard";

import "./tax-calculator.scss";

interface CalculatorItem {
  title: string;
  description: string;
  badge: string;
  route: string;
}

export default function TaxCalculatorPage() {
  const navigate = useNavigate();

  const calculatorItems: CalculatorItem[] = [
    {
      title: "Advance Tax Calculator",
      description:
        "Calculate total tax liability and installment-wise advance tax payable.",
      badge: "Calculator",
      route: "/tax-calculator/AdvanceTaxCalculator",
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
        "Calculate NSC interest and annual accrual-based deductions.",
      badge: "Calculator",
      route: "/NSC_calculator",
    },
    {
      title: "Section 80G",
      description:
        "Calculate deductions for eligible donations under Section 80G.",
      badge: "Calculator",
      route: "/Section80G80GGC80GGBCalculator",
    },
    {
      title: "Surcharge & Marginal Relief Calculator",
      description:
        "Calculate surcharge and marginal relief based on income and tax status.",
      badge: "Calculator",
      route: "/SurchargeMarginalReliefCalculatorStatusWise",
    },
    {
      title: "Section 234C Calculator",
      description:
        "Calculate Section 234C interest using quarterly advance tax payments.",
      badge: "Calculator",
      route: "/Section234CCalculatorAY2026_27",
    },
    {
      title: "Gratuity Calculator",
      description:
        "Calculate gratuity exemption under Section 10(10).",
      badge: "Calculator",
      route: "/taxable-gratuity-calculator",
    },
    {
      title: "Relief under Section 89 Calculator",
      description:
        "Calculate relief on salary arrears received in the current year.",
      badge: "Calculator",
      route: "/Section89ReliefCalculator",
    },
    {
      title: "Advance Tax Calculator for 2027-28",
      description:
        "Calculate estimated advance tax and quarterly installments.",
      badge: "Calculator",
      route: "/AdvanceTaxCalculatorAY2027_28",
    },
  ];

  return (
    <main className="tax-calculator-page">
      <Breadcrumb current="Tax Calculator" />

      <section className="tax-calculator-section">
        <div className="tax-calculator-container">

          {/* Hero Section */}
          <div className="tax-calculator-hero">
            <div className="tax-hero-content">
              <span className="tax-hero-eyebrow">
                <span className="status-dot" />
                INCOME TAX TOOLS
              </span>

              <h1>
                Smart Tax
                <span> Calculators</span>
              </h1>

              <p>
                Simplify your tax calculations with professional tools.
                Explore tax liability, exemptions, deductions and more
                in one place.
              </p>

              <div className="tax-hero-features">
                <span>✓ Easy calculations</span>
                <span>✓ Section-wise tools</span>
                <span>✓ Quick navigation</span>
              </div>
            </div>

            <div className="tax-hero-visual">
              <div className="tax-visual-circle circle-one" />
              <div className="tax-visual-circle circle-two" />

              <div className="tax-visual-card">
                <span className="visual-symbol">₹</span>
                <span className="visual-label">TAX PLANNING</span>
                <span className="visual-caption">
                  Calculate with confidence
                </span>
              </div>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="tax-tools-header">
            <div>
              <span className="tax-section-eyebrow">
                EXPLORE TOOLS
              </span>

              <h2>Choose Your Calculator</h2>

              <p>
                Select a calculator to get started with your tax calculation.
              </p>
            </div>

            <div className="tax-tools-count">
              <span>{calculatorItems.length}</span>
              <small>Available Tools</small>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="tax-calculator-grid">
            {calculatorItems.map((item, index) => (
              <div
                className="tax-calculator-item"
                key={item.title}
                style={{
                  animationDelay: `${index * 45}ms`,
                }}
              >
                <CalculatorCard
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  onClick={() => navigate(item.route)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Information */}
          <div className="tax-calculator-note">
            <div className="tax-note-icon">i</div>

            <div>
              <h3>Need help with tax calculations?</h3>
              <p>
                Choose the relevant calculator above to explore
                the available calculation tools.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
