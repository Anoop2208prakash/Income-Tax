import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";

import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";

import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";

import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

const initialForm = {

  residential: "resident",

  regime: "new",

  age: "below60",

  salary: 0,

  house: 0,

  business: 0,

  presumptive: 0,

  speculative: 0,

  stcgApplicableQ1: 0,

  stcgApplicableQ2: 0,

  stcgApplicableQ3: 0,

  stcgApplicableQ4: 0,

  stcg20Q1: 0,

  stcg20Q2: 0,

  stcg20Q3: 0,

  stcg20Q4: 0,

  ltcg125Q1: 0,

  ltcg125Q2: 0,

  ltcg125Q3: 0,

  ltcg125Q4: 0,

  ltcg20Q1: 0,

  ltcg20Q2: 0,

  ltcg20Q3: 0,

  ltcg20Q4: 0,

  ltcgApplicableQ1: 0,

  ltcgApplicableQ2: 0,

  ltcgApplicableQ3: 0,

  ltcgApplicableQ4: 0,

  stcg: 0,

  stcgRate: 0.15,

  bfSTCG: 0,

  stcgQ1: 0,

  stcgQ2: 0,

  stcgQ3: 0,

  stcgQ4: 0,

  ltcg: 0,

  ltcgRate: 0.20,

  bfLTCG: 0,

  ltcgQ1: 0,

  ltcgQ2: 0,

  ltcgQ3: 0,

  ltcgQ4: 0,

  ltcg112A: 0,

  bfLTCG112A: 0,

  exemption54: 0,

  bfHP: 0,

  bfBusiness: 0,

  bfSpeculative: 0,

  deductions: 0,

  otherSources: 0,

};

const incomeFields = [

  {

    key: "salary",

    label: "Salary Income",

    placeholder: "Enter salary income",

  },

  {

    key: "house",

    label: "House Property Income / Loss",

    placeholder: "Enter house property income / loss",

  },

  {

    key: "business",

    label: "Business Income",

    placeholder: "Enter business income",

  },

  {

    key: "presumptive",

    label: "Presumptive Income",

    placeholder: "Enter presumptive income",

  },

  {

    key: "speculative",

    label: "Speculative Income",

    placeholder: "Enter speculative income",

  },

];

const capitalGainFields = [

  { key: "bfSTCG", label: "BF STCG Loss", placeholder: "BF STCG Loss" },

  { key: "stcgApplicableQ1", label: "STCG Applicable Rate Q1", placeholder: "STCG Applicable Rate Q1 (Apr-Jun)" },

  { key: "stcgApplicableQ2", label: "STCG Applicable Rate Q2", placeholder: "STCG Applicable Rate Q2 (Jul-Sep)" },

  { key: "stcgApplicableQ3", label: "STCG Applicable Rate Q3", placeholder: "STCG Applicable Rate Q3 (Oct-Dec)" },

  { key: "stcgApplicableQ4", label: "STCG Applicable Rate Q4", placeholder: "STCG Applicable Rate Q4 (Jan-Mar)" },

  { key: "stcg20Q1", label: "STCG 20% Q1", placeholder: "STCG 20% Q1 (Apr-Jun)" },

  { key: "stcg20Q2", label: "STCG 20% Q2", placeholder: "STCG 20% Q2 (Jul-Sep)" },

  { key: "stcg20Q3", label: "STCG 20% Q3", placeholder: "STCG 20% Q3 (Oct-Dec)" },

  { key: "stcg20Q4", label: "STCG 20% Q4", placeholder: "STCG 20% Q4 (Jan-Mar)" },

  { key: "otherSources", label: "Other Sources", placeholder: "Other Sources" },

  { key: "bfLTCG", label: "BF LTCG Loss", placeholder: "BF LTCG Loss" },

  { key: "ltcg125Q1", label: "LTCG 12.5% Q1", placeholder: "LTCG 12.5% Q1 (Apr-Jun)" },

  { key: "ltcg125Q2", label: "LTCG 12.5% Q2", placeholder: "LTCG 12.5% Q2 (Jul-Sep)" },

  { key: "ltcg125Q3", label: "LTCG 12.5% Q3", placeholder: "LTCG 12.5% Q3 (Oct-Dec)" },

  { key: "ltcg125Q4", label: "LTCG 12.5% Q4", placeholder: "LTCG 12.5% Q4 (Jan-Mar)" },

  { key: "ltcg20Q1", label: "LTCG 20% Q1", placeholder: "LTCG 20% Q1 (Apr-Jun)" },

  { key: "ltcg20Q2", label: "LTCG 20% Q2", placeholder: "LTCG 20% Q2 (Jul-Sep)" },

  { key: "ltcg20Q3", label: "LTCG 20% Q3", placeholder: "LTCG 20% Q3 (Oct-Dec)" },

  { key: "ltcg20Q4", label: "LTCG 20% Q4", placeholder: "LTCG 20% Q4 (Jan-Mar)" },

  { key: "ltcgApplicableQ1", label: "LTCG Applicable Rate Q1", placeholder: "LTCG Applicable Rate Q1 (Apr-Jun)" },

  { key: "ltcgApplicableQ2", label: "LTCG Applicable Rate Q2", placeholder: "LTCG Applicable Rate Q2 (Jul-Sep)" },

  { key: "ltcgApplicableQ3", label: "LTCG Applicable Rate Q3", placeholder: "LTCG Applicable Rate Q3 (Oct-Dec)" },

  { key: "ltcgApplicableQ4", label: "LTCG Applicable Rate Q4", placeholder: "LTCG Applicable Rate Q4 (Jan-Mar)" },

  { key: "ltcg112A", label: "LTCG 112A", placeholder: "LTCG 112A (10% >1.25L)" },

  { key: "bfLTCG112A", label: "BF 112A Loss", placeholder: "BF 112A Loss" },

];

const adjustmentFields = [

  { key: "exemption54", label: "Sec 54 Exemption", placeholder: "Sec 54 Exemption" },

  { key: "bfHP", label: "BF HP Loss", placeholder: "BF HP Loss" },

  { key: "bfBusiness", label: "BF Business Loss", placeholder: "BF Business Loss" },

  { key: "bfSpeculative", label: "BF Speculative Loss", placeholder: "BF Speculative Loss" },

  { key: "deductions", label: "Deductions", placeholder: "Deductions" },

];

const muiFieldSx = {

  "& .MuiOutlinedInput-root": {

    minHeight: 46,

    borderRadius: "11px",

    backgroundColor: "#ffffff",

    fontSize: "13px",

    color: "#173b3e",

    "& fieldset": {

      borderColor: "#cbf1f5",

    },

    "&:hover fieldset": {

      borderColor: "#71c9ce",

    },

    "&.Mui-focused fieldset": {

      borderColor: "#71c9ce",

      borderWidth: "1px",

    },

    "&.Mui-focused": {

      boxShadow: "0 0 0 3px rgba(113, 201, 206, 0.09)",

    },

  },

  "& .MuiInputLabel-root": {

    color: "#52777a",

    fontSize: "13px",

  },

  "& .MuiInputLabel-root.Mui-focused": {

    color: "#71c9ce",

  },

  "& .MuiSelect-icon": {

    color: "#71c9ce",

  },

  "& input": {

    padding: "12px 13px",

  },

  "& input::placeholder": {

    color: "#7daeb1",

    opacity: 1,

    fontSize: "12px",

  },

};

function AdvanceNumberField({ label, value, onChange, placeholder, min = 0, step = 1 }) {

  return (

    <BaseNumberField.Root

      value={value}

      onValueChange={(nextValue) => onChange(nextValue ?? 0)}

      min={min}

      step={step}

      className="advance-number-root"

    >

      <BaseNumberField.Group className="advance-number-group">

        <span className="advance-number-currency" aria-hidden="true">₹</span>

        <BaseNumberField.Input

          className="advance-number-input"

          aria-label={label}

          placeholder={placeholder}

        />

        <div className="advance-number-controls">

          <BaseNumberField.Increment className="advance-number-stepper" aria-label={`Increase ${label}`}>+ </BaseNumberField.Increment>

          <BaseNumberField.Decrement className="advance-number-stepper" aria-label={`Decrease ${label}`}>−</BaseNumberField.Decrement>

        </div>

      </BaseNumberField.Group>

    </BaseNumberField.Root>

  );

}

function AdvanceTaxSkeleton() {

  return (

    <div className="advance-page">

      <div className="advance-container">

        <Skeleton variant="rounded" width={105} height={44} sx={{ mb: 3 }} />

        <div className="advance-skeleton-header">

          <div className="advance-skeleton-heading">

            <Skeleton width={110} height={22} />

            <Skeleton width="65%" height={42} />

            <Skeleton width="85%" height={22} />

          </div>

          <Skeleton variant="rounded" width={210} height={105} />

        </div>

        <div className="advance-layout">

          <div className="advance-left">

            {[3, 5, 8, 5].map((count, sectionIndex) => (

              <div className="advance-card" key={sectionIndex}>

                <Skeleton width="35%" height={30} />

                <Skeleton width="65%" height={20} />

                <div className="advance-skeleton-fields">

                  {Array.from({ length: count }).map((_, index) => (

                    <div key={index}>

                      <Skeleton width="55%" height={18} />

                      <Skeleton variant="rounded" width="100%" height={46} />

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

          <aside className="advance-card advance-skeleton-result">

            <Skeleton variant="rounded" width="100%" height={145} />

            <Skeleton width="60%" height={24} />

            {Array.from({ length: 5 }).map((_, index) => (

              <Skeleton key={index} variant="rounded" width="100%" height={48} />

            ))}

            <Skeleton width="70%" height={24} />

            {Array.from({ length: 4 }).map((_, index) => (

              <Skeleton key={index} variant="rounded" width="100%" height={45} />

            ))}

          </aside>

        </div>

      </div>

    </div>

  );

}

export default function AdvanceTaxCalculator() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [calculating, setCalculating] = useState(false);

  const [f, setF] = useState(initialForm);

  const [tax, setTax] = useState(0);

  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => setLoading(false), 700);

    return () => clearTimeout(timer);

  }, []);

  const set = (key, value) => {

    const textFields = ["residential", "regime", "age"];

    setF((previous) => ({

      ...previous,

      [key]: textFields.includes(key) ? value : Math.max(0, Number(value) || 0),

    }));

    setHasCalculated(false);

  };

// INCOME CALCULATION

  const computeIncome = () => {

    let hp = f.house;

    if (hp < 0) {

      hp = Math.max(hp, -200000);

    }

    const normal =

      f.salary +

      hp +

      f.business +

      f.presumptive -

      f.bfHP -

      f.bfBusiness;

    const speculative = f.speculative - f.bfSpeculative;

    return {

      normal: Math.max(0, normal),

      speculative: Math.max(0, speculative),

    };

  };

// TAX SLABS

  const slabTax = (income) => {

    let taxAmount = 0;

    if (f.regime === "new") {

      const slabs = [

        [400000, 0],

        [400000, 0.05],

        [400000, 0.10],

        [400000, 0.15],

        [400000, 0.20],

        [400000, 0.25],

        [Infinity, 0.30],

      ];

      let remaining = income;

      for (const [limit, rate] of slabs) {

        if (remaining <= 0) break;

        const taxable = Math.min(limit, remaining);

        taxAmount += taxable * rate;

        remaining -= taxable;

      }

    } else {

      let basic = 250000;

      if (f.age === "senior") basic = 300000;

      if (f.age === "super") basic = 500000;

      if (income > basic) {

        if (income <= 500000) {

          taxAmount += (income - basic) * 0.05;

        } else if (income <= 1000000) {

          taxAmount += (500000 - basic) * 0.05;

          taxAmount += (income - 500000) * 0.2;

        } else {

          taxAmount += (500000 - basic) * 0.05;

          taxAmount += 500000 * 0.2;

          taxAmount += (income - 1000000) * 0.3;

        }

      }

    }

    return taxAmount;

  };

// CAPITAL GAINS

  const capitalGainTax = () => {

    const totalSTCG =

      f.stcg +

      f.stcgQ1 +

      f.stcgQ2 +

      f.stcgQ3 +

      f.stcgQ4 +

      f.stcgApplicableQ1 +

      f.stcgApplicableQ2 +

      f.stcgApplicableQ3 +

      f.stcgApplicableQ4 +

      f.stcg20Q1 +

      f.stcg20Q2 +

      f.stcg20Q3 +

      f.stcg20Q4;

    const totalLTCG =

      f.ltcg +

      f.ltcgQ1 +

      f.ltcgQ2 +

      f.ltcgQ3 +

      f.ltcgQ4 +

      f.ltcg125Q1 +

      f.ltcg125Q2 +

      f.ltcg125Q3 +

      f.ltcg125Q4 +

      f.ltcg20Q1 +

      f.ltcg20Q2 +

      f.ltcg20Q3 +

      f.ltcg20Q4 +

      f.ltcgApplicableQ1 +

      f.ltcgApplicableQ2 +

      f.ltcgApplicableQ3 +

      f.ltcgApplicableQ4;

    let stcgNet = totalSTCG - f.bfSTCG;

    const stcgLoss = Math.min(0, stcgNet);

    let ltcgNet = totalLTCG - f.bfLTCG + stcgLoss;

    let ltcg112A = f.ltcg112A - f.bfLTCG112A;

    ltcg112A = Math.max(0, ltcg112A - 125000);

    stcgNet = Math.max(0, stcgNet);

    ltcgNet = Math.max(0, ltcgNet);

    let taxAmount =

      stcgNet * f.stcgRate +

      ltcgNet * f.ltcgRate +

      ltcg112A * 0.1;

    taxAmount -= f.exemption54;

    return Math.max(0, taxAmount);

  };

// SURCHARGE

  const surcharge = (income, taxAmount) => {

    let rate = 0;

    if (income > 50000000) rate = 0.37;

    else if (income > 20000000) rate = 0.25;

    else if (income > 10000000) rate = 0.15;

    else if (income > 5000000) rate = 0.1;

    return taxAmount * rate;

  };

// FINAL TAX

  const calculateTax = () => {

    const { normal, speculative } = computeIncome();

    let income = normal;

    if (f.regime === "old") {

      income -= f.deductions;

    }

    income = Math.max(0, income);

    let slab = slabTax(income);

    if (f.residential === "resident") {

      if (f.regime === "new" && income <= 1200000) slab = 0;

      if (f.regime === "old" && income <= 500000) slab = 0;

    }

    const speculativeTax = speculative * 0.3;

    const capitalTax = capitalGainTax();

    let total = slab + capitalTax + speculativeTax;

    total += surcharge(income, total);

    total += total * 0.04;

    return Math.round(total);

  };

  const handleCalculate = () => {

    if (calculating) return;

    setCalculating(true);

// Allows the loading spinner to render before calculation starts.

    setTimeout(() => {

      const result = calculateTax();

      setTax(result);

      setHasCalculated(true);

      setCalculating(false);

    }, 350);

  };

  const advanceTax =

    tax > 10000

      ? [

          { label: "15 June (15%)", value: tax * 0.15 },

          { label: "15 September (45%)", value: tax * 0.45 },

          { label: "15 December (75%)", value: tax * 0.75 },

          { label: "15 March (100%)", value: tax },

        ]

      : [];

  const formatAmount = (value) =>

    Math.round(value || 0).toLocaleString("en-IN");

  const renderFields = (fields) =>

    fields.map((item) => (

      <div className="advance-field" key={item.key}>

        <label htmlFor={`advance-${item.key}`}>{item.label}</label>

        <AdvanceNumberField

          label={item.label}

          value={f[item.key]}

          placeholder={item.placeholder}

          min={0}

          step={1}

          onChange={(value) => set(item.key, value)}

        />

      </div>

    ));

  if (loading) {

    return <AdvanceTaxSkeleton />;

  }

  return (

    <div className="advance-page">

      <div className="advance-container">

        <div className="advance-back-wrapper">

          <button

            type="button"

            className="advance-back-btn"

            onClick={() => navigate(-1)}

          >

            <span aria-hidden="true">←</span>

            Back

          </button>

        </div>

        <header className="advance-header">

          <div className="advance-header-content">

            <span className="advance-eyebrow">TAX CALCULATION TOOL</span>

            <h1>Advance Tax Calculator</h1>

            <p>

              Calculate your estimated tax liability and view advance tax

              installments based on your income details.

            </p>

          </div>

          <div className="advance-header-total">

            <span>Estimated Tax Liability</span>

            <strong>₹ {formatAmount(tax)}</strong>

            <small>

              {hasCalculated ? "Latest calculated amount" : "Calculate to view result"}

            </small>

          </div>

        </header>

        <main className="advance-layout">

          <div className="advance-left">

            {/* TAX PROFILE */}

            <section className="advance-card">

              <div className="advance-section-heading">

                <div className="advance-section-icon">01</div>

                <div>

                  <h2>Tax Profile</h2>

                  <p>

                    Select your residential status, tax regime and age category.

                  </p>

                </div>

              </div>

              <div className="advance-form-grid three">

                <div className="advance-field">

                  <label htmlFor="residential">Residential Status</label>

                  <TextField

                    id="residential"

                    select

                    fullWidth

                    size="small"

                    value={f.residential}

                    onChange={(e) => set("residential", e.target.value)}

                    sx={muiFieldSx}

                  >

                    <MenuItem value="resident">Resident</MenuItem>

                    <MenuItem value="nonResident">Non Resident</MenuItem>

                  </TextField>

                </div>

                <div className="advance-field">

                  <label htmlFor="regime">Tax Regime</label>

                  <TextField

                    id="regime"

                    select

                    fullWidth

                    size="small"

                    value={f.regime}

                    onChange={(e) => set("regime", e.target.value)}

                    sx={muiFieldSx}

                  >

                    <MenuItem value="new">New Regime</MenuItem>

                    <MenuItem value="old">Old Regime</MenuItem>

                  </TextField>

                </div>

                <div className="advance-field">

                  <label htmlFor="age">Age Category</label>

                  <TextField

                    id="age"

                    select

                    fullWidth

                    size="small"

                    value={f.age}

                    onChange={(e) => set("age", e.target.value)}

                    sx={muiFieldSx}

                  >

                    <MenuItem value="below60">Below 60</MenuItem>

                    <MenuItem value="senior">60 to 79</MenuItem>

                    <MenuItem value="super">80 and above</MenuItem>

                  </TextField>

                </div>

              </div>

            </section>

            {/* INCOME DETAILS */}

            <section className="advance-card">

              <div className="advance-section-heading">

                <div className="advance-section-icon">02</div>

                <div>

                  <h2>Income Details</h2>

                  <p>Enter the income earned under different income heads.</p>

                </div>

              </div>

              <div className="advance-form-grid">

                {renderFields(incomeFields)}

              </div>

            </section>

            {/* CAPITAL GAINS */}

            <section className="advance-card">

              <div className="advance-section-heading">

                <div className="advance-section-icon">03</div>

                <div>

                  <h2>Capital Gains</h2>

                  <p>

                    Enter quarterly short-term and long-term capital gains

                    along with brought-forward losses.

                  </p>

                </div>

              </div>

              <div className="advance-quarter-note">

                <span>Quarterly reporting</span>

                <p>

                  Q1: April–June &nbsp; Q2: July–September

                  &nbsp; Q3: October–December &nbsp; Q4: January–March

                </p>

              </div>

              <div className="advance-form-grid">

                {renderFields(capitalGainFields)}

              </div>

            </section>

            {/* ADJUSTMENTS */}

            <section className="advance-card">

              <div className="advance-section-heading">

                <div className="advance-section-icon">04</div>

                <div>

                  <h2>Adjustments & Deductions</h2>

                  <p>

                    Add eligible exemptions, deductions and brought-forward losses.

                  </p>

                </div>

              </div>

              <div className="advance-form-grid">

                {renderFields(adjustmentFields)}

              </div>

            </section>

            {/* CALCULATE BUTTON */}

            <div className="advance-calculate-wrapper">

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

                    backgroundColor: "#52777a",

                    color: "#fff",

                  },

                }}

              >

                {calculating ? "Calculating Tax..." : "Calculate Tax"}

              </Button>

              <p>

                {hasCalculated

                  ? "Your tax calculation has been updated."

                  : "Enter your details and click Calculate Tax to view your result."}

              </p>

            </div>

          </div>

          {/* RESULT PANEL */}

          <aside className="advance-result-panel">

            <div className="advance-result-header">

              <span className="advance-result-label">TAX SUMMARY</span>

              <h2>₹ {formatAmount(tax)}</h2>

              <p>Estimated Total Tax Liability</p>

              <div className="advance-result-divider" />

              <div className="advance-result-status">

                <span className="advance-status-dot" />

                {hasCalculated ? "Calculation complete" : "Awaiting calculation"}

              </div>

            </div>

            <div className="advance-result-body">

              <h3>Tax Profile Summary</h3>

              <div className="advance-result-item">

                <span>Residential Status</span>

                <strong>

                  {f.residential === "resident" ? "Resident" : "Non Resident"}

                </strong>

              </div>

              <div className="advance-result-item">

                <span>Tax Regime</span>

                <strong>

                  {f.regime === "new" ? "New Regime" : "Old Regime"}

                </strong>

              </div>

              <div className="advance-result-item">

                <span>Age Category</span>

                <strong>

                  {f.age === "below60"

                    ? "Below 60"

                    : f.age === "senior"

                    ? "60 to 79"

                    : "80 and above"}

                </strong>

              </div>

              <div className="advance-result-total">

                <span>Total Tax Liability</span>

                <strong>₹ {formatAmount(tax)}</strong>

              </div>

              <div className="advance-schedule">

                <div className="advance-schedule-heading">

                  <h3>Advance Tax Schedule</h3>

                  <p>Installment-wise tax payment details.</p>

                </div>

                {advanceTax.length > 0 ? (

                  <div className="advance-schedule-list">

                    {advanceTax.map((item, index) => (

                      <div className="advance-schedule-item" key={item.label}>

                        <div className="advance-schedule-number">

                          0{index + 1}

                        </div>

                        <div className="advance-schedule-info">

                          <span>{item.label}</span>

                          <strong>₹ {formatAmount(item.value)}</strong>

                        </div>

                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="advance-empty-state">

                    <div className="advance-empty-icon">₹</div>

                    <strong>No Advance Tax Schedule</strong>

                    <p>

                      The schedule will appear when your calculated tax

                      liability exceeds ₹10,000.

                    </p>

                  </div>

                )}

              </div>

            </div>

            <div className="advance-result-footer">

              <span>Income Tax Portal</span>

              <span>Advance Tax Calculator</span>

            </div>

          </aside>

        </main>

        <div className="advance-disclaimer">

          <strong>Important Note</strong>

          <p>

            This calculator retains the calculation rules from your supplied

            code. Verify tax slabs, exemptions, capital-gain rates, surcharge

            limits and advance-tax rules for the applicable assessment year

            before relying on the result.

          </p>

        </div>

      </div>

      <style>{`

        .advance-page {
          --primary: #71c9ce;
          --primary-dark: #164e52;
          --primary-soft: #cbf1f5;
          --accent: #a6e3e9;
          --accent-dark: #367f85;
          --accent-soft: #e3fdfd;
          --bg: #e3fdfd;
          --bg-soft: #cbf1f5;
          --white: #ffffff;
          --text: #173b3e;
          --muted: #52777a;
          --border: #a6e3e9;

          min-height: 100vh;

          padding: 30px 24px 50px;

          background: var(--bg, #e3fdfd);

          color: var(--text, #173b3e);

          font-family: inherit;

        }

        .advance-container {

          width: 100%;

          max-width: 1280px;

          margin: 0 auto;

        }

        .advance-back-wrapper {

          margin-bottom: 22px;

        }

        .advance-back-btn {

          display: inline-flex;

          align-items: center;

          gap: 10px;

          height: 43px;

          padding: 0 17px;

          border: 1px solid var(--border, #cbf1f5);

          border-radius: 12px;

          background: var(--white, #fff);

          color: var(--primary, #71c9ce);

          font-size: 14px;

          font-weight: 700;

          cursor: pointer;

          transition: 0.2s ease;

        }

        .advance-back-btn:hover {

          border-color: var(--primary, #71c9ce);

          background: var(--primary-soft, #cbf1f5);

          transform: translateX(-2px);

        }

        .advance-back-btn span {

          font-size: 19px;

          line-height: 1;

        }

        .advance-header {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 28px;

          padding: 30px 34px;

          margin-bottom: 26px;

          border: 1px solid var(--border, #cbf1f5);

          border-radius: var(--radius, 22px);

          background: var(--white, #fff);

          box-shadow: var(--shadow-sm);

        }

        .advance-header-content {

          max-width: 680px;

        }

        .advance-eyebrow {

          display: inline-block;

          margin-bottom: 11px;

          color: var(--accent-dark, #367f85);

          font-size: 11px;

          font-weight: 800;

          letter-spacing: 1.7px;

        }

        .advance-header h1 {

          margin: 0;

          color: var(--primary, #71c9ce);

          font-size: clamp(26px, 3vw, 36px);

          line-height: 1.2;

          font-weight: 800;

          letter-spacing: -0.8px;

        }

        .advance-header-content > p {

          max-width: 590px;

          margin: 11px 0 0;

          color: var(--muted, #52777a);

          font-size: 14px;

          line-height: 1.7;

        }

        .advance-header-total {

          min-width: 210px;

          padding: 20px 23px;

          border: 1px solid rgba(166, 227, 233, 0.4);

          border-radius: 17px;

          background: var(--accent-soft, #cbf1f5);

        }

        .advance-header-total span,

        .advance-header-total small {

          display: block;

          color: var(--muted, #52777a);

          font-size: 12px;

          font-weight: 600;

        }

        .advance-header-total strong {

          display: block;

          margin: 8px 0 5px;

          color: var(--primary, #71c9ce);

          font-size: 25px;

          font-weight: 800;

          overflow-wrap: anywhere;

        }

        .advance-layout {

          display: grid;

          grid-template-columns: minmax(0, 1fr) 355px;

          align-items: start;

          gap: 24px;

        }

        .advance-left {

          display: grid;

          gap: 20px;

          min-width: 0;

        }

        .advance-card,

        .advance-result-panel {

          border: 1px solid var(--border, #cbf1f5);

          border-radius: var(--radius, 22px);

          background: var(--white, #fff);

          box-shadow: var(--shadow-sm);

        }

        .advance-card {

          padding: 25px;

          min-width: 0;

        }

        .advance-section-heading {

          display: flex;

          align-items: flex-start;

          gap: 14px;

          padding-bottom: 19px;

          margin-bottom: 22px;

          border-bottom: 1px solid var(--border, #cbf1f5);

        }

        .advance-section-icon {

          display: flex;

          align-items: center;

          justify-content: center;

          flex: 0 0 37px;

          height: 37px;

          border-radius: 11px;

          background: var(--primary-soft, #cbf1f5);

          color: var(--primary, #71c9ce);

          font-size: 12px;

          font-weight: 800;

        }

        .advance-section-heading h2 {

          margin: 0;

          color: var(--primary, #71c9ce);

          font-size: 19px;

          font-weight: 800;

        }

        .advance-section-heading p {

          margin: 6px 0 0;

          color: var(--muted, #52777a);

          font-size: 13px;

          line-height: 1.6;

        }

        .advance-form-grid {

          display: grid;

          grid-template-columns: repeat(2, minmax(0, 1fr));

          gap: 19px 17px;

        }

        .advance-form-grid.three {

          grid-template-columns: repeat(3, minmax(0, 1fr));

        }

        .advance-field {

          display: flex;

          flex-direction: column;

          gap: 8px;

          min-width: 0;

        }

        .advance-field label {

          color: var(--text, #173b3e);

          font-size: 12px;

          font-weight: 700;

          line-height: 1.5;

        }

        .advance-mui-rupee {

          color: #52777a;

          font-size: 13px;

          font-weight: 700;

        }

        .advance-number-root {

          width: 100%;

          min-width: 0;

        }

        .advance-number-group {

          display: flex;

          align-items: center;

          width: 100%;

          min-height: 46px;

          overflow: hidden;

          border: 1px solid #cbf1f5;

          border-radius: 11px;

          background: #ffffff;

          transition: border-color 0.18s ease, box-shadow 0.18s ease;

        }

        .advance-number-group:hover { border-color: #71c9ce; }

        .advance-number-group:focus-within {

          border-color: #71c9ce;

          box-shadow: 0 0 0 3px rgba(113, 201, 206, 0.09);

        }

        .advance-number-currency {

          flex: 0 0 auto;

          padding-left: 13px;

          color: #52777a;

          font-size: 13px;

          font-weight: 700;

        }

        .advance-number-input {

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

        .advance-number-input::placeholder {

          color: #7daeb1;

          font-size: 12px;

          opacity: 1;

        }

        .advance-number-controls {

          display: flex;

          flex-direction: column;

          align-self: stretch;

          border-left: 1px solid #cbf1f5;

        }

        .advance-number-stepper {

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

        .advance-number-stepper:first-child { border-bottom: 1px solid #cbf1f5; }

        .advance-number-stepper:hover:not([data-disabled]) {

          background: #cbf1f5;

          color: #164e52;

        }

        .advance-number-stepper[data-disabled] {

          color: #a6c9cb;

          cursor: not-allowed;

        }

        .advance-quarter-note {

          margin: -3px 0 20px;

          padding: 13px 15px;

          border-left: 3px solid var(--accent, #a6e3e9);

          border-radius: 5px 10px 10px 5px;

          background: var(--accent-soft, #cbf1f5);

        }

        .advance-quarter-note span {

          display: block;

          margin-bottom: 4px;

          color: var(--primary, #71c9ce);

          font-size: 12px;

          font-weight: 800;

        }

        .advance-quarter-note p {

          margin: 0;

          color: var(--muted, #52777a);

          font-size: 11px;

          line-height: 1.6;

        }

        .advance-calculate-wrapper {

          display: grid;

          gap: 10px;

        }

        .advance-calculate-wrapper p {

          margin: 0;

          color: var(--muted, #52777a);

          font-size: 11px;

          text-align: center;

        }

        .advance-result-panel {

          position: sticky;

          top: 22px;

          overflow: hidden;

          min-width: 0;

        }

        .advance-result-header {

          padding: 27px 24px 22px;

          background: var(--primary, #71c9ce);

          color: #fff;

        }

        .advance-result-label {

          color: #cbf1f5;

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1.7px;

        }

        .advance-result-header h2 {

          margin: 14px 0 5px;

          color: #fff;

          font-size: 32px;

          font-weight: 800;

          line-height: 1.2;

          overflow-wrap: anywhere;

        }

        .advance-result-header > p {

          margin: 0;

          color: rgba(255, 255, 255, 0.75);

          font-size: 12px;

        }

        .advance-result-divider {

          height: 1px;

          margin: 20px 0 14px;

          background: rgba(255, 255, 255, 0.17);

        }

        .advance-result-status {

          display: flex;

          align-items: center;

          gap: 8px;

          color: rgba(255, 255, 255, 0.85);

          font-size: 11px;

          font-weight: 600;

        }

        .advance-status-dot {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #71c9ce;

        }

        .advance-result-body {

          padding: 22px;

        }

        .advance-result-body > h3 {

          margin: 0 0 12px;

          color: var(--primary, #71c9ce);

          font-size: 15px;

          font-weight: 800;

        }

        .advance-result-item {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          padding: 13px 0;

          border-bottom: 1px solid var(--border, #cbf1f5);

        }

        .advance-result-item span {

          color: var(--muted, #52777a);

          font-size: 12px;

        }

        .advance-result-item strong {

          color: var(--text, #173b3e);

          font-size: 12px;

          font-weight: 700;

          text-align: right;

        }

        .advance-result-total {

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          margin-top: 17px;

          padding: 15px;

          border: 1px solid rgba(166, 227, 233, 0.4);

          border-radius: 12px;

          background: var(--accent-soft, #cbf1f5);

        }

        .advance-result-total span {

          color: var(--primary, #71c9ce);

          font-size: 12px;

          font-weight: 700;

        }

        .advance-result-total strong {

          color: var(--primary, #71c9ce);

          font-size: 16px;

          font-weight: 800;

          text-align: right;

          overflow-wrap: anywhere;

        }

        .advance-schedule {

          margin-top: 25px;

          padding-top: 21px;

          border-top: 1px solid var(--border, #cbf1f5);

        }

        .advance-schedule-heading {

          margin-bottom: 15px;

        }

        .advance-schedule-heading h3 {

          margin: 0;

          color: var(--primary, #71c9ce);

          font-size: 16px;

          font-weight: 800;

        }

        .advance-schedule-heading p {

          margin: 6px 0 0;

          color: var(--muted, #52777a);

          font-size: 11px;

          line-height: 1.5;

        }

        .advance-schedule-list {

          display: grid;

          gap: 10px;

        }

        .advance-schedule-item {

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 12px;

          border: 1px solid var(--border, #cbf1f5);

          border-radius: 12px;

          background: #ffffff;

        }

        .advance-schedule-number {

          display: flex;

          align-items: center;

          justify-content: center;

          flex: 0 0 34px;

          height: 34px;

          border-radius: 9px;

          background: var(--primary-soft, #cbf1f5);

          color: var(--primary, #71c9ce);

          font-size: 11px;

          font-weight: 800;

        }

        .advance-schedule-info {

          display: flex;

          flex-direction: column;

          gap: 4px;

          min-width: 0;

        }

        .advance-schedule-info span {

          color: var(--muted, #52777a);

          font-size: 11px;

        }

        .advance-schedule-info strong {

          color: var(--primary, #71c9ce);

          font-size: 13px;

          font-weight: 800;

        }

        .advance-empty-state {

          padding: 20px 14px;

          border: 1px dashed var(--border, #cbf1f5);

          border-radius: 13px;

          background: var(--bg, #e3fdfd);

          text-align: center;

        }

        .advance-empty-icon {

          display: flex;

          align-items: center;

          justify-content: center;

          width: 38px;

          height: 38px;

          margin: 0 auto 11px;

          border-radius: 11px;

          background: var(--accent-soft, #cbf1f5);

          color: var(--accent-dark, #367f85);

          font-size: 18px;

          font-weight: 800;

        }

        .advance-empty-state strong {

          display: block;

          color: var(--primary, #71c9ce);

          font-size: 12px;

        }

        .advance-empty-state p {

          margin: 7px 0 0;

          color: var(--muted, #52777a);

          font-size: 11px;

          line-height: 1.6;

        }

        .advance-result-footer {

          display: flex;

          justify-content: space-between;

          gap: 10px;

          padding: 13px 20px;

          border-top: 1px solid var(--border, #cbf1f5);

          background: #ffffff;

          color: var(--muted, #52777a);

          font-size: 10px;

          font-weight: 600;

        }

        .advance-disclaimer {

          margin-top: 23px;

          padding: 17px 20px;

          border: 1px solid var(--border, #cbf1f5);

          border-left: 3px solid var(--accent, #a6e3e9);

          border-radius: 10px;

          background: var(--white, #fff);

        }

        .advance-disclaimer strong {

          color: var(--primary, #71c9ce);

          font-size: 12px;

        }

        .advance-disclaimer p {

          margin: 6px 0 0;

          color: var(--muted, #52777a);

          font-size: 11px;

          line-height: 1.7;

        }

        /* SKELETON */

        .advance-skeleton-header {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 25px;

          padding: 30px;

          margin-bottom: 25px;

          border: 1px solid var(--border, #cbf1f5);

          border-radius: var(--radius, 22px);

          background: #fff;

        }

        .advance-skeleton-heading {

          flex: 1;

        }

        .advance-skeleton-fields {

          display: grid;

          grid-template-columns: repeat(2, minmax(0, 1fr));

          gap: 18px;

          margin-top: 23px;

        }

        .advance-skeleton-fields > div {

          display: grid;

          gap: 7px;

        }

        .advance-skeleton-result {

          display: grid;

          gap: 14px;

        }

        .advance-skeleton-result .MuiSkeleton-root,

        .advance-skeleton-fields .MuiSkeleton-root,

        .advance-skeleton-header .MuiSkeleton-root {

          transform: none;

          background-color: #cbf1f5;

        }

        @media (max-width: 1100px) {

          .advance-layout {

            grid-template-columns: minmax(0, 1fr) 320px;

            gap: 17px;

          }

          .advance-card {

            padding: 21px;

          }

          .advance-result-body {

            padding: 18px;

          }

        }

        @media (max-width: 900px) {

          .advance-layout {

            grid-template-columns: 1fr;

          }

          .advance-result-panel {

            position: static;

          }

          .advance-result-body {

            padding: 23px;

          }

          .advance-result-header {

            padding: 25px;

          }

        }

        @media (max-width: 650px) {

          .advance-page {

            padding: 18px 13px 35px;

          }

          .advance-header {

            flex-direction: column;

            align-items: stretch;

            padding: 23px 19px;

          }

          .advance-header-total {

            width: 100%;

          }

          .advance-form-grid,

          .advance-form-grid.three {

            grid-template-columns: 1fr;

          }

          .advance-card {

            padding: 19px 16px;

          }

          .advance-section-heading {

            gap: 11px;

          }

          .advance-section-heading h2 {

            font-size: 17px;

          }

          .advance-skeleton-header {

            flex-direction: column;

            align-items: stretch;

            padding: 20px;

          }

          .advance-skeleton-fields {

            grid-template-columns: 1fr;

          }

          .advance-result-item {

            align-items: flex-start;

          }

          .advance-result-footer {

            flex-direction: column;

          }

        }

        @media (prefers-reduced-motion: reduce) {

          .advance-back-btn {

            transition: none;

          }

        }

      `}</style>

    </div>

  );

}