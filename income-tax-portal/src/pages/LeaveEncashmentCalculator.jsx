import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";

const theme = {
  pale: "#E3FDFD",
  light: "#CBF1F5",
  mid: "#A6E3E9",
  teal: "#71C9CE",
  ink: "#173B3E",
  deep: "#164E52",
  muted: "#52777A",
};

const fieldSx = {
  width: "100%",
  "& .MuiInputLabel-root": { color: theme.muted },
  "& .MuiInputLabel-root.Mui-focused": { color: theme.deep },
  "& .MuiOutlinedInput-root": {
    borderRadius: "13px",
    backgroundColor: "#FFFFFF",
    color: theme.ink,
    "& fieldset": { borderColor: "#B9DDE0" },
    "&:hover fieldset": { borderColor: theme.teal },
    "&.Mui-focused fieldset": { borderColor: theme.deep, borderWidth: 1.5 },
  },
  "& .MuiSelect-icon": { color: theme.deep },
};

function NumberInput({ label, value, onChange, placeholder, min = 0, step = 1 }) {
  return (
    <div className="le-field">
      <label>{label}</label>
      <BaseNumberField.Root
        value={value === "" ? null : Number(value)}
        onValueChange={(nextValue) => onChange(nextValue == null ? "" : String(nextValue))}
        min={min}
        step={step}
        className="le-number-root"
      >
        <BaseNumberField.Group className="le-number-group">
          <BaseNumberField.Input
            aria-label={label}
            placeholder={placeholder}
            className="le-number-input"
          />
          <div className="le-number-steppers">
            <BaseNumberField.Increment className="le-number-step" aria-label={`Increase ${label}`}>
              +
            </BaseNumberField.Increment>
            <BaseNumberField.Decrement className="le-number-step" aria-label={`Decrease ${label}`}>
              −
            </BaseNumberField.Decrement>
          </div>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div className="le-field">
      <label>{label}</label>
      <TextField
        select
        fullWidth
        size="small"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={fieldSx}
        inputProps={{ "aria-label": label }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

function CalculatorSkeleton() {
  return (
    <div className="le-modern-page">
      <div className="le-modern-container">
        <div className="le-skeleton-header">
          <div style={{ flex: 1 }}>
            <Skeleton width={150} height={20} />
            <Skeleton width="65%" height={44} />
            <Skeleton width="85%" height={24} />
          </div>
          <Skeleton variant="rounded" width={150} height={76} />
        </div>
        <div className="le-modern-grid">
          <div className="le-modern-card">
            <Skeleton width="35%" height={30} />
            <Skeleton width="55%" height={20} sx={{ mb: 3 }} />
            <div className="le-skeleton-fields">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Skeleton width="55%" height={18} />
                  <Skeleton variant="rounded" height={48} />
                </div>
              ))}
            </div>
            <Skeleton variant="rounded" width={120} height={44} sx={{ mt: 3 }} />
          </div>
          <div className="le-result-panel le-skeleton-result">
            <Skeleton width="55%" height={20} />
            <Skeleton width="75%" height={42} />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} height={42} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeaveEncashmentCalculator() {
  const navigate = useNavigate();
  const initialState = {
    govtEmployee: "no",
    retirementCase: "yes",
    avgBasicSalary: "",
    avgDA: "",
    avgCommission: "",
    daEligibleForRetirement: "yes",
    commissionEligible: "yes",
    serviceYears: "",
    earnedLeaveDays: "",
    leaveAvailedDays: "",
    leaveSalaryReceived: "",
    retirementYear: "",
    previousExemptionClaimed: "",
  };

  const [f, setF] = useState(initialState);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsInitialLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, []);

  const updateField = (key, value) => {
    setF((prev) => ({ ...prev, [key]: value }));
  };

  const num = (value) => Number(value) || 0;
  const roundOff = (value) => Math.round(Number(value) || 0);

  // Calculation logic retained from the supplied component.
  const result = useMemo(() => {
    let warnings = [];

    if (!f.leaveSalaryReceived) {
      return {
        exemptLeaveEncashment: 0,
        taxableLeaveEncashment: 0,
        averageSalary: 0,
        warnings,
      };
    }

    const eligibleDA =
      f.daEligibleForRetirement === "yes" ? num(f.avgDA) : 0;
    const eligibleCommission =
      f.commissionEligible === "yes" ? num(f.avgCommission) : 0;
    const averageSalary =
      num(f.avgBasicSalary) + eligibleDA + eligibleCommission;

    let exemptLeaveEncashment = 0;
    let taxableLeaveEncashment = 0;

    if (f.retirementCase === "no") {
      exemptLeaveEncashment = 0;
      taxableLeaveEncashment = num(f.leaveSalaryReceived);
    } else {
      if (f.govtEmployee === "yes") {
        exemptLeaveEncashment = num(f.leaveSalaryReceived);
        taxableLeaveEncashment = 0;
      } else {
        const maxLeaveAllowed = num(f.serviceYears) * 30;
        const leaveAtCredit = Math.max(
          0,
          num(f.earnedLeaveDays) - num(f.leaveAvailedDays)
        );
        const leaveDaysConsidered = Math.min(
          leaveAtCredit,
          maxLeaveAllowed
        );
        const leaveConditionA = (averageSalary / 30) * leaveDaysConsidered;
        const leaveConditionB = averageSalary * 10;
        const statutoryLimit =
          num(f.retirementYear) >= 2023 ? 2500000 : 300000;
        const leaveConditionC = Math.max(
          0,
          statutoryLimit - num(f.previousExemptionClaimed)
        );
        const leaveConditionD = num(f.leaveSalaryReceived);

        exemptLeaveEncashment = Math.min(
          leaveConditionA,
          leaveConditionB,
          leaveConditionC,
          leaveConditionD
        );
        taxableLeaveEncashment = Math.max(
          0,
          leaveConditionD - exemptLeaveEncashment
        );
      }
    }

    return {
      averageSalary: roundOff(averageSalary),
      exemptLeaveEncashment: roundOff(exemptLeaveEncashment),
      taxableLeaveEncashment: roundOff(taxableLeaveEncashment),
      warnings,
    };
  }, [f]);

  const showRetirementFields =
    f.retirementCase === "yes" && f.govtEmployee === "no";

  const handleCalculate = () => {
    if (!f.leaveSalaryReceived) {
      setHasCalculated(false);
      return;
    }
    setIsCalculating(true);
    window.setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
    }, 650);
  };

  const handleReset = () => {
    setF(initialState);
    setHasCalculated(false);
    setIsCalculating(false);
  };

  const formatINR = (value) =>
    Number(value || 0).toLocaleString("en-IN");

  if (isInitialLoading) return <CalculatorSkeleton />;

  return (
    <div className="le-modern-page">
      <div className="le-modern-container">
        <header className="le-modern-header">
          <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              className="le-back-button"
              startIcon={<span aria-hidden="true">←</span>}
            >
              Back
            </Button>
          <div className="le-header-content">
            
            <p className="le-modern-kicker">Salary Tax Utility</p>
            <h1>Leave Encashment Calculator</h1>
            <p>
              Calculate exempt and taxable leave encashment under Section
              10(10AA).
            </p>
          </div>
          <div className="le-modern-badge">
            <span>INCOME TAX SECTION</span>
            <strong>10(10AA)</strong>
          </div>
        </header>

        <div className="le-modern-grid">
          <section className="le-modern-card">
            <div className="le-section-title">
              <div>
                <h2>Employee Details</h2>
                <p>Select employee type and retirement status</p>
              </div>
              <span className="le-step-label">01 / DETAILS</span>
            </div>

            <div className="le-form-grid">
              <SelectInput
                label="Government Employee"
                value={f.govtEmployee}
                onChange={(value) => updateField("govtEmployee", value)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <SelectInput
                label="Encashment on Retirement"
                value={f.retirementCase}
                onChange={(value) => updateField("retirementCase", value)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </div>

            <div className="le-section-title small">
              <div>
                <h2>Salary Details</h2>
                <p>Average salary for the last 10 months</p>
              </div>
              <span className="le-step-label">02 / SALARY</span>
            </div>

            <div className="le-form-grid">
              <NumberInput
                label="Average Basic Salary (₹)"
                value={f.avgBasicSalary}
                onChange={(value) => updateField("avgBasicSalary", value)}
                placeholder="Enter amount"
              />
              <NumberInput
                label="Average Dearness Allowance (₹)"
                value={f.avgDA}
                onChange={(value) => updateField("avgDA", value)}
                placeholder="Enter amount"
              />
              <SelectInput
                label="DA forms part of retirement benefits"
                value={f.daEligibleForRetirement}
                onChange={(value) => updateField("daEligibleForRetirement", value)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <NumberInput
                label="Average Commission (₹)"
                value={f.avgCommission}
                onChange={(value) => updateField("avgCommission", value)}
                placeholder="Enter amount"
              />
              <SelectInput
                label="Commission as % of turnover"
                value={f.commissionEligible}
                onChange={(value) => updateField("commissionEligible", value)}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </div>

            {showRetirementFields && (
              <>
                <div className="le-section-title small">
                  <div>
                    <h2>Leave Credit Details</h2>
                    <p>Applicable for non-government employees on retirement</p>
                  </div>
                  <span className="le-step-label">03 / LEAVE</span>
                </div>
                <div className="le-form-grid">
                  <NumberInput
                    label="Completed Years of Service"
                    value={f.serviceYears}
                    onChange={(value) => updateField("serviceYears", value)}
                    placeholder="Enter years"
                  />
                  <NumberInput
                    label="Earned Leave Days"
                    value={f.earnedLeaveDays}
                    onChange={(value) => updateField("earnedLeaveDays", value)}
                    placeholder="Enter days"
                  />
                  <NumberInput
                    label="Leave Availed Days"
                    value={f.leaveAvailedDays}
                    onChange={(value) => updateField("leaveAvailedDays", value)}
                    placeholder="Enter days"
                  />
                  <NumberInput
                    label="Retirement Year"
                    value={f.retirementYear}
                    onChange={(value) => updateField("retirementYear", value)}
                    placeholder="e.g. 2025"
                    min={1900}
                    step={1}
                  />
                  <NumberInput
                    label="Previous Exemption Claimed (₹)"
                    value={f.previousExemptionClaimed}
                    onChange={(value) => updateField("previousExemptionClaimed", value)}
                    placeholder="Enter amount"
                  />
                </div>
              </>
            )}

            <div className="le-section-title small">
              <div>
                <h2>Leave Encashment Received</h2>
                <p>Enter the actual leave salary received</p>
              </div>
              <span className="le-step-label">04 / AMOUNT</span>
            </div>

            <div className="le-form-grid">
              <NumberInput
                label="Amount Received (₹) *"
                value={f.leaveSalaryReceived}
                onChange={(value) => updateField("leaveSalaryReceived", value)}
                placeholder="Enter amount received"
              />
            </div>

            {hasCalculated && !f.leaveSalaryReceived && (
              <Alert severity="warning" sx={{ mt: 2, borderRadius: 2 }}>
                Please enter the leave encashment amount received.
              </Alert>
            )}

            {result.warnings.length > 0 && (
              <Alert severity="warning" sx={{ mt: 2, borderRadius: 2 }}>
                {result.warnings.map((warning, index) => (
                  <div key={index}>{warning}</div>
                ))}
              </Alert>
            )}

            <div className="le-info-box">
              <strong>Information</strong>
              <p>
                For non-government employees, exemption is calculated as the
                least of the prescribed limits. During service, leave
                encashment is fully taxable.
              </p>
            </div>

            <div className="le-modern-actions">
              <Button
                variant="outlined"
                onClick={handleReset}
                disabled={isCalculating}
                className="le-reset-button"
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={handleCalculate}
                disabled={isCalculating || !f.leaveSalaryReceived}
                className="le-calculate-button"
                startIcon={
                  isCalculating ? (
                    <CircularProgress size={17} thickness={5} color="inherit" />
                  ) : null
                }
              >
                {isCalculating ? "Calculating..." : "Calculate"}
              </Button>
            </div>
          </section>

          <aside className="le-result-panel">
            <div className="le-result-head">
              <p>Computation Summary</p>
              <h2>
                ₹ {hasCalculated ? formatINR(result.taxableLeaveEncashment) : "—"}
              </h2>
              <span>Taxable Leave Encashment</span>
              {!hasCalculated && (
                <small>Enter the details and select Calculate</small>
              )}
            </div>

            <div className="le-result-list">
              <div className="le-result-item">
                <span>Average Salary</span>
                <strong>
                  ₹ {hasCalculated ? formatINR(result.averageSalary) : "—"}
                </strong>
              </div>
              <div className="le-result-item">
                <span>Leave Salary Received</span>
                <strong>
                  ₹ {hasCalculated ? formatINR(f.leaveSalaryReceived) : "—"}
                </strong>
              </div>
              <div className="le-result-item">
                <span>Exempt Amount</span>
                <strong>
                  ₹ {hasCalculated ? formatINR(result.exemptLeaveEncashment) : "—"}
                </strong>
              </div>
              <div className="le-result-item">
                <span>Government Employee</span>
                <strong>{f.govtEmployee === "yes" ? "Yes" : "No"}</strong>
              </div>
              <div className="le-result-item">
                <span>Retirement Case</span>
                <strong>{f.retirementCase === "yes" ? "Yes" : "No"}</strong>
              </div>
              <div className="le-result-item final">
                <span>Taxable Amount</span>
                <strong>
                  ₹ {hasCalculated ? formatINR(result.taxableLeaveEncashment) : "—"}
                </strong>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .le-modern-page {
          min-height: 100vh;
          padding: 32px;
          color: ${theme.ink};
          background: linear-gradient(145deg, ${theme.pale} 0%, #F7FEFE 48%, ${theme.light} 100%);
          font-family: Inter, Arial, sans-serif;
        }
        .le-modern-container { max-width: 1320px; margin: 0 auto; }
        .le-modern-header {
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          margin-bottom: 24px; padding: 28px 30px; border: 1px solid #B9E5E8;
          border-radius: 22px; background: rgba(255,255,255,.88);
          box-shadow: 0 12px 34px rgba(22,78,82,.07);
        }
        .le-header-content { min-width: 0; }
        .le-back-button.MuiButton-root {
          min-height: 36px; margin-bottom: 16px; padding: 0 14px;
          border-color: #A8D8DC; border-radius: 10px;
          color: ${theme.deep}; font-size: 13px; font-weight: 700;
          text-transform: none;
        }
        .le-back-button.MuiButton-root:hover {
          border-color: ${theme.deep}; background: ${theme.pale};
        }
        .le-modern-kicker {
          margin: 0 0 8px; color: ${theme.deep}; font-size: 11px;
          font-weight: 800; letter-spacing: 1.8px; text-transform: uppercase;
        }
        .le-modern-header h1 { margin: 0; color: ${theme.ink}; font-size: clamp(26px, 3vw, 36px); line-height: 1.15; }
        .le-modern-header p:not(.le-modern-kicker) { margin: 10px 0 0; color: ${theme.muted}; font-size: 14px; }
        .le-modern-badge {
          min-width: 165px; padding: 17px 20px; border: 1px solid ${theme.mid};
          border-radius: 16px; background: ${theme.pale}; text-align: center;
        }
        .le-modern-badge span { display: block; margin-bottom: 5px; color: ${theme.muted}; font-size: 10px; font-weight: 800; letter-spacing: 1px; }
        .le-modern-badge strong { color: ${theme.deep}; font-size: 22px; }
        .le-modern-grid { display: grid; grid-template-columns: minmax(0,1fr) 360px; gap: 22px; align-items: start; }
        .le-modern-card, .le-result-panel {
          border: 1px solid #B9E1E4; border-radius: 20px; background: #FFFFFF;
          box-shadow: 0 12px 34px rgba(22,78,82,.07);
        }
        .le-modern-card { padding: 26px; }
        .le-section-title {
          display: flex; justify-content: space-between; align-items: center; gap: 12px;
          margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #E2F1F2;
        }
        .le-section-title.small { margin-top: 28px; }
        .le-section-title h2 { margin: 0; color: ${theme.ink}; font-size: 19px; }
        .le-section-title p { margin: 6px 0 0; color: ${theme.muted}; font-size: 13px; }
        .le-step-label { color: #6A999D; font-size: 10px; font-weight: 800; letter-spacing: 1px; white-space: nowrap; }
        .le-form-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 19px 16px; }
        .le-field { display: flex; min-width: 0; flex-direction: column; gap: 8px; }
        .le-field > label { color: ${theme.deep}; font-size: 12px; font-weight: 750; }
        .le-number-root { width: 100%; }
        .le-number-group {
          display: flex; align-items: stretch; width: 100%; min-height: 42px;
          overflow: hidden; border: 1px solid #B9DDE0; border-radius: 13px;
          background: #FFF; transition: border-color .18s, box-shadow .18s;
        }
        .le-number-group:focus-within { border-color: ${theme.deep}; box-shadow: 0 0 0 3px rgba(113,201,206,.22); }
        .le-number-input {
          box-sizing: border-box; width: 100%; min-width: 0; height: 42px; padding: 0 13px;
          border: 0; outline: 0; background: transparent; color: ${theme.ink};
          font: inherit; font-size: 14px;
        }
        .le-number-input::placeholder { color: #8AAEB1; }
        .le-number-steppers { display: flex; flex-direction: column; border-left: 1px solid #D9ECEE; }
        .le-number-step {
          display: grid; width: 34px; flex: 1; place-items: center; border: 0;
          background: ${theme.pale}; color: ${theme.deep}; font-size: 16px;
          line-height: 1; cursor: pointer;
        }
        .le-number-step:hover { background: ${theme.light}; }
        .le-number-step:disabled { opacity: .4; cursor: not-allowed; }
        .le-info-box { margin-top: 24px; padding: 16px; border: 1px solid #C6E9EB; border-radius: 14px; background: ${theme.pale}; }
        .le-info-box strong { color: ${theme.deep}; font-size: 13px; }
        .le-info-box p { margin: 7px 0 0; color: ${theme.muted}; font-size: 12px; line-height: 1.65; }
        .le-modern-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
        .le-reset-button.MuiButton-root {
          min-height: 42px; padding: 0 22px; border-color: #A8D8DC; border-radius: 11px;
          color: ${theme.deep}; font-weight: 750; text-transform: none;
        }
        .le-reset-button.MuiButton-root:hover { border-color: ${theme.deep}; background: ${theme.pale}; }
        .le-calculate-button.MuiButton-root {
          min-width: 145px; min-height: 42px; padding: 0 22px; border-radius: 11px;
          background: ${theme.deep}; color: #FFF; font-weight: 750; text-transform: none;
          box-shadow: none;
        }
        .le-calculate-button.MuiButton-root:hover { background: ${theme.ink}; box-shadow: 0 5px 14px rgba(22,78,82,.18); }
        .le-calculate-button.Mui-disabled { background: #9BBFC1 !important; color: #FFF !important; }
        .le-result-panel { position: sticky; top: 20px; overflow: hidden; }
        .le-result-head { padding: 25px; background: linear-gradient(135deg, ${theme.pale}, ${theme.light}); border-bottom: 1px solid #C7E7E9; }
        .le-result-head p { margin: 0; color: ${theme.deep}; font-size: 11px; font-weight: 850; letter-spacing: 1.3px; text-transform: uppercase; }
        .le-result-head h2 { margin: 13px 0 4px; color: ${theme.ink}; font-size: 30px; line-height: 1.2; overflow-wrap: anywhere; }
        .le-result-head span { color: ${theme.deep}; font-size: 12px; font-weight: 750; }
        .le-result-head small { display: block; margin-top: 10px; color: ${theme.muted}; font-size: 11px; }
        .le-result-list { padding: 16px 20px; }
        .le-result-item { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid #E7F1F2; }
        .le-result-item:last-child { border-bottom: 0; }
        .le-result-item span { color: ${theme.muted}; font-size: 12px; line-height: 1.45; }
        .le-result-item strong { color: ${theme.ink}; font-size: 13px; text-align: right; white-space: nowrap; }
        .le-result-item.final { margin-top: 10px; padding: 15px; border: 1px solid #A6DDE0; border-radius: 13px; background: ${theme.pale}; }
        .le-result-item.final span { color: ${theme.deep}; font-weight: 800; }
        .le-result-item.final strong { color: ${theme.deep}; font-size: 18px; }
        .le-skeleton-header { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 24px; padding: 28px; border: 1px solid #B9E1E4; border-radius: 20px; background: #FFF; }
        .le-skeleton-fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; margin-top: 20px; }
        .le-skeleton-result { padding: 24px; }
        @media (max-width: 1050px) {
          .le-modern-page { padding: 20px; }
          .le-modern-grid { grid-template-columns: 1fr; }
          .le-result-panel { position: static; }
        }
        @media (max-width: 650px) {
          .le-modern-page { padding: 12px; }
          .le-modern-header { align-items: flex-start; flex-direction: column; padding: 22px; }
          .le-modern-card { padding: 18px; }
          .le-form-grid, .le-skeleton-fields { grid-template-columns: 1fr; }
          .le-section-title { align-items: flex-start; }
          .le-modern-actions { flex-direction: column-reverse; }
          .le-modern-actions .MuiButton-root { width: 100%; }
          .le-result-item { gap: 8px; }
          .le-skeleton-header { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
