import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

const interestData = {
  "2026-27": {
    "VIII Issue": [
      { period: "1 Apr 2020 to 31 Mar 2021", rate: 8.85 },
      { period: "1 Apr 2021 to 31 Mar 2022", rate: 8.28 },
      { period: "1 Apr 2022 to 31 Mar 2023", rate: 7.76 },
      { period: "1 Apr 2023 to 31 Mar 2024", rate: 8.01 },
      { period: "1 Apr 2024 to 31 Mar 2025", rate: 8.29 },
      { period: "1 Apr 2025 to 31 Mar 2026", rate: 7.7 },
      { period: "1 Apr 2026 to 31 Mar 2027", rate: 0 },
    ],
    "IX Issue": [{ period: "1 Apr 2015 to 20 Dec 2015", rate: 19.52 }],
  },
  "2025-26": {
    "VIII Issue": [
      { period: "1 Apr 2019 to 30 Jun 2019", rate: 10.88 },
      { period: "1 Jul 2019 to 31 Mar 2020", rate: 10.71 },
      { period: "1 Apr 2020 to 31 Mar 2021", rate: 8.28 },
      { period: "1 Apr 2021 to 31 Mar 2022", rate: 7.76 },
      { period: "1 Apr 2022 to 31 Dec 2022", rate: 7.26 },
      { period: "1 Jan 2023 to 31 Mar 2023", rate: 7.49 },
      { period: "1 Apr 2023 to 31 Mar 2024", rate: 7.70 },
      { period: "1 Apr 2024 to 31 Mar 2025", rate: 0 },
    ],
    "IX Issue": [
      { period: "1 Apr 2014 to 31 Mar 2015", rate: 19.52 },
      { period: "1 Apr 2015 to 20 Dec 2015", rate: 17.91 },
    ],
  },
  "2024-25": {
    "VIII Issue": [
      { period: "1 Apr 2018 to 30 Sep 2018", rate: 10.19 },
      { period: "1 Oct 2018 to 31 Mar 2019", rate: 10.88 },
      { period: "1 Apr 2019 to 30 Jun 2019", rate: 10.08 },
      { period: "1 Jun 2019 to 31 Mar 2020", rate: 9.92 },
      { period: "1 Apr 2020 to 31 Mar 2021", rate: 7.76 },
      { period: "1 Apr 2021 to 31 Mar 2022", rate: 7.26 },
      { period: "1 Apr 2022 to 31 Dec 2022", rate: 6.8 },
      { period: "1 Jan 2023 to 31 Mar 2023", rate: 7 },
      { period: "1 Apr 2023 to 31 Mar 2024", rate: "" },
    ],
    "IX Issue": [
      { period: "1 Apr 2013 to 31 Mar 2014", rate: 19.52 },
      { period: "1 Apr 2014 to 31 Mar 2015", rate: 17.91 },
      { period: "1 Apr 2015 to 20 Dec 2015", rate: 16.43 },
    ],
  },
};

const assessmentYears = [
  "2026-27", "2025-26", "2024-25", "2023-24", "2022-23",
  "2021-22", "2020-21", "2019-20", "2018-19", "2017-18",
];

const emptyRow = { nscType: "", period: "", amount: "", interest: "" };

function ThemedNumberField({ value, onChange, disabled, placeholder = "Enter Amount", readOnly = false }) {
  return (
    <BaseNumberField.Root
      value={value === "" ? null : Number(value)}
      onValueChange={(nextValue) => onChange(nextValue == null ? "" : String(nextValue))}
      disabled={disabled || readOnly}
      min={0}
      step={1}
      className="nsc-number-root"
    >
      <BaseNumberField.Input
        placeholder={placeholder}
        className="nsc-number-input"
        aria-label={placeholder}
      />
      <div className="nsc-number-steppers">
        <BaseNumberField.Increment className="nsc-stepper" aria-label="Increase value">+</BaseNumberField.Increment>
        <BaseNumberField.Decrement className="nsc-stepper" aria-label="Decrease value">−</BaseNumberField.Decrement>
      </div>
    </BaseNumberField.Root>
  );
}

function SelectField({ value, onChange, disabled, children, placeholder, ...props }) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="nsc-mui-select"
      SelectProps={{
        displayEmpty: true,
        MenuProps: {
          PaperProps: { className: "nsc-select-menu" },
          MenuListProps: { className: "nsc-select-menu-list" },
        },
      }}
      {...props}
    >
      {placeholder ? <MenuItem value=""><em>{placeholder}</em></MenuItem> : null}
      {children}
    </TextField>
  );
}

export default function NSCCalculator() {
  const navigate = useNavigate();
  const [assessmentYear, setAssessmentYear] = useState("");
  const [rows, setRows] = useState([{ ...emptyRow }]);
  const [pageLoading, setPageLoading] = useState(true);
  const [addingRow, setAddingRow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setPageLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, []);

  const isComingSoon =
    assessmentYear &&
    !["2026-27", "2025-26", "2024-25"].includes(assessmentYear);

  const calculateInterest = (ay, type, period, amount) => {
    const investmentAmount = Number(amount);

    if (!ay || !type || !period || !investmentAmount) {
      return "";
    }

    const selectedPeriod = interestData?.[ay]?.[type]?.find(
      (item) => item.period === period
    );

    if (!selectedPeriod) {
      return "";
    }

    const rate = Number(selectedPeriod.rate);

    if (selectedPeriod.rate === "" || isNaN(rate)) {
      return "";
    }

    const interest = (investmentAmount * rate) / 100;
    return interest.toFixed(2);
  };

  const handleAssessmentYearChange = (value) => {
    setAssessmentYear(value);
    setRows([{ ...emptyRow }]);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) => {
      if (i !== index) return row;

      const updatedRow = { ...row, [field]: value };

      if (field === "nscType") {
        updatedRow.period = "";
        updatedRow.interest = "";
        return updatedRow;
      }

      updatedRow.interest = calculateInterest(
        assessmentYear,
        updatedRow.nscType,
        updatedRow.period,
        updatedRow.amount
      );

      return updatedRow;
    });

    setRows(updatedRows);
  };

  const removeRow = (index) => {
    setRows((currentRows) =>
      currentRows.length > 1
        ? currentRows.filter((_, rowIndex) => rowIndex !== index)
        : currentRows
    );
  };

  const addMoreRow = () => {
    if (addingRow) return;
    setAddingRow(true);
    window.setTimeout(() => {
      setRows((currentRows) => [...currentRows, { ...emptyRow }]);
      setAddingRow(false);
    }, 350);
  };

  const resetCalculator = () => {
    setAssessmentYear("");
    setRows([{ ...emptyRow }]);
  };

  const totalInvestment = useMemo(
    () => rows.reduce((total, row) => total + Number(row.amount || 0), 0),
    [rows]
  );
  const totalInterest = useMemo(
    () => rows.reduce((total, row) => total + Number(row.interest || 0), 0),
    [rows]
  );

  return (
    <div className="nsc-page">
      <div className="business-code-back-wrapper">
        <button type="button" className="business-code-back-btn" onClick={() => navigate(-1)}>
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      {pageLoading ? (
        <div className="nsc-container nsc-loading-layout" aria-label="Loading NSC calculator">
          <section className="nsc-left-card nsc-skeleton-card">
            <Skeleton variant="text" width="34%" height={38} />
            <Skeleton variant="text" width="25%" height={25} />
            <Skeleton variant="rounded" height={52} />
            <Skeleton variant="rounded" height={170} />
            <div className="nsc-skeleton-actions">
              <Skeleton variant="rounded" width={120} height={46} />
              <Skeleton variant="rounded" width={100} height={46} />
            </div>
          </section>
          <aside className="nsc-right-card nsc-skeleton-card">
            <Skeleton variant="text" width="45%" height={36} />
            <Skeleton variant="rounded" height={112} />
            <Skeleton variant="rounded" height={112} />
          </aside>
        </div>
      ) : (
        <div className="nsc-container">
          <div className="nsc-left-card">
            <h2 className="nsc-title">NSC Calculator</h2>

            <div className="form-row">
              <label htmlFor="nsc-assessment-year">
                Assessment Year <span>*</span>
              </label>
              <SelectField
                id="nsc-assessment-year"
                value={assessmentYear}
                onChange={(e) => handleAssessmentYearChange(e.target.value)}
                placeholder="Select Assessment Year"
              >
                {assessmentYears.map((ay) => (
                  <MenuItem key={ay} value={ay}>AY {ay}</MenuItem>
                ))}
              </SelectField>
            </div>

            {isComingSoon ? (
              <div className="coming-soon">Coming Soon...</div>
            ) : assessmentYear ? (
              <>
                <div className="nsc-rows-list">
                  {rows.map((row, index) => (
                    <article className="nsc-row-card" key={index}>
                      <div className="nsc-row-card-head">
                        <div className="nsc-row-identity">
                          <span className="nsc-row-number">{String(index + 1).padStart(2, "0")}</span>
                          <div>
                            <strong>Investment {index + 1}</strong>
                            <small>NSC investment details</small>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="nsc-delete-btn"
                          onClick={() => removeRow(index)}
                          disabled={rows.length === 1}
                          aria-label={`Delete NSC row ${index + 1}`}
                          title={rows.length === 1 ? "At least one row is required" : "Delete row"}
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.8 11.2a1.9 1.9 0 0 1-1.9 1.8H9.7a1.9 1.9 0 0 1-1.9-1.8L7 9Zm3 2v8h1.7v-8H10Zm3.3 0v8H15v-8h-1.7Z" />
                          </svg>
                        </button>
                      </div>
                      <div className="nsc-row-fields">
                        <div className="nsc-row-field">
                          <label>NSC Type <span>*</span></label>
                          <SelectField
                            value={row.nscType}
                            onChange={(e) => handleRowChange(index, "nscType", e.target.value)}
                            disabled={!assessmentYear}
                            placeholder="Select NSC Type"
                          >
                            <MenuItem value="VIII Issue">VIII Issue</MenuItem>
                            <MenuItem value="IX Issue">IX Issue</MenuItem>
                          </SelectField>
                        </div>
                        <div className="nsc-row-field">
                          <label>Period <span>*</span></label>
                          <SelectField
                            value={row.period}
                            onChange={(e) => handleRowChange(index, "period", e.target.value)}
                            disabled={!assessmentYear || !row.nscType}
                            placeholder="Select Period"
                          >
                            {interestData?.[assessmentYear]?.[row.nscType]?.map((item) => (
                              <MenuItem key={item.period} value={item.period}>{item.period}</MenuItem>
                            ))}
                          </SelectField>
                        </div>
                        <div className="nsc-row-field">
                          <label>Amount of Investment <span>*</span></label>
                          <ThemedNumberField
                            value={row.amount}
                            placeholder="Enter Amount"
                            disabled={!assessmentYear}
                            onChange={(value) => handleRowChange(index, "amount", value)}
                          />
                        </div>
                        <div className="nsc-row-field">
                          <label>Interest</label>
                          <ThemedNumberField
                            value={row.interest}
                            placeholder="Calculated interest"
                            readOnly
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                    </article>
                  ))}
                  {addingRow ? (
                    <article className="nsc-row-card nsc-adding-skeleton">
                      <Skeleton variant="text" width="24%" height={30} />
                      <div className="nsc-row-fields">
                        {[1, 2, 3, 4].map((item) => <Skeleton key={item} variant="rounded" height={52} />)}
                      </div>
                    </article>
                  ) : null}
                </div>

                <div className="button-row">
                  <Button
                    className="add-btn"
                    onClick={addMoreRow}
                    disabled={addingRow}
                    startIcon={addingRow ? <CircularProgress size={17} color="inherit" /> : null}
                  >
                    {addingRow ? "Adding..." : "Add More"}
                  </Button>
                  <Button className="reset-btn" onClick={resetCalculator}>Reset</Button>
                </div>
              </>
            ) : (
              <div className="nsc-empty-state">
                Select an assessment year to enter NSC investment details.
              </div>
            )}
          </div>

          <div className="nsc-right-card">
            <h3>Result</h3>
            <div className="result-box">
              <p>Total Investment</p>
              <h4>₹ {totalInvestment.toFixed(2)}</h4>
            </div>
            <div className="result-box">
              <p>Total Interest</p>
              <h4>₹ {totalInterest.toFixed(2)}</h4>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nsc-page {
          --nsc-bg: #E3FDFD;
          --nsc-soft: #CBF1F5;
          --nsc-border: #A6E3E9;
          --nsc-accent: #71C9CE;
          --nsc-ink: #173B3E;
          --nsc-muted: #52777A;
          min-height: 100vh;
          box-sizing: border-box;
          background: linear-gradient(135deg, var(--nsc-bg), #f7ffff 55%, var(--nsc-soft));
          padding: 30px;
          color: var(--nsc-ink);
          font-family: Arial, sans-serif;
        }
        .nsc-page * { box-sizing: border-box; }
        .business-code-back-wrapper { max-width: 1300px; margin: 0 auto 20px; }
        .business-code-back-btn {
          display: inline-flex; align-items: center; gap: 9px; height: 46px;
          padding: 0 20px; border-radius: 14px; border: 1px solid var(--nsc-border);
          background: #fff; color: var(--nsc-ink); font-size: 15px; font-weight: 800;
          cursor: pointer; transition: .2s ease;
        }
        .business-code-back-btn:hover { background: var(--nsc-soft); border-color: var(--nsc-accent); }
        .business-code-back-btn span { font-size: 20px; color: #238F98; }
        .nsc-container {
          display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 25px;
          max-width: 1300px; margin: auto; align-items: start;
        }
        .nsc-left-card, .nsc-right-card {
          min-width: 0; background: #fff; border: 1px solid var(--nsc-border);
          border-radius: 24px; padding: 26px;
          box-shadow: 0 12px 35px rgba(48, 143, 151, .08);
        }
        .nsc-title { margin: 0 0 25px; font-size: 27px; color: var(--nsc-ink); font-weight: 800; }
        .form-row { display: flex; flex-direction: column; max-width: 420px; margin-bottom: 25px; }
        .nsc-page label { margin-bottom: 9px; font-size: 15px; color: var(--nsc-ink); font-weight: 700; }
        .nsc-page label span, .nsc-page th span { color: #dc5555; }
        .nsc-mui-select .MuiOutlinedInput-root {
          min-height: 52px; border-radius: 16px; background: #fff; color: var(--nsc-ink);
          font-size: 16px; transition: .2s ease;
        }
        .nsc-mui-select .MuiOutlinedInput-notchedOutline { border-color: var(--nsc-border); }
        .nsc-mui-select .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: var(--nsc-accent); }
        .nsc-mui-select .MuiOutlinedInput-root.Mui-focused { box-shadow: 0 0 0 3px rgba(166, 227, 233, .28); }
        .nsc-mui-select .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: var(--nsc-accent); border-width: 1.5px; }
        .nsc-mui-select .MuiSelect-icon { color: #238F98; }
        .nsc-mui-select .MuiInputBase-input { padding: 14px 16px; }
        .nsc-mui-select .Mui-disabled { background: #F0FBFC; -webkit-text-fill-color: #78999B !important; }
        .nsc-select-menu { margin-top: 7px; border: 1px solid var(--nsc-border); border-radius: 14px !important; box-shadow: 0 12px 28px rgba(23, 59, 62, .12) !important; }
        .nsc-select-menu-list { padding: 6px !important; background: #fff; }
        .nsc-select-menu .MuiMenuItem-root { min-height: 42px; border-radius: 9px; color: var(--nsc-ink); font-size: 15px; }
        .nsc-select-menu .MuiMenuItem-root:hover { background: var(--nsc-bg); }
        .nsc-select-menu .MuiMenuItem-root.Mui-selected { background: var(--nsc-soft); color: #187E86; font-weight: 700; }
        .nsc-select-menu .MuiMenuItem-root.Mui-selected:hover { background: #BDEBF0; }
        .nsc-number-root {
          display: flex; width: 100%; min-width: 170px; height: 52px; overflow: hidden;
          border: 1px solid var(--nsc-accent); border-radius: 16px; background: #fff;
          transition: box-shadow .2s ease, border-color .2s ease;
        }
        .nsc-number-root:focus-within { border-color: #45B8C0; box-shadow: 0 0 0 3px rgba(166, 227, 233, .3); }
        .nsc-number-root[data-disabled] { background: #F0FBFC; opacity: .8; }
        .nsc-number-input {
          flex: 1; width: 100%; min-width: 0; height: 100%; padding: 0 16px;
          border: 0; outline: 0; background: transparent; color: var(--nsc-ink);
          font: inherit; font-size: 16px;
        }
        .nsc-number-input::placeholder { color: #78999B; opacity: 1; }
        .nsc-number-steppers { display: flex; flex-direction: column; width: 46px; flex: 0 0 46px; border-left: 1px solid var(--nsc-border); }
        .nsc-stepper {
          display: grid; place-items: center; flex: 1; border: 0; background: var(--nsc-bg);
          color: #269DA5; font-size: 20px; line-height: 1; font-weight: 800; cursor: pointer;
        }
        .nsc-stepper + .nsc-stepper { border-top: 1px solid #D2F2F4; }
        .nsc-stepper:hover { background: var(--nsc-soft); }
        .nsc-stepper:disabled { cursor: not-allowed; opacity: .45; }
        .nsc-rows-list { display: grid; gap: 16px; width: 100%; }
        .nsc-row-card { min-width: 0; padding: 18px; border: 1px solid var(--nsc-border); border-radius: 19px; background: linear-gradient(145deg, #fff 0%, #F7FEFE 100%); box-shadow: 0 5px 18px rgba(48, 143, 151, .055); }
        .nsc-row-card-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-bottom: 15px; margin-bottom: 16px; border-bottom: 1px solid #DDF5F6; }
        .nsc-row-identity { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .nsc-row-number { display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 42px; border-radius: 13px; background: var(--nsc-soft); color: #238F98; font-size: 14px; font-weight: 800; }
        .nsc-row-identity strong { display: block; color: var(--nsc-ink); font-size: 16px; }
        .nsc-row-identity small { display: block; margin-top: 3px; color: var(--nsc-muted); font-size: 12px; }
        .nsc-row-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .nsc-row-field { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
        .nsc-row-field label { margin: 0; font-size: 13px; }
        .nsc-row-field .nsc-mui-select, .nsc-row-field .nsc-number-root { width: 100%; min-width: 0; }
        .nsc-delete-btn { width: 46px; height: 46px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid #FFC9C9; border-radius: 13px; background: #FFF7F7; color: #D94B4B; cursor: pointer; transition: background .18s ease, border-color .18s ease, transform .18s ease; }
        .nsc-delete-btn svg { width: 21px; height: 21px; fill: currentColor; }
        .nsc-delete-btn:hover:not(:disabled) { background: #FFE8E8; border-color: #F29A9A; transform: translateY(-1px); }
        .nsc-delete-btn:disabled { opacity: .35; cursor: not-allowed; }
        .nsc-row-field .MuiOutlinedInput-root { min-height: 50px; border-radius: 14px; }
        .nsc-row-field .MuiInputBase-input { padding: 13px 14px; }
        .nsc-row-field .nsc-number-root { height: 50px; border-radius: 14px; }
        .button-row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end; margin-top: 22px; }
        .nsc-page .add-btn, .nsc-page .reset-btn {
          min-height: 46px; padding: 0 22px; border-radius: 14px; text-transform: none;
          font-size: 15px; font-weight: 800; box-shadow: none;
        }
        .nsc-page .add-btn { background: var(--nsc-accent); color: var(--nsc-ink); }
        .nsc-page .add-btn:hover { background: #5CBFC5; box-shadow: 0 6px 15px rgba(71, 177, 185, .2); }
        .nsc-page .add-btn.Mui-disabled { background: var(--nsc-soft); color: #65999D; }
        .nsc-page .reset-btn { border: 1px solid var(--nsc-border); background: #fff; color: #23858D; }
        .nsc-page .reset-btn:hover { background: var(--nsc-bg); border-color: var(--nsc-accent); }
        .nsc-right-card h3 { margin: 0 0 20px; color: var(--nsc-ink); font-size: 22px; border-bottom: 1px solid var(--nsc-border); padding-bottom: 14px; }
        .result-box { background: #E4FAFB; border: 1px solid var(--nsc-border); border-radius: 17px; padding: 19px; margin-bottom: 16px; }
        .result-box p { margin: 0 0 10px; color: var(--nsc-muted); font-size: 15px; font-weight: 600; }
        .result-box h4 { margin: 0; color: #55BFC5; font-size: 25px; font-weight: 800; }
        .coming-soon, .nsc-empty-state {
          background: #F3FCFC; border: 1px solid var(--nsc-border); padding: 30px;
          border-radius: 17px; font-size: 18px; text-align: center; color: var(--nsc-muted);
        }
        .nsc-skeleton-card { display: flex; flex-direction: column; gap: 16px; }
        .nsc-skeleton-card .MuiSkeleton-root { background-color: #DDF5F6; }
        .nsc-skeleton-actions { display: flex; gap: 12px; justify-content: flex-end; }
        .nsc-adding-skeleton .MuiSkeleton-root { background-color: #DDF5F6; }
        @media (max-width: 900px) {
          .nsc-page { padding: 20px 14px; }
          .nsc-container, .nsc-loading-layout { grid-template-columns: 1fr; }
          .nsc-left-card, .nsc-right-card { padding: 20px; border-radius: 20px; }
          .form-row { max-width: none; }
          .nsc-row-fields { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .nsc-page { padding: 16px 10px; }
          .nsc-left-card, .nsc-right-card { padding: 16px; }
          .nsc-row-card { padding: 14px; }
          .button-row { justify-content: stretch; }
          .button-row > button { flex: 1; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .nsc-skeleton-card .MuiSkeleton-root { animation-duration: 1.5s; }
        }
      `}</style>
    </div>
  );
}
