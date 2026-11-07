import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "../../components/Breadcrumb";
import SelectField from "../../components/ui/SelectField";
import NumberField from "../../components/ui/NumberField";

import "./advance-tax-calculator.scss";

interface TaxForm {
  residential: string;
  regime: string;
  age: string;

  salary: number;
  house: number;
  business: number;
  presumptive: number;
  speculative: number;

  stcgApplicableQ1: number;
  stcgApplicableQ2: number;
  stcgApplicableQ3: number;
  stcgApplicableQ4: number;

  stcg20Q1: number;
  stcg20Q2: number;
  stcg20Q3: number;
  stcg20Q4: number;

  ltcg125Q1: number;
  ltcg125Q2: number;
  ltcg125Q3: number;
  ltcg125Q4: number;

  ltcg20Q1: number;
  ltcg20Q2: number;
  ltcg20Q3: number;
  ltcg20Q4: number;

  ltcgApplicableQ1: number;
  ltcgApplicableQ2: number;
  ltcgApplicableQ3: number;
  ltcgApplicableQ4: number;

  stcg: number;
  stcgRate: number;
  bfSTCG: number;

  stcgQ1: number;
  stcgQ2: number;
  stcgQ3: number;
  stcgQ4: number;

  ltcg: number;
  ltcgRate: number;
  bfLTCG: number;

  ltcgQ1: number;
  ltcgQ2: number;
  ltcgQ3: number;
  ltcgQ4: number;

  ltcg112A: number;
  bfLTCG112A: number;

  exemption54: number;

  bfHP: number;
  bfBusiness: number;
  bfSpeculative: number;

  deductions: number;
  otherSources: number;
}

type SelectFieldKey = "residential" | "regime" | "age";

type NumericField = Exclude<keyof TaxForm, SelectFieldKey>;

interface InputField {
  key: NumericField;
  label: string;
  placeholder: string;
}

interface ScheduleItem {
  label: string;
  value: number;
}

interface SelectOption {
  label: string;
  value: string;
}

const initialForm: TaxForm = {
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
  ltcgRate: 0.2,
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

// SELECT OPTIONS

const residentialOptions: SelectOption[] = [
  { label: "Resident", value: "resident" },
  { label: "Non Resident", value: "nonResident" },
];

const regimeOptions: SelectOption[] = [
  { label: "New Regime", value: "new" },
  { label: "Old Regime", value: "old" },
];

const ageOptions: SelectOption[] = [
  { label: "Below 60", value: "below60" },
  { label: "60–79", value: "senior" },
  { label: "80 and above", value: "super" },
];

// INCOME FIELDS

const incomeFields: InputField[] = [
  {
    key: "salary",
    label: "Salary Income",
    placeholder: "Enter salary income",
  },
  {
    key: "house",
    label: "House Property Income / Loss",
    placeholder: "Enter house property income or loss",
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

// CAPITAL GAINS FIELDS

const capitalGainFields: InputField[] = [
  {
    key: "bfSTCG",
    label: "BF STCG Loss",
    placeholder: "Enter brought forward STCG loss",
  },

  {
    key: "stcgApplicableQ1",
    label: "STCG Applicable Rate Q1",
    placeholder: "Apr–Jun",
  },
  {
    key: "stcgApplicableQ2",
    label: "STCG Applicable Rate Q2",
    placeholder: "Jul–Sep",
  },
  {
    key: "stcgApplicableQ3",
    label: "STCG Applicable Rate Q3",
    placeholder: "Oct–Dec",
  },
  {
    key: "stcgApplicableQ4",
    label: "STCG Applicable Rate Q4",
    placeholder: "Jan–Mar",
  },

  {
    key: "stcg20Q1",
    label: "STCG 20% Q1",
    placeholder: "Apr–Jun",
  },
  {
    key: "stcg20Q2",
    label: "STCG 20% Q2",
    placeholder: "Jul–Sep",
  },
  {
    key: "stcg20Q3",
    label: "STCG 20% Q3",
    placeholder: "Oct–Dec",
  },
  {
    key: "stcg20Q4",
    label: "STCG 20% Q4",
    placeholder: "Jan–Mar",
  },

  {
    key: "otherSources",
    label: "Other Sources",
    placeholder: "Enter other sources income",
  },
  {
    key: "bfLTCG",
    label: "BF LTCG Loss",
    placeholder: "Enter brought forward LTCG loss",
  },

  {
    key: "ltcg125Q1",
    label: "LTCG 12.5% Q1",
    placeholder: "Apr–Jun",
  },
  {
    key: "ltcg125Q2",
    label: "LTCG 12.5% Q2",
    placeholder: "Jul–Sep",
  },
  {
    key: "ltcg125Q3",
    label: "LTCG 12.5% Q3",
    placeholder: "Oct–Dec",
  },
  {
    key: "ltcg125Q4",
    label: "LTCG 12.5% Q4",
    placeholder: "Jan–Mar",
  },

  {
    key: "ltcg20Q1",
    label: "LTCG 20% Q1",
    placeholder: "Apr–Jun",
  },
  {
    key: "ltcg20Q2",
    label: "LTCG 20% Q2",
    placeholder: "Jul–Sep",
  },
  {
    key: "ltcg20Q3",
    label: "LTCG 20% Q3",
    placeholder: "Oct–Dec",
  },
  {
    key: "ltcg20Q4",
    label: "LTCG 20% Q4",
    placeholder: "Jan–Mar",
  },

  {
    key: "ltcgApplicableQ1",
    label: "LTCG Applicable Rate Q1",
    placeholder: "Apr–Jun",
  },
  {
    key: "ltcgApplicableQ2",
    label: "LTCG Applicable Rate Q2",
    placeholder: "Jul–Sep",
  },
  {
    key: "ltcgApplicableQ3",
    label: "LTCG Applicable Rate Q3",
    placeholder: "Oct–Dec",
  },
  {
    key: "ltcgApplicableQ4",
    label: "LTCG Applicable Rate Q4",
    placeholder: "Jan–Mar",
  },

  {
    key: "ltcg112A",
    label: "LTCG Section 112A",
    placeholder: "Enter LTCG under Section 112A",
  },
  {
    key: "bfLTCG112A",
    label: "BF Section 112A Loss",
    placeholder: "Enter brought forward 112A loss",
  },
];

// ADJUSTMENT FIELDS

const adjustmentFields: InputField[] = [
  {
    key: "exemption54",
    label: "Section 54 Exemption",
    placeholder: "Enter Section 54 exemption",
  },
  {
    key: "bfHP",
    label: "BF House Property Loss",
    placeholder: "Enter brought forward HP loss",
  },
  {
    key: "bfBusiness",
    label: "BF Business Loss",
    placeholder: "Enter brought forward business loss",
  },
  {
    key: "bfSpeculative",
    label: "BF Speculative Loss",
    placeholder: "Enter brought forward speculative loss",
  },
  {
    key: "deductions",
    label: "Deductions",
    placeholder: "Enter deductions",
  },
];

export default function AdvanceTaxCalculator() {
  const navigate = useNavigate();

  const [f, setF] = useState<TaxForm>(initialForm);

  // UPDATE SELECT FIELDS

  const updateSelect = (key: SelectFieldKey, value: string) => {
    setF((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // UPDATE NUMBER FIELDS

  const updateNumber = (key: NumericField, value: string) => {
    setF((previous) => ({
      ...previous,
      [key]: Number(value) || 0,
    }));
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

  // TAX SLAB CALCULATION

  const slabTax = (income: number): number => {
    let tax = 0;

    if (f.regime === "new") {
      const slabs: [number, number][] = [
        [400000, 0],
        [400000, 0.05],
        [400000, 0.1],
        [400000, 0.15],
        [400000, 0.2],
        [400000, 0.25],
        [Infinity, 0.3],
      ];

      let remaining = income;

      for (const [limit, rate] of slabs) {
        if (remaining <= 0) break;

        const taxable = Math.min(limit, remaining);

        tax += taxable * rate;
        remaining -= taxable;
      }
    } else {
      let basic = 250000;

      if (f.age === "senior") basic = 300000;
      if (f.age === "super") basic = 500000;

      if (income > basic) {
        if (income <= 500000) {
          tax += (income - basic) * 0.05;
        } else if (income <= 1000000) {
          tax += (500000 - basic) * 0.05;
          tax += (income - 500000) * 0.2;
        } else {
          tax += (500000 - basic) * 0.05;
          tax += 500000 * 0.2;
          tax += (income - 1000000) * 0.3;
        }
      }
    }

    return tax;
  };

  // CAPITAL GAINS TAX

  const capitalGainTax = (): number => {
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

    let tax =
      stcgNet * f.stcgRate +
      ltcgNet * f.ltcgRate +
      ltcg112A * 0.1;

    tax -= f.exemption54;

    return Math.max(0, tax);
  };

  // SURCHARGE

  const surcharge = (income: number, taxAmount: number): number => {
    let rate = 0;

    if (income > 50000000) rate = 0.37;
    else if (income > 20000000) rate = 0.25;
    else if (income > 10000000) rate = 0.15;
    else if (income > 5000000) rate = 0.1;

    return taxAmount * rate;
  };

  // FINAL TAX LIABILITY

  const calculateTax = (): number => {
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

    const capitalGains = capitalGainTax();

    let total = slab + capitalGains + speculativeTax;

    total += surcharge(income, total);
    total += total * 0.04;

    return Math.round(total);
  };

  const tax = calculateTax();

  // ADVANCE TAX INSTALLMENTS

  const advanceTax: ScheduleItem[] =
    tax > 10000
      ? [
          { label: "15 June · 15%", value: tax * 0.15 },
          { label: "15 September · 45%", value: tax * 0.45 },
          { label: "15 December · 75%", value: tax * 0.75 },
          { label: "15 March · 100%", value: tax },
        ]
      : [];

  // FORMAT AMOUNT

  const formatAmount = (value: number): string =>
    Math.round(value || 0).toLocaleString("en-IN");

  // REUSABLE NUMBER FIELD RENDERER

  const renderFields = (fields: InputField[]) =>
    fields.map((item) => (
      <div className="advance-field" key={item.key}>
        <NumberField
          id={`advance-${item.key}`}
          label={item.label}
          value={f[item.key]}
          placeholder={item.placeholder}
          min={0}
          step="any"
          fullWidth
          onChange={(value) => updateNumber(item.key, value)}
        />
      </div>
    ));

  return (
    <main className="advance-tax-page">
      <Breadcrumb current="Advance Tax Calculator" />

      <div className="advance-tax-container">
        {/* BACK BUTTON */}

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

        {/* HEADER */}

        <header className="advance-header">
          <div className="advance-header-content">
            <span className="advance-kicker">
              <span className="advance-status-dot" />
              TAX CALCULATION TOOL
            </span>

            <h1>Advance Tax Calculator</h1>

            <p>
              Calculate your estimated tax liability and installment-wise
              advance tax payable.
            </p>
          </div>

          <div className="advance-header-badge">
            <span>Estimated Tax</span>
            <strong>₹ {formatAmount(tax)}</strong>
          </div>
        </header>

        <div className="advance-layout">
          <section className="advance-left-stack">
            {/* TAX PROFILE */}

            <div className="advance-card">
              <div className="advance-section-title">
                <span className="advance-section-number">01</span>

                <div>
                  <h2>Tax Profile</h2>
                  <p>
                    Configure your residential status, regime and age.
                  </p>
                </div>
              </div>

              <div className="advance-form-grid three">
                <div className="advance-field">
                  <SelectField
                    id="residential"
                    label="Residential Status"
                    value={f.residential}
                    options={residentialOptions}
                    fullWidth
                    onChange={(value) =>
                      updateSelect("residential", value)
                    }
                  />
                </div>

                <div className="advance-field">
                  <SelectField
                    id="regime"
                    label="Tax Regime"
                    value={f.regime}
                    options={regimeOptions}
                    fullWidth
                    onChange={(value) =>
                      updateSelect("regime", value)
                    }
                  />
                </div>

                <div className="advance-field">
                  <SelectField
                    id="age"
                    label="Age Category"
                    value={f.age}
                    options={ageOptions}
                    fullWidth
                    onChange={(value) =>
                      updateSelect("age", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* INCOME DETAILS */}

            <div className="advance-card">
              <div className="advance-section-title">
                <span className="advance-section-number">02</span>

                <div>
                  <h2>Income Details</h2>
                  <p>
                    Enter all applicable income heads for the financial year.
                  </p>
                </div>
              </div>

              <div className="advance-form-grid">
                {renderFields(incomeFields)}
              </div>
            </div>

            {/* CAPITAL GAINS */}

            <div className="advance-card">
              <div className="advance-section-title">
                <span className="advance-section-number">03</span>

                <div>
                  <h2>Capital Gains</h2>
                  <p>
                    Enter quarterly capital gains and brought-forward losses.
                  </p>
                </div>
              </div>

              <div className="advance-form-grid">
                {renderFields(capitalGainFields)}
              </div>
            </div>

            {/* ADJUSTMENTS */}

            <div className="advance-card">
              <div className="advance-section-title">
                <span className="advance-section-number">04</span>

                <div>
                  <h2>Adjustments & Deductions</h2>
                  <p>
                    Enter exemptions, deductions and brought-forward losses.
                  </p>
                </div>
              </div>

              <div className="advance-form-grid">
                {renderFields(adjustmentFields)}
              </div>
            </div>
          </section>

          {/* RESULT PANEL */}

          <aside className="advance-result-panel">
            <div className="advance-result-head">
              <span className="advance-result-label">FINAL OUTPUT</span>

              <h2>₹ {formatAmount(tax)}</h2>

              <p>Estimated Total Tax Liability</p>
            </div>

            <div className="advance-result-list">
              <div className="advance-result-item">
                <span>Residential Status</span>

                <strong>
                  {f.residential === "resident"
                    ? "Resident"
                    : "Non Resident"}
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
                      ? "60–79"
                      : "80 and above"}
                </strong>
              </div>

              <div className="advance-result-item final">
                <span>Total Tax Liability</span>

                <strong>₹ {formatAmount(tax)}</strong>
              </div>
            </div>

            {/* ADVANCE TAX SCHEDULE */}

            <div className="advance-schedule-wrap">
              <div className="advance-schedule-title">
                <h3>Advance Tax Schedule</h3>

                <p>
                  Installment-wise cumulative advance tax targets.
                </p>
              </div>

              {advanceTax.length > 0 ? (
                <div className="advance-schedule-list">
                  {advanceTax.map((item) => (
                    <div
                      className="advance-schedule-item"
                      key={item.label}
                    >
                      <span>{item.label}</span>

                      <strong>
                        ₹ {formatAmount(item.value)}
                      </strong>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="advance-info-box">
                  <strong>No Advance Tax Schedule</strong>

                  <p>
                    The schedule is displayed when the calculated tax
                    liability exceeds ₹10,000.
                  </p>
                </div>
              )}
            </div>

            {/* INFORMATION */}

            <div className="advance-result-note">
              <span aria-hidden="true">ⓘ</span>

              <p>
                This is an estimated calculation. Verify applicable tax
                rules, rates and eligibility before making a payment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}