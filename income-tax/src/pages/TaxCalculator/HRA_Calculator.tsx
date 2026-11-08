
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import NumberField from "../../components/ui/NumberField";
import SelectField from "../../components/ui/SelectField";
import SkeletonLoader from "../../components/ui/SkeletonLoader";

import "./hra-calculator.scss";

interface HRAForm {
  basicSalary: string;
  da: string;
  commission: string;
  hraReceived: string;
  rentPaid: string;
  cityType: "" | "metro" | "nonMetro";
}

interface HRAResult {
  salaryForHRA: number;
  conditionA: number;
  conditionB: number;
  conditionC: number;
  exemptHRA: number;
  taxableHRA: number;
  warnings: string[];
}

interface SelectOption {
  label: string;
  value: string;
}

type NumericField =
  | "basicSalary"
  | "da"
  | "commission"
  | "hraReceived"
  | "rentPaid";

const initialState: HRAForm = {
  basicSalary: "",
  da: "",
  commission: "",
  hraReceived: "",
  rentPaid: "",
  cityType: "",
};

const cityOptions: SelectOption[] = [
  { label: "Metro", value: "metro" },
  { label: "Non-Metro", value: "nonMetro" },
];

export default function HRA_Calculator() {
  const navigate = useNavigate();

  const [form, setForm] = useState<HRAForm>(initialState);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // INITIAL SKELETON LOADING

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageLoading(false);
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  // BACK NAVIGATION

  const handleBack = () => {
    if (isNavigating) return;

    setIsNavigating(true);

    window.setTimeout(() => {
      navigate(-1);
    }, 200);
  };

  // UPDATE FORM FIELDS

  const updateField = <K extends keyof HRAForm>(
    key: K,
    value: HRAForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // UPDATE NUMBER FIELDS

  const updateNumberField = (
    key: NumericField,
    value: number | null
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value === null ? "" : String(value),
    }));
  };

  // CONVERT STRING TO NUMBER

  const num = (value: string): number => Number(value) || 0;

  // HRA CALCULATION

  const result = useMemo<HRAResult>(() => {
    const warnings: string[] = [];

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

  // CURRENCY FORMATTER

  const formatCurrency = (amount: number): string => {
    return Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  // SKELETON LOADER

  if (isPageLoading) {
    return (
      <main className="hra-modern-page" aria-busy="true">
        <div className="hra-modern-container">

          {/* BACK BUTTON SKELETON */}

          <div className="business-code-back-wrapper">
            <SkeletonLoader
              variant="rounded"
              width={115}
              height={48}
            />
          </div>

          {/* HEADER SKELETON */}

          <header className="hra-modern-header">
            <div>
              <SkeletonLoader
                variant="text"
                width={150}
                height={22}
              />

              <SkeletonLoader
                variant="text"
                width={280}
                height={48}
              />

              <SkeletonLoader
                variant="text"
                width={380}
                height={24}
              />
            </div>

            <SkeletonLoader
              variant="rounded"
              width={150}
              height={90}
            />
          </header>

          {/* CONTENT SKELETON */}

          <div className="hra-modern-grid">

            <section className="hra-modern-card">
              <SkeletonLoader
                variant="text"
                width="45%"
                height={30}
              />

              <SkeletonLoader
                variant="text"
                width="65%"
                height={22}
              />

              <div className="hra-form-grid">
                {Array.from({ length: 6 }, (_, index) => (
                  <SkeletonLoader
                    key={index}
                    variant="rounded"
                    height={58}
                  />
                ))}
              </div>

              <SkeletonLoader
                variant="rounded"
                height={85}
              />

              <SkeletonLoader
                variant="rounded"
                height={100}
              />
            </section>

            {/* RESULT PANEL SKELETON */}

            <aside className="hra-result-panel">
              <SkeletonLoader
                variant="rounded"
                height={150}
              />

              <SkeletonLoader
                variant="text"
                height={35}
                count={6}
              />
            </aside>

          </div>
        </div>
      </main>
    );
  }

  // MAIN PAGE

  return (
    <main
      className="hra-modern-page"
      aria-busy={isNavigating}
    >
      <div className="hra-modern-container">

        {/* BACK BUTTON */}

        <div className="business-code-back-wrapper">
          <button
            type="button"
            className="business-code-back-btn"
            onClick={handleBack}
            disabled={isNavigating}
            aria-label={
              isNavigating ? "Going back" : "Go back"
            }
          >
            {isNavigating ? (
              <>
                <CircularProgress
                  size={17}
                  thickness={5}
                  className="hra-button-spinner"
                  aria-label="Loading"
                />
                Going back...
              </>
            ) : (
              <>
                <span aria-hidden="true">←</span>
                Back
              </>
            )}
          </button>
        </div>

        {/* HEADER */}

        <header className="hra-modern-header">
          <div>
            <p className="hra-modern-kicker">
              Salary Tax Utility
            </p>

            <h1>HRA Calculator</h1>

            <p>
              Calculate HRA exemption and taxable HRA under
              Section 10(13A).
            </p>
          </div>

          <div className="hra-modern-badge">
            <span>Section</span>
            <strong>10(13A)</strong>
          </div>
        </header>

        {/* MAIN GRID */}

        <div className="hra-modern-grid">

          {/* LEFT FORM */}

          <section className="hra-modern-card">

            <div className="hra-section-title">
              <h2>Salary & Rent Details</h2>

              <p>
                Enter salary, HRA received, rent paid and city type.
              </p>
            </div>

            <div className="hra-form-grid">

              {/* BASIC SALARY */}

              <div className="hra-field">
                <NumberField
                  id="basicSalary"
                  label="Basic Salary *"
                  value={num(form.basicSalary)}
                  onChange={(value) =>
                    updateNumberField("basicSalary", value)
                  }
                  placeholder="Enter basic salary"
                  min={0}
                  fullWidth
                />
              </div>

              {/* DEARNESS ALLOWANCE */}

              <div className="hra-field">
                <NumberField
                  id="da"
                  label="Dearness Allowance (DA)"
                  value={num(form.da)}
                  onChange={(value) =>
                    updateNumberField("da", value)
                  }
                  placeholder="Enter DA forming part of salary"
                  min={0}
                  fullWidth
                />
              </div>

              {/* COMMISSION */}

              <div className="hra-field">
                <NumberField
                  id="commission"
                  label="Commission"
                  value={num(form.commission)}
                  onChange={(value) =>
                    updateNumberField("commission", value)
                  }
                  placeholder="Enter commission amount"
                  min={0}
                  fullWidth
                />
              </div>

              {/* HRA RECEIVED */}

              <div className="hra-field">
                <NumberField
                  id="hraReceived"
                  label="HRA Received *"
                  value={num(form.hraReceived)}
                  onChange={(value) =>
                    updateNumberField("hraReceived", value)
                  }
                  placeholder="Enter HRA received"
                  min={0}
                  fullWidth
                />
              </div>

              {/* RENT PAID */}

              <div className="hra-field">
                <NumberField
                  id="rentPaid"
                  label="Rent Paid *"
                  value={num(form.rentPaid)}
                  onChange={(value) =>
                    updateNumberField("rentPaid", value)
                  }
                  placeholder="Enter annual rent paid"
                  min={0}
                  fullWidth
                />
              </div>

              {/* CITY TYPE DROPDOWN */}

              <div className="hra-field">
                <SelectField
                  id="cityType"
                  label="City Type *"
                  value={form.cityType}
                  options={cityOptions}
                  onChange={(value) =>
                    updateField(
                      "cityType",
                      value as HRAForm["cityType"]
                    )
                  }
                  fullWidth
                />
              </div>

            </div>

            {/* WARNINGS */}

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

            {/* INFORMATION */}

            <div className="hra-info-box">
              <strong>Information</strong>

              <p>
                HRA exemption is calculated as the least of
                actual HRA received, prescribed salary percentage,
                and rent paid minus 10% of salary.
              </p>
            </div>

          </section>

          {/* RIGHT RESULT PANEL */}

          <aside className="hra-result-panel">

            <div className="hra-result-head">
              <p>Computation Summary</p>

              <h2>
                ₹ {formatCurrency(result.exemptHRA)}
              </h2>

              <span>Exempt HRA</span>
            </div>

            <div className="hra-result-list">

              <div className="hra-result-item">
                <span>Salary for HRA</span>

                <strong>
                  ₹ {formatCurrency(result.salaryForHRA)}
                </strong>
              </div>

              <div className="hra-result-item">
                <span>50% / 40% of Salary</span>

                <strong>
                  ₹ {formatCurrency(result.conditionA)}
                </strong>
              </div>

              <div className="hra-result-item">
                <span>Actual HRA Received</span>

                <strong>
                  ₹ {formatCurrency(result.conditionB)}
                </strong>
              </div>

              <div className="hra-result-item">
                <span>Rent Paid - 10% Salary</span>

                <strong>
                  ₹ {formatCurrency(result.conditionC)}
                </strong>
              </div>

              <div className="hra-result-item exempt">
                <span>Exempt HRA</span>

                <strong>
                  ₹ {formatCurrency(result.exemptHRA)}
                </strong>
              </div>

              <div className="hra-result-item final">
                <span>Taxable HRA</span>

                <strong>
                  ₹ {formatCurrency(result.taxableHRA)}
                </strong>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}
