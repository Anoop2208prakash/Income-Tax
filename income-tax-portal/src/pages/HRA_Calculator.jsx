import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function HraNumberField({ label, value, onChange, placeholder, min = 0, step = 1 }) {
  return (
    <BaseNumberField.Root
      value={value === "" ? null : Number(value)}
      onValueChange={(nextValue) => onChange(nextValue ?? "")}
      min={min}
      step={step}
      className="hra-number-root"
    >
      <BaseNumberField.Group className="hra-number-group">
        <span className="hra-number-currency" aria-hidden="true">₹</span>
        <BaseNumberField.Input
          className="hra-number-input"
          aria-label={label}
          placeholder={placeholder}
        />
        <div className="hra-number-controls">
          <BaseNumberField.Increment className="hra-number-stepper" aria-label={`Increase ${label}`}>+</BaseNumberField.Increment>
          <BaseNumberField.Decrement className="hra-number-stepper" aria-label={`Decrease ${label}`}>−</BaseNumberField.Decrement>
        </div>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

function HraCalculatorSkeleton() {
  return (
    <div className="hra-page">
      <div className="hra-container">
        <Skeleton variant="rounded" width={105} height={44} sx={{ mb: 3 }} />
        <div className="hra-header">
          <div className="hra-header-content">
            <Skeleton width={130} height={20} />
            <Skeleton width="65%" height={42} />
            <Skeleton width="85%" height={22} />
          </div>
          <Skeleton variant="rounded" width={210} height={105} />
        </div>
        <div className="hra-layout">
          <div className="hra-left">
            <section className="hra-card">
              <Skeleton width="35%" height={30} />
              <Skeleton width="65%" height={20} sx={{ mb: 2 }} />
              <div className="hra-form-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton width="55%" height={18} />
                    <Skeleton variant="rounded" width="100%" height={46} />
                  </div>
                ))}
              </div>
              <Skeleton variant="rounded" width="100%" height={50} sx={{ mt: 3 }} />
            </section>
          </div>
          <aside className="hra-result-panel hra-skeleton-result">
            <Skeleton variant="rounded" width="100%" height={145} />
            <Skeleton width="60%" height={24} />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width="100%" height={48} />
            ))}
            <Skeleton width="70%" height={24} />
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width="100%" height={45} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function HRA_Calculator() {
  const navigate = useNavigate();

  const initialState = {
    basicSalary: "",
    da: "",
    commission: "",
    hraReceived: "",
    rentPaid: "",
    cityType: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasCalculated(false);
  };

  const num = (val) => Number(val) || 0;

  // Existing HRA calculation logic retained.
  const result = useMemo(() => {
    const warnings = [];

    if (
      !form.basicSalary ||
      !form.hraReceived ||
      !form.rentPaid ||
      !form.cityType
    ) {
      return {
        salaryForHRA: 0,
        conditionA: 0,
        conditionB: 0,
        conditionC: 0,
        exemptHRA: 0,
        taxableHRA: 0,
        warnings: ["Please fill all required fields."],
      };
    }

    const salaryForHRA =
      num(form.basicSalary) +
      num(form.da) +
      num(form.commission);

    const conditionA =
      form.cityType === "metro"
        ? salaryForHRA * 0.5
        : salaryForHRA * 0.4;

    const conditionB = num(form.hraReceived);

    const conditionC = Math.max(
      0,
      num(form.rentPaid) - salaryForHRA * 0.1
    );

    const exemptHRA = Math.min(
      conditionA,
      conditionB,
      conditionC
    );

    const taxableHRA = Math.max(
      0,
      num(form.hraReceived) - exemptHRA
    );

    if (num(form.rentPaid) <= salaryForHRA * 0.1) {
      warnings.push(
        "Rent paid is less than or equal to 10% of salary."
      );
    }

    if (num(form.hraReceived) === 0) {
      warnings.push("No HRA received.");
    }

    return {
      salaryForHRA,
      conditionA,
      conditionB,
      conditionC,
      exemptHRA,
      taxableHRA,
      warnings,
    };
  }, [form]);

  const handleCalculate = () => {
    if (calculating) return;
    setCalculating(true);

    // Brief delay lets the button spinner render before confirming the calculation.
    window.setTimeout(() => {
      setHasCalculated(true);
      setCalculating(false);
    }, 350);
  };

  if (loading) {
    return <HraCalculatorSkeleton />;
  }

  const formatCurrency = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  return (
    <div className="hra-page">
      <div className="hra-container">
        <div className="hra-back-wrapper">
          <button
            type="button"
            className="hra-back-btn"
            onClick={() => navigate(-1)}
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
        </div>

        <header className="hra-header">
          <div className="hra-header-content">
            <span className="hra-eyebrow">SALARY TAX UTILITY</span>
            <h1>HRA Calculator</h1>
            <p>
              Calculate HRA exemption and taxable HRA under Section 10(13A).
            </p>
          </div>

          <div className="hra-header-total">
            <span>Exempt HRA</span>
            <strong>₹ {formatCurrency(result.exemptHRA)}</strong>
            <small>Calculated from your salary and rent details</small>
          </div>
        </header>

        <main className="hra-layout">
          <div className="hra-left">
            <section className="hra-card">
              <div className="hra-section-heading">
                <div className="hra-section-icon">01</div>
                <div>
                  <h2>Salary &amp; Rent Details</h2>
                  <p>Enter salary, HRA received, rent paid and city type.</p>
                </div>
              </div>

              <div className="hra-form-grid">
                <div className="hra-field">
                  <label htmlFor="hra-basic-salary">Basic Salary <span>*</span></label>
                  <HraNumberField
                    label="Basic Salary"
                    value={form.basicSalary}
                    onChange={(value) => updateField("basicSalary", value)}
                    placeholder="Enter basic salary"
                  />
                </div>

                <div className="hra-field">
                  <label htmlFor="hra-da">Dearness Allowance (DA)</label>
                  <HraNumberField
                    label="Dearness Allowance (DA)"
                    value={form.da}
                    onChange={(value) => updateField("da", value)}
                    placeholder="Enter DA forming part of salary"
                  />
                </div>

                <div className="hra-field">
                  <label htmlFor="hra-commission">Commission</label>
                  <HraNumberField
                    label="Commission"
                    value={form.commission}
                    onChange={(value) => updateField("commission", value)}
                    placeholder="Enter commission amount"
                  />
                </div>

                <div className="hra-field">
                  <label htmlFor="hra-received">HRA Received <span>*</span></label>
                  <HraNumberField
                    label="HRA Received"
                    value={form.hraReceived}
                    onChange={(value) => updateField("hraReceived", value)}
                    placeholder="Enter HRA received"
                  />
                </div>

                <div className="hra-field">
                  <label htmlFor="hra-rent-paid">Rent Paid <span>*</span></label>
                  <HraNumberField
                    label="Rent Paid"
                    value={form.rentPaid}
                    onChange={(value) => updateField("rentPaid", value)}
                    placeholder="Enter annual rent paid"
                  />
                </div>

                <div className="hra-field">
                  <label>City Type <span>*</span></label>
                  <div className="hra-city-grid">
                    <button
                      type="button"
                      onClick={() => updateField("cityType", "metro")}
                      className={`hra-city-btn ${form.cityType === "metro" ? "active" : ""}`}
                      aria-pressed={form.cityType === "metro"}
                    >
                      Metro
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("cityType", "nonMetro")}
                      className={`hra-city-btn ${form.cityType === "nonMetro" ? "active" : ""}`}
                      aria-pressed={form.cityType === "nonMetro"}
                    >
                      Non-Metro
                    </button>
                  </div>
                </div>
              </div>

              {result.warnings.length > 0 && (
                <div className="hra-warning-box">
                  <strong>Notes / Warnings</strong>
                  <ul>
                    {result.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="hra-info-box">
                <strong>Information</strong>
                <p>
                  HRA exemption is calculated as the least of actual HRA received,
                  prescribed salary percentage, and rent paid minus 10% of salary.
                </p>
              </div>
            </section>

            <div className="hra-calculate-wrapper">
              <Button
                variant="contained"
                disableElevation
                fullWidth
                onClick={handleCalculate}
                disabled={calculating}
                startIcon={
                  calculating ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : null
                }
                sx={{
                  minHeight: 50,
                  borderRadius: "12px",
                  backgroundColor: "#71c9ce",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  textTransform: "none",
                  boxShadow: "0 8px 20px rgba(113,201,206,0.16)",
                  "&:hover": {
                    backgroundColor: "#164e52",
                    boxShadow: "0 10px 24px rgba(113,201,206,0.2)",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#a6e3e9",
                    color: "#fff",
                  },
                }}
              >
                {calculating
                  ? "Calculating..."
                  : hasCalculated
                    ? "Recalculate HRA"
                    : "Calculate HRA"}
              </Button>
            </div>
          </div>

          <aside className="hra-result-panel">
            <div className="hra-result-header">
              <span className="hra-result-label">COMPUTATION SUMMARY</span>
              <h2>₹ {formatCurrency(result.exemptHRA)}</h2>
              <p>Exempt HRA</p>
              <div className="hra-result-divider" />
              <div className="hra-result-status">
                <span className="hra-status-dot" />
                {result.warnings[0] === "Please fill all required fields."
                  ? "Awaiting details"
                  : "Calculation updated"}
              </div>
            </div>

            <div className="hra-result-body">
              <h3>HRA Calculation Summary</h3>

              <div className="hra-result-item">
                <span>Salary for HRA</span>
                <strong>₹ {formatCurrency(result.salaryForHRA)}</strong>
              </div>

              <div className="hra-result-item">
                <span>50% / 40% of Salary</span>
                <strong>₹ {formatCurrency(result.conditionA)}</strong>
              </div>

              <div className="hra-result-item">
                <span>Actual HRA Received</span>
                <strong>₹ {formatCurrency(result.conditionB)}</strong>
              </div>

              <div className="hra-result-item">
                <span>Rent Paid - 10% Salary</span>
                <strong>₹ {formatCurrency(result.conditionC)}</strong>
              </div>

              <div className="hra-result-total">
                <span>Exempt HRA</span>
                <strong>₹ {formatCurrency(result.exemptHRA)}</strong>
              </div>

              <div className="hra-result-total taxable">
                <span>Taxable HRA</span>
                <strong>₹ {formatCurrency(result.taxableHRA)}</strong>
              </div>
            </div>

            <div className="hra-result-footer">
              <span>Income Tax Portal</span>
              <span>HRA Calculator · Section 10(13A)</span>
            </div>
          </aside>
        </main>
      </div>

      <style>{`
        .hra-page {
          --hra-primary: #71c9ce;
          --hra-primary-dark: #164e52;
          --hra-primary-soft: #cbf1f5;
          --hra-accent: #a6e3e9;
          --hra-accent-dark: #367f85;
          --hra-bg: #e3fdfd;
          --hra-white: #ffffff;
          --hra-text: #173b3e;
          --hra-muted: #52777a;
          --hra-border: #a6e3e9;
          min-height: 100vh;
          padding: 30px 24px 50px;
          background: var(--hra-bg);
          color: var(--hra-text);
          font-family: inherit;
          box-sizing: border-box;
        }

        .hra-page *,
        .hra-page *::before,
        .hra-page *::after { box-sizing: border-box; }

        .hra-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .hra-back-wrapper { margin-bottom: 22px; }

        .hra-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 43px;
          padding: 0 17px;
          border: 1px solid var(--hra-border);
          border-radius: 12px;
          background: var(--hra-white);
          color: var(--hra-accent-dark);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .hra-back-btn:hover {
          border-color: var(--hra-primary);
          background: var(--hra-primary-soft);
          color: var(--hra-primary-dark);
          transform: translateX(-2px);
        }

        .hra-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 28px;
          padding: 30px 34px;
          margin-bottom: 26px;
          border: 1px solid var(--hra-border);
          border-radius: 22px;
          background: var(--hra-white);
          box-shadow: 0 8px 28px rgba(22, 78, 82, 0.05);
        }

        .hra-header-content { max-width: 680px; }

        .hra-eyebrow {
          display: inline-block;
          margin-bottom: 11px;
          color: var(--hra-accent-dark);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.7px;
        }

        .hra-header h1 {
          margin: 0;
          color: var(--hra-primary);
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.8px;
        }

        .hra-header-content > p {
          max-width: 590px;
          margin: 11px 0 0;
          color: var(--hra-muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .hra-header-total {
          min-width: 210px;
          padding: 20px 23px;
          border: 1px solid rgba(166, 227, 233, 0.6);
          border-radius: 17px;
          background: #e3fdfd;
        }

        .hra-header-total span,
        .hra-header-total small {
          display: block;
          color: var(--hra-muted);
          font-size: 12px;
          font-weight: 600;
        }

        .hra-header-total strong {
          display: block;
          margin: 8px 0 5px;
          color: var(--hra-primary);
          font-size: 25px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .hra-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 355px;
          align-items: start;
          gap: 24px;
        }

        .hra-left {
          display: grid;
          gap: 20px;
          min-width: 0;
        }

        .hra-calculate-wrapper {
          width: 100%;
          margin-top: 2px;
        }

        .hra-skeleton-result {
          padding: 0;
          overflow: hidden;
        }

        .hra-skeleton-result > * {
          margin: 12px 20px;
        }

        .hra-skeleton-result > :first-child {
          margin: 0 0 18px;
        }

        .hra-card,
        .hra-result-panel {
          min-width: 0;
          border: 1px solid var(--hra-border);
          border-radius: 22px;
          background: var(--hra-white);
          box-shadow: 0 8px 28px rgba(22, 78, 82, 0.05);
        }

        .hra-card { padding: 25px; }

        .hra-section-heading {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding-bottom: 19px;
          margin-bottom: 22px;
          border-bottom: 1px solid var(--hra-border);
        }

        .hra-section-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 37px;
          height: 37px;
          border-radius: 11px;
          background: var(--hra-primary-soft);
          color: var(--hra-primary);
          font-size: 12px;
          font-weight: 800;
        }

        .hra-section-heading h2 {
          margin: 0;
          color: var(--hra-primary);
          font-size: 19px;
          font-weight: 800;
        }

        .hra-section-heading p {
          margin: 6px 0 0;
          color: var(--hra-muted);
          font-size: 13px;
          line-height: 1.6;
        }

        .hra-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 19px 17px;
        }

        .hra-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .hra-field label {
          color: var(--hra-text);
          font-size: 13px;
          font-weight: 700;
        }

        .hra-field label span { color: #b45353; }

        .hra-number-root { width: 100%; min-width: 0; }

        .hra-number-group {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 46px;
          overflow: hidden;
          border: 1px solid #cbf1f5;
          border-radius: 11px;
          background: #fff;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .hra-number-group:hover { border-color: #71c9ce; }

        .hra-number-group:focus-within {
          border-color: #71c9ce;
          box-shadow: 0 0 0 3px rgba(113, 201, 206, 0.09);
        }

        .hra-number-currency {
          flex: 0 0 auto;
          padding-left: 13px;
          color: #52777a;
          font-size: 13px;
          font-weight: 700;
        }

        .hra-number-input {
          width: 100%;
          min-width: 0;
          height: 44px;
          padding: 0 10px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #173b3e;
          font: inherit;
          font-size: 13px;
        }

        .hra-number-input::placeholder {
          color: #7daeb1;
          font-size: 12px;
          opacity: 1;
        }

        .hra-number-controls {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          border-left: 1px solid #cbf1f5;
        }

        .hra-number-stepper {
          display: grid;
          flex: 1 1 50%;
          min-width: 31px;
          place-items: center;
          padding: 0 7px;
          border: 0;
          background: #e3fdfd;
          color: #71c9ce;
          font-size: 15px;
          font-weight: 800;
          line-height: 1;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .hra-number-stepper:first-child { border-bottom: 1px solid #cbf1f5; }
        .hra-number-stepper:hover:not([data-disabled]) {
          background: #cbf1f5;
          color: #164e52;
        }
        .hra-number-stepper[data-disabled] { color: #a6c9cb; cursor: not-allowed; }

        .hra-city-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .hra-city-btn {
          min-width: 0;
          height: 46px;
          border: 1px solid var(--hra-border);
          border-radius: 12px;
          background: #e3fdfd;
          color: var(--hra-accent-dark);
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .hra-city-btn:hover,
        .hra-city-btn.active {
          border-color: var(--hra-primary);
          background: var(--hra-primary-soft);
          color: var(--hra-primary-dark);
        }

        .hra-city-btn.active { box-shadow: inset 0 0 0 1px var(--hra-primary); }

        .hra-warning-box,
        .hra-info-box {
          margin-top: 22px;
          padding: 16px;
          border: 1px solid rgba(113, 201, 206, 0.4);
          border-radius: 12px;
          background: #f3fdfd;
          color: var(--hra-muted);
        }

        .hra-warning-box strong,
        .hra-info-box strong {
          display: block;
          margin-bottom: 7px;
          color: var(--hra-primary-dark);
          font-size: 13px;
        }

        .hra-warning-box ul {
          margin: 0;
          padding-left: 18px;
        }

        .hra-warning-box li,
        .hra-info-box p {
          margin: 0;
          font-size: 12px;
          line-height: 1.7;
        }

        .hra-info-box p { margin-top: 5px; }

        .hra-result-panel {
          position: sticky;
          top: 22px;
          overflow: hidden;
        }

        .hra-result-header {
          padding: 25px;
          background: var(--hra-primary);
          color: #fff;
        }

        .hra-result-label {
          color: rgba(255, 255, 255, 0.88);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .hra-result-header h2 {
          margin: 14px 0 4px;
          color: #fff;
          font-size: 38px;
          line-height: 1.2;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .hra-result-header > p {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
        }

        .hra-result-divider {
          height: 1px;
          margin: 23px 0 16px;
          background: rgba(255, 255, 255, 0.28);
        }

        .hra-result-status {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
        }

        .hra-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e3fdfd;
        }

        .hra-result-body { padding: 23px; }

        .hra-result-body h3 {
          margin: 0 0 16px;
          color: var(--hra-primary);
          font-size: 17px;
          font-weight: 800;
        }

        .hra-result-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          padding: 15px 0;
          border-bottom: 1px solid rgba(113, 201, 206, 0.35);
        }

        .hra-result-item span {
          color: var(--hra-muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .hra-result-item strong {
          color: var(--hra-text);
          font-size: 13px;
          text-align: right;
          white-space: nowrap;
        }

        .hra-result-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 17px;
          padding: 15px;
          border: 1px solid var(--hra-border);
          border-radius: 12px;
          background: #e3fdfd;
          color: var(--hra-primary-dark);
          font-size: 13px;
          font-weight: 800;
        }

        .hra-result-total strong {
          color: var(--hra-primary);
          font-size: 17px;
          white-space: nowrap;
        }

        .hra-result-total.taxable {
          margin-top: 10px;
          background: #fff;
          border-color: #cbf1f5;
        }

        .hra-result-total.taxable strong { color: var(--hra-primary-dark); }

        .hra-result-footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 15px 20px;
          border-top: 1px solid #cbf1f5;
          color: var(--hra-muted);
          font-size: 11px;
          font-weight: 600;
        }

        @media (max-width: 1100px) {
          .hra-layout { grid-template-columns: minmax(0, 1fr) 320px; gap: 17px; }
          .hra-card { padding: 21px; }
          .hra-result-body { padding: 18px; }
        }

        @media (max-width: 900px) {
          .hra-layout { grid-template-columns: 1fr; }
          .hra-result-panel { position: static; }
          .hra-result-body { padding: 23px; }
          .hra-result-header { padding: 25px; }
        }

        @media (max-width: 650px) {
          .hra-page { padding: 18px 13px 35px; }
          .hra-header { flex-direction: column; align-items: stretch; padding: 23px 19px; }
          .hra-header-total { width: 100%; }
          .hra-form-grid { grid-template-columns: 1fr; }
          .hra-card { padding: 19px 16px; }
          .hra-section-heading { gap: 11px; }
          .hra-section-heading h2 { font-size: 17px; }
          .hra-result-footer { flex-direction: column; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hra-back-btn,
          .hra-city-btn,
          .hra-number-group,
          .hra-number-stepper { transition: none; }
        }
      `}</style>
    </div>
  );
}
