import React, { useEffect, useMemo, useState } from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Button, CircularProgress, MenuItem, Skeleton, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";


function PartnerNumberField({ label, value, onChange, placeholder, readOnly = false, step = 1 }) {
  const numericValue = value === "" || value === null || value === undefined ? null : Number(value);
  return (
    <BaseNumberField.Root
      value={Number.isFinite(numericValue) ? numericValue : null}
      onValueChange={(nextValue) => onChange(nextValue === null ? "" : String(nextValue))}
      step={step}
      smallStep={step}
      disabled={readOnly}
    >
      <BaseNumberField.Group className="pr-number-group">
        <BaseNumberField.Input aria-label={label} placeholder={placeholder} className="pr-number-input" />
        <div className="pr-number-steppers">
          <BaseNumberField.Increment className="pr-number-stepper" aria-label={`Increase ${label}`}>+</BaseNumberField.Increment>
          <BaseNumberField.Decrement className="pr-number-stepper" aria-label={`Decrease ${label}`}>−</BaseNumberField.Decrement>
        </div>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

export default function PartnerRemunerationCalculator() {

  const navigate = useNavigate();

  const assessmentYears = [

    "2017-18","2018-19","2019-20","2020-21","2021-22",

    "2022-23","2023-24","2024-25","2025-26","2026-27",

  ];



 const emptyPartner = {

  name: "",

  profitRatio: "",

  amount: "",

};



  const getInitialState = () => ({

    assessmentYear: "",

    netProfit: "",

    totalInterestPaid: "",

    remunerationToPartner: "",

    salaryToPartners: "",

    bonusToPartners: "",

    commissionToPartners: "",

    depreciation: "",

    otherDisallowances: "",

    depreciationAllowable: "",

    otherAllowableItems: "",

    manualProfitBefore: "",

    manualLessInterest: "",

    editProfitBefore: false,

    editLessInterest: false,

    partners: [{ ...emptyPartner }],

  });



  const [form, setForm] = useState(getInitialState);

  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCalculate = () => {
    if (isCalculating || isLoading) return;
    setIsCalculating(true);
    window.setTimeout(() => setIsCalculating(false), 650);
  };



  const update = (key, value) => {

    setForm((prev) => ({ ...prev, [key]: value }));

  };



  const updatePartner = (index, field, value) => {

    setForm((prev) => {

      const partners = [...(prev.partners || [])];



      partners[index] = {

        ...partners[index],

        [field]: value,

      };



      return { ...prev, partners };

    });

  };



  const addPartner = () => {

    setForm((prev) => ({

      ...prev,

      partners: [...(prev.partners || []), { ...emptyPartner }],

    }));

  };



  const removePartner = (index) => {

    setForm((prev) => {

      const partners = prev.partners.filter((_, i) => i !== index);

      return {

        ...prev,

        partners: partners.length ? partners : [{ ...emptyPartner }],

      };

    });

  };



  const resetForm = () => {

    setForm(getInitialState());

  };



  const num = (v) => Number(v) || 0;



  const result = useMemo(() => {

   const netProfit = Number(form.netProfit) || 0;

const salary = Number(form.salaryToPartners) || 0;

const bonus = Number(form.bonusToPartners) || 0;

const commission = Number(form.commissionToPartners) || 0;

const remunerationInput = Number(form.remunerationToPartner) || 0;

const depreciation = Number(form.depreciation) || 0;

const otherDisallowances = Number(form.otherDisallowances) || 0;

const depreciationAllowable = Number(form.depreciationAllowable) || 0;

const otherAllowableItems = Number(form.otherAllowableItems) || 0;



    const totalInterestFromTable = (form.partners || []).reduce(

  (sum, p) => sum + (Number(p.amount) || 0),

  0

);



    const totalInterestPaid = totalInterestFromTable;



    const totalRemunerationClaimed =

      remunerationInput + salary + bonus + commission;



   const profitBeforeAuto =

  netProfit +

  depreciation +

  totalInterestFromTable +

  totalRemunerationClaimed +

  otherDisallowances;



    const lessInterestAuto = totalInterestPaid;



    const profitBefore = profitBeforeAuto;







const lessInterest = totalInterestPaid * 0.12;



    const bookProfitBase =

      profitBefore -

      lessInterest -

      depreciationAllowable -

      otherAllowableItems;



    let maxRemuneration = 0;



    const isNewRule = form.assessmentYear === "2026-27";



    if (bookProfitBase <= 0) {

      maxRemuneration = isNewRule ? 300000 : 150000;

    } else {

      const firstLimit = isNewRule ? 600000 : 300000;

      const minimum = isNewRule ? 300000 : 150000;



      if (bookProfitBase <= firstLimit) {

        maxRemuneration = Math.max(minimum, bookProfitBase * 0.9);

      } else {

        const firstPart = Math.max(minimum, firstLimit * 0.9);

        const remaining = (bookProfitBase - firstLimit) * 0.6;

        maxRemuneration = firstPart + remaining;

      }

    }



    const totalRemunerationAllowed = Math.min(

      totalRemunerationClaimed,

      maxRemuneration

    );

    const finalBookProfit =

  bookProfitBase - totalRemunerationAllowed;



    return {

 totalInterestPaid,

  bookProfitBase,

  totalRemunerationAllowed,

  profitBefore,

  lessInterest,

  finalBookProfit,

};

  }, [form]);



  const format = (v) =>

    Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2 });



   return (

  <div className="pr-modern-page">

    <div className="pr-modern-container">

    <div className="business-code-back-wrapper">

          <button

            type="button"

            className="business-code-back-btn"

            onClick={() => navigate(-1)}

          >

            <span>←</span>

            Back

          </button>

        </div>

      {/* HEADER */}

      {isLoading ? (
        <div className="pr-page-skeleton" role="status" aria-label="Loading partner remuneration calculator">
          <div className="pr-skeleton-header">
            <div className="pr-skeleton-heading">
              <Skeleton variant="text" width={150} height={20} />
              <Skeleton variant="text" width="min(440px, 85%)" height={44} />
              <Skeleton variant="text" width="min(520px, 90%)" height={22} />
            </div>
            <Skeleton variant="rounded" width={170} height={68} />
          </div>
          <div className="pr-skeleton-grid">
            <div className="pr-skeleton-card">
              <Skeleton variant="text" width={220} height={30} />
              <Skeleton variant="text" width={300} height={20} />
              <div className="pr-skeleton-fields">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div className="pr-skeleton-field" key={i}>
                    <Skeleton variant="text" width="48%" height={20} />
                    <Skeleton variant="rounded" width="100%" height={44} />
                  </div>
                ))}
              </div>
              <Skeleton variant="rounded" width="100%" height={90} />
              <div className="pr-skeleton-actions">
                <Skeleton variant="rounded" width={100} height={42} />
                <Skeleton variant="rounded" width={150} height={42} />
              </div>
            </div>
            <div className="pr-skeleton-card pr-skeleton-result">
              <Skeleton variant="text" width="65%" height={26} />
              <Skeleton variant="rounded" width="100%" height={130} />
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rounded" width="100%" height={42} />)}
            </div>
          </div>
        </div>
      ) : (
      <>
      <div className="pr-modern-header">

        <div>

          <p className="pr-modern-kicker">Firm Tax Utility</p>

          <h1>Partner Remuneration Calculator</h1>

          <p>

            Calculate allowable partner remuneration, interest adjustment and final book profit.

          </p>

        </div>



        <div className="pr-modern-badge">

          <span>Assessment Year</span>

          <strong>{form.assessmentYear || "Not Selected"}</strong>

        </div>

      </div>



      <div className="pr-modern-grid">



        {/* LEFT FORM */}

        <div className="pr-modern-card">

          <div className="pr-section-title">

            <h2>Firm & Partner Details</h2>

            <p>Enter profit and partner-wise interest details for book profit computation</p>

          </div>



          <div className="pr-form-grid">

            <div className="pr-field">

              <label>Assessment Year <span>*</span></label>

              <TextField select fullWidth size="small" className="pr-mui-field" value={form.assessmentYear}
                onChange={(e) => update("assessmentYear", e.target.value)} SelectProps={{ displayEmpty: true }}>
                <MenuItem value=""><em>Select AY</em></MenuItem>
                {assessmentYears.map((ay) => <MenuItem key={ay} value={ay}>{ay}</MenuItem>)}
              </TextField>

            </div>



            <div className="pr-field">

              <label>Net Profit / (Loss) as per P&L</label>

              <PartnerNumberField
                label="Net Profit / (Loss) as per P&L"
                placeholder="Enter net profit / loss"
                value={form.netProfit}
                onChange={(value) => update("netProfit", value)}
              />

            </div>

          </div>



          {/* PARTNER TABLE */}

          <div className="pr-table-section">

            <div className="pr-sub-title">

              <h3>Interest Paid to Partners</h3>

              <button onClick={addPartner} className="pr-btn-primary">

                Add More

              </button>

            </div>



            <div className="pr-table-wrap">

              <table className="pr-table">

                <thead>

                  <tr>

                    <th>S.No.</th>

                    <th>Name of Partner</th>

                    <th>Actual Rate (%)</th>

                    <th>Amount of Interest</th>

                    <th>Action</th>

                  </tr>

                </thead>



                <tbody>

                  {form.partners.map((p, i) => (

                    <tr key={i}>

                      <td>{i + 1}</td>



                      <td>

                        <input

                          value={p.name}

                          placeholder="Partner name"

                          onChange={(e) =>

                            updatePartner(i, "name", e.target.value)

                          }

                        />

                      </td>



                      <td>

                        <PartnerNumberField
                          label={`Partner ${i + 1} actual rate`}
                          value={p.actualRate}
                          placeholder="Rate %"
                          step={0.5}
                          onChange={(value) => {
                            const newValue = Number(value) || 0;

                            const otherTotal = form.partners.reduce(

                              (sum, row, idx) =>

                                idx !== i

                                  ? sum + (Number(row.actualRate) || 0)

                                  : sum,

                              0

                            );



                            if (otherTotal + newValue > 100) {

                              alert("Total Actual Rate (%) cannot exceed 100%");

                              return;

                            }



                            updatePartner(i, "actualRate", value);

                          }}

                        />

                      </td>



                      <td>

                        <PartnerNumberField
                          label={`Partner ${i + 1} interest amount`}
                          value={p.amount}
                          placeholder="Amount"
                          onChange={(value) => updatePartner(i, "amount", value)}
                        />

                      </td>



                      <td>

                        <button
                          type="button"
                          onClick={() => removePartner(i)}
                          className="pr-btn-delete"
                          aria-label={`Delete partner ${i + 1}`}
                          title={`Delete partner ${i + 1}`}
                        >
                          <svg
                            className="pr-delete-icon"
                            viewBox="0 0 24 24"
                            width="19"
                            height="19"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>



          {/* OTHER INPUTS */}

          <div className="pr-section-title small">

            <h2>Profit & Allowance Details</h2>

            <p>Enter remuneration, depreciation and other adjustment amounts</p>

          </div>



          <div className="pr-form-grid">

            {[

              ["totalInterestPaid", "Total Interest Paid to Partners"],

              ["remunerationToPartner", "Remuneration to Partner"],

              ["salaryToPartners", "Salary to Partners"],

              ["bonusToPartners", "Bonus to Partners"],

              ["commissionToPartners", "Commission to Partners"],

              ["depreciation", "Depreciation"],

              ["otherDisallowances", "Interest Paid to Partners and Other Disallowances"],

              ["depreciationAllowable", "Depreciation allowable as per Income-Tax Act, 1961"],

              ["otherAllowableItems", "Other Allowable Items"],

            ].map(([key, label]) => (

              <div key={key} className="pr-field">

                <label>{label}</label>

                <PartnerNumberField label={label} placeholder="Enter amount"
                  value={key === "totalInterestPaid" ? result.totalInterestPaid : form[key]}
                  onChange={(value) => key !== "totalInterestPaid" && update(key, value)}
                  readOnly={key === "totalInterestPaid"} />

              </div>

            ))}

          </div>



          {/* INFORMATION */}

          <div className="pr-info-box">

            <strong>Information</strong>

            <p>

              Please check the interest allowed as per Income-tax Act. In case any

              capital is introduced or withdrawn during the year, please change the

              interest amount manually.

            </p>

          </div>



          {/* ACTION */}

          <div className="pr-modern-actions">
            <button onClick={resetForm} className="pr-btn-secondary" type="button">Reset</button>
            <Button variant="contained" onClick={handleCalculate} disabled={isCalculating}
              className="pr-calculate-button"
              startIcon={isCalculating ? <CircularProgress size={17} color="inherit" /> : null}>
              {isCalculating ? "Calculating..." : "Calculate"}
            </Button>
          </div>

        </div>



        {/* RIGHT RESULT PANEL */}

        <div className="pr-result-panel">

          <div className="pr-result-head">

            <p>Computation Summary</p>

            <h2>₹ {format(result.finalBookProfit || 0)}</h2>

            <span>Final Book Profit</span>

          </div>



          <div className="pr-result-list">

            <div className="pr-result-item">

              <span>Total Interest Paid</span>

              <strong>₹ {format(result.totalInterestPaid || 0)}</strong>

            </div>



            <div className="pr-result-item">

              <span>Profit Before Interest / Depreciation / Remuneration</span>

              <strong>₹ {format(result.profitBefore || 0)}</strong>

            </div>



            <div className="pr-result-item">

              <span>Less: Interest on Capital to Partners</span>

              <strong>₹ {format(result.lessInterest || 0)}</strong>

            </div>



            <div className="pr-result-item">

              <span>Book Profit Base</span>

              <strong>₹ {format(result.bookProfitBase || 0)}</strong>

            </div>



            <div className="pr-result-item">

              <span>Total Remuneration Allowed</span>

              <strong>₹ {format(result.totalRemunerationAllowed || 0)}</strong>

            </div>



            <div className="pr-result-item final">

              <span>Final Book Profit</span>

              <strong>₹ {format(result.finalBookProfit || 0)}</strong>

            </div>

          </div>

        </div>

      </div>
      </>
      )}

    </div>



    <style>{`

      .pr-modern-page {

        min-height: 100vh;

        background:

          radial-gradient(circle at top left, rgba(37, 99, 235, 0.25), transparent 32%),

          linear-gradient(135deg, #07111f 0%, #0f172a 45%, #111827 100%);

        color: #e5e7eb;

        padding: 34px;

        font-family: Inter, Arial, sans-serif;

      }



      .pr-modern-container {

        max-width: 1300px;

        margin: 0 auto;

      }



      .pr-modern-header {

        display: flex;

        justify-content: space-between;

        align-items: center;

        gap: 20px;

        margin-bottom: 28px;

        padding: 26px;

        border-radius: 24px;

        background: rgba(15, 23, 42, 0.86);

        border: 1px solid rgba(148, 163, 184, 0.18);

        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.35);

      }



      .pr-modern-kicker {

        color: #60a5fa;

        text-transform: uppercase;

        letter-spacing: 2px;

        font-size: 12px;

        font-weight: 800;

        margin: 0 0 8px;

      }



      .pr-modern-header h1 {

        font-size: 36px;

        line-height: 1.1;

        margin: 0;

        color: #ffffff;

      }



      .pr-modern-header p {

        margin: 10px 0 0;

        color: #94a3b8;

        font-size: 15px;

      }



      .pr-modern-badge {

        min-width: 190px;

        padding: 18px;

        border-radius: 20px;

        background: linear-gradient(135deg, rgba(37,99,235,0.18), rgba(14,165,233,0.12));

        border: 1px solid rgba(96, 165, 250, 0.28);

        text-align: center;

      }



      .pr-modern-badge span {

        display: block;

        color: #93c5fd;

        font-size: 12px;

        font-weight: 700;

        margin-bottom: 5px;

      }



      .pr-modern-badge strong {

        color: #ffffff;

        font-size: 20px;

      }



      .pr-modern-grid {

        display: grid;

        grid-template-columns: minmax(0, 1fr) 380px;

        gap: 26px;

        align-items: start;

      }



      .pr-modern-card,

      .pr-result-panel {

        background: rgba(15, 23, 42, 0.9);

        border: 1px solid rgba(148, 163, 184, 0.18);

        border-radius: 24px;

        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);

      }



      .pr-modern-card {

        padding: 26px;

      }



      .pr-section-title {

        margin-bottom: 24px;

        padding-bottom: 18px;

        border-bottom: 1px solid rgba(148, 163, 184, 0.15);

      }



      .pr-section-title.small {

        margin-top: 28px;

      }



      .pr-section-title h2 {

        margin: 0;

        color: #ffffff;

        font-size: 22px;

      }



      .pr-section-title p {

        margin: 7px 0 0;

        color: #94a3b8;

        font-size: 14px;

      }



      .pr-form-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 18px;

      }



      .pr-field {

        display: flex;

        flex-direction: column;

        gap: 8px;

      }



      .pr-field label {

        color: #cbd5e1;

        font-size: 13px;

        font-weight: 700;

      }



      .pr-field label span {

        color: #f87171;

      }



      .pr-field input,

      .pr-field select,

      .pr-table input {

        width: 100%;

        height: 46px;

        border-radius: 14px;

        border: 1px solid rgba(148, 163, 184, 0.22);

        background: rgba(2, 6, 23, 0.48);

        color: #ffffff;

        padding: 0 14px;

        outline: none;

        font-size: 14px;

        transition: all 0.2s ease;

      }



      .pr-field input::placeholder,

      .pr-table input::placeholder {

        color: #64748b;

      }



      .pr-field input:focus,

      .pr-field select:focus,

      .pr-table input:focus {

        border-color: #60a5fa;

        box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.14);

        background: rgba(15, 23, 42, 0.95);

      }



      .pr-field input[readonly] {

        opacity: 0.8;

        cursor: not-allowed;

        background: rgba(30, 41, 59, 0.75);

      }



      .pr-field option {

        background: #0f172a;

        color: #ffffff;

      }



      .pr-table-section {

        margin-top: 28px;

        padding: 20px;

        border-radius: 22px;

        background: rgba(2, 6, 23, 0.24);

        border: 1px solid rgba(148, 163, 184, 0.14);

      }



      .pr-sub-title {

        display: flex;

        justify-content: space-between;

        align-items: center;

        gap: 14px;

        margin-bottom: 16px;

      }



      .pr-sub-title h3 {

        margin: 0;

        color: #ffffff;

        font-size: 18px;

      }



      .pr-table-wrap {
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        border-radius: 18px;
        border: 1px solid #CBF1F5;
        background: #F4FEFE;
      }

      .pr-table {
        width: 100%;
        min-width: 0;
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0;
        background: #F4FEFE;
      }

      .pr-table th:nth-child(1), .pr-table td:nth-child(1) { width: 7%; }
      .pr-table th:nth-child(2), .pr-table td:nth-child(2) { width: 24%; }
      .pr-table th:nth-child(3), .pr-table td:nth-child(3) { width: 25%; }
      .pr-table th:nth-child(4), .pr-table td:nth-child(4) { width: 27%; }
      .pr-table th:nth-child(5), .pr-table td:nth-child(5) { width: 17%; }

      .pr-table th, .pr-table td {
        min-width: 0;
        overflow-wrap: anywhere;
        box-sizing: border-box;
      }

      .pr-table td input, .pr-table td .pr-number-group {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }



      .pr-table th {

        padding: 14px;

        text-align: left;

        color: #bfdbfe;

        font-size: 13px;

        font-weight: 800;

        background: rgba(37, 99, 235, 0.15);

        border-bottom: 1px solid rgba(148, 163, 184, 0.14);

      }



      .pr-table td {

        padding: 12px;

        color: #e5e7eb;

        font-size: 14px;

        border-bottom: 1px solid rgba(148, 163, 184, 0.1);

      }



      .pr-table tr:last-child td {

        border-bottom: none;

      }



      .pr-btn-primary,

      .pr-btn-secondary,

      .pr-btn-delete {

        height: 44px;

        padding: 0 20px;

        border-radius: 14px;

        font-weight: 800;

        cursor: pointer;

        transition: all 0.2s ease;

        white-space: nowrap;

      }



      .pr-btn-primary {

        border: none;

        background: linear-gradient(135deg, #2563eb, #0ea5e9);

        color: #ffffff;

        box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);

      }



      .pr-btn-primary:hover {

        transform: translateY(-1px);

        box-shadow: 0 18px 36px rgba(37, 99, 235, 0.35);

      }



      .pr-btn-secondary {

        background: rgba(148, 163, 184, 0.12);

        color: #cbd5e1;

        border: 1px solid rgba(148, 163, 184, 0.22);

      }



      .pr-btn-secondary:hover {

        background: rgba(248, 113, 113, 0.16);

        color: #fecaca;

        border-color: rgba(248, 113, 113, 0.32);

      }



      .pr-btn-delete {

        height: 38px;

        padding: 0 14px;

        border: 1px solid rgba(248, 113, 113, 0.32);

        background: rgba(248, 113, 113, 0.12);

        color: #fecaca;

      }



      .pr-btn-delete:hover {

        background: rgba(239, 68, 68, 0.24);

        color: #ffffff;

      }



      .pr-info-box {

        margin-top: 24px;

        padding: 16px;

        border-radius: 18px;

        background: rgba(37, 99, 235, 0.08);

        border: 1px solid rgba(96, 165, 250, 0.18);

      }



      .pr-info-box strong {

        color: #bfdbfe;

        font-size: 14px;

      }



      .pr-info-box p {

        margin: 7px 0 0;

        color: #94a3b8;

        font-size: 13px;

        line-height: 1.6;

      }



      .pr-modern-actions {

        display: flex;

        justify-content: flex-end;

        margin-top: 26px;

      }



      .pr-result-panel {

        overflow: hidden;

        position: sticky;

        top: 22px;

      }



      .pr-result-head {

        padding: 26px;

        background: linear-gradient(135deg, rgba(37, 99, 235, 0.32), rgba(14, 165, 233, 0.16));

        border-bottom: 1px solid rgba(148, 163, 184, 0.14);

      }



      .pr-result-head p {

        margin: 0;

        color: #bfdbfe;

        font-size: 13px;

        font-weight: 800;

        text-transform: uppercase;

        letter-spacing: 1.5px;

      }



      .pr-result-head h2 {

        margin: 14px 0 4px;

        color: #ffffff;

        font-size: 32px;

        line-height: 1.2;

        word-break: break-word;

      }



      .pr-result-head span {

        color: #93c5fd;

        font-size: 13px;

        font-weight: 700;

      }



      .pr-result-list {

        padding: 18px;

      }



      .pr-result-item {

        display: flex;

        justify-content: space-between;

        align-items: flex-start;

        gap: 14px;

        padding: 15px 0;

        border-bottom: 1px solid rgba(148, 163, 184, 0.12);

      }



      .pr-result-item:last-child {

        border-bottom: none;

      }



      .pr-result-item span {

        color: #94a3b8;

        font-size: 14px;

        line-height: 1.4;

      }



      .pr-result-item strong {

        color: #ffffff;

        font-size: 15px;

        text-align: right;

        white-space: nowrap;

      }



      .pr-result-item.final {

        margin-top: 10px;

        padding: 16px;

        border-radius: 16px;

        border: 1px solid rgba(34, 197, 94, 0.24);

        background: rgba(34, 197, 94, 0.08);

      }



      .pr-result-item.final span {

        color: #bbf7d0;

        font-weight: 800;

      }



      .pr-result-item.final strong {

        color: #86efac;

        font-size: 20px;

      }



      @media (max-width: 1100px) {

        .pr-modern-page {

          padding: 20px;

        }



        .pr-modern-header {

          flex-direction: column;

          align-items: flex-start;

        }



        .pr-modern-grid {

          grid-template-columns: 1fr;

        }



        .pr-result-panel {

          position: static;

        }

      }



      @media (max-width: 680px) {

        .pr-form-grid {

          grid-template-columns: 1fr;

        }



        .pr-sub-title {

          flex-direction: column;

          align-items: stretch;

        }



        .pr-modern-actions {

          flex-direction: column;

        }



        .pr-btn-primary,

        .pr-btn-secondary {

          width: 100%;

        }



        .pr-result-item {

          flex-direction: column;

        }



        .pr-result-item strong {

          text-align: left;

          white-space: normal;

        }

      }

        /* BACK BUTTON */



        .business-code-back-wrapper {



          margin-bottom: 20px;

        }



        .business-code-back-btn {

          display: inline-flex;

          align-items: center;

          gap: 8px;

          height: 46px;

          padding: 0 20px;

          border-radius: 14px;

          border: 1px solid rgba(148, 163, 184, 0.22);

          background: rgba(15, 23, 42, 0.9);

          color: #cbd5e1;

          font-size: 14px;

          font-weight: 800;

          cursor: pointer;

          transition: all 0.2s ease;

        }



        .business-code-back-btn:hover {

          border-color: #60a5fa;

          color: #ffffff;

          background: rgba(37, 99, 235, 0.12);

        }



        .business-code-back-btn span {

          font-size: 18px;

        }


      /* Back button — match the approved light teal portal theme */
      .business-code-back-wrapper {
        margin-bottom: 20px !important;
      }
      .business-code-back-btn {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 9px !important;
        min-height: 46px !important;
        padding: 0 21px !important;
        border: 1px solid #A6E3E9 !important;
        border-radius: 14px !important;
        background: #FFFFFF !important;
        color: #164E52 !important;
        font-size: 14px !important;
        font-weight: 750 !important;
        box-shadow: 0 3px 10px rgba(23,59,62,.04) !important;
        transition: background .18s ease, border-color .18s ease, transform .18s ease !important;
      }
      .business-code-back-btn:hover {
        border-color: #71C9CE !important;
        background: #E3FDFD !important;
        color: #164E52 !important;
        transform: translateY(-1px);
      }
      .business-code-back-btn span {
        color: #329DA3 !important;
        font-size: 20px !important;
        line-height: 1 !important;
      }

      /* Delete action — compact icon-only control */
      .pr-btn-delete {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 40px !important;
        min-width: 40px !important;
        height: 38px !important;
        padding: 0 !important;
        border: 1px solid #F3CACA !important;
        border-radius: 11px !important;
        background: #FFF7F7 !important;
        color: #D9534F !important;
        box-shadow: none !important;
        transition: background .18s ease, border-color .18s ease, transform .18s ease !important;
      }
      .pr-btn-delete:hover {
        border-color: #E99A96 !important;
        background: #FDECEC !important;
        color: #C64540 !important;
        transform: translateY(-1px);
      }
      .pr-delete-icon { display: block; flex: 0 0 auto; }

      /* Approved Income Tax Portal light palette */
      .pr-modern-page {
        background: #E3FDFD !important;
        color: #173B3E !important;
      }
      .pr-modern-header, .pr-modern-card, .pr-result-panel {
        background: #FFFFFF !important;
        border: 1px solid #CBF1F5 !important;
        box-shadow: 0 12px 32px rgba(23,59,62,.07) !important;
      }
      .pr-modern-kicker, .pr-modern-badge span { color: #329DA3 !important; }
      .pr-modern-header h1, .pr-modern-badge strong, .pr-section-title h2,
      .pr-sub-title h3, .pr-result-head h2 { color: #173B3E !important; }
      .pr-modern-header p, .pr-section-title p, .pr-field label,
      .pr-result-item span, .pr-result-head span { color: #52777A !important; }
      .pr-modern-badge {
        background: linear-gradient(135deg,#E3FDFD,#CBF1F5) !important;
        border: 1px solid #A6E3E9 !important;
      }
      .pr-section-title { border-bottom-color: #CBF1F5 !important; }
      .pr-field input, .pr-field select, .pr-table input {
        color: #173B3E !important; background: #FFFFFF !important;
        border: 1px solid #A6E3E9 !important;
      }
      .pr-field input:focus, .pr-field select:focus, .pr-table input:focus {
        border-color: #71C9CE !important;
        box-shadow: 0 0 0 3px rgba(113,201,206,.16) !important;
      }
      .pr-field input::placeholder, .pr-table input::placeholder { color: #78999B !important; }
      .pr-table-section, .pr-table { background: #F4FEFE !important; border-color: #CBF1F5 !important; }
      .pr-table th { color: #315F63 !important; background: #E3FDFD !important; border-color: #CBF1F5 !important; }
      .pr-table td { color: #315F63 !important; border-color: #CBF1F5 !important; }
      .pr-info-box { background: #E3FDFD !important; border-color: #A6E3E9 !important; color: #315F63 !important; }
      .pr-result-head { background: linear-gradient(135deg,#E3FDFD,#CBF1F5) !important; }
      .pr-result-item { border-color: #CBF1F5 !important; }
      .pr-result-item strong { color: #173B3E !important; }
      .pr-result-item.final { background: #E3FDFD !important; border-color: #71C9CE !important; }
      .pr-btn-primary, .pr-calculate-button {
        background: #71C9CE !important; color: #173B3E !important;
        border-radius: 12px !important; box-shadow: none !important;
      }
      .pr-btn-primary:hover, .pr-calculate-button:hover { background: #A6E3E9 !important; }
      .pr-btn-secondary { background: #FFFFFF !important; color: #315F63 !important; border: 1px solid #A6E3E9 !important; }
      .pr-btn-delete { background: #FFF5F5 !important; color: #C44D4D !important; }

      /* Base UI number field with compact vertical stepper controls */
      .pr-number-group {
        display: flex; align-items: stretch; width: 100%; min-height: 42px;
        overflow: hidden; border: 1px solid #71C9CE; border-radius: 13px;
        background: #FFFFFF; transition: border-color .18s ease, box-shadow .18s ease;
      }
      .pr-number-group:focus-within { border-color: #329DA3; box-shadow: 0 0 0 3px rgba(113,201,206,.16); }
      .pr-number-input {
        flex: 1 1 auto; width: 100%; min-width: 0; border: 0 !important;
        outline: 0 !important; padding: 0 13px; color: #173B3E !important;
        background: transparent !important; font: inherit; font-size: 14px;
      }
      .pr-number-input::placeholder { color: #78999B; opacity: 1; }
      .pr-number-steppers {
        display: flex; flex: 0 0 38px; flex-direction: column;
        border-left: 1px solid #CBF1F5; background: #E3FDFD;
      }
      .pr-number-stepper {
        display: flex; align-items: center; justify-content: center; flex: 1 1 50%;
        width: 38px; min-height: 0; padding: 0; border: 0;
        color: #329DA3; background: #E3FDFD; font-size: 18px;
        font-weight: 700; line-height: 1; cursor: pointer;
      }
      .pr-number-stepper + .pr-number-stepper { border-top: 1px solid #CBF1F5; }
      .pr-number-stepper:hover { background: #CBF1F5; }
      .pr-mui-field .MuiOutlinedInput-root {
        min-height: 42px; border-radius: 13px; background: #FFFFFF; color: #173B3E;
      }
      .pr-mui-field .MuiOutlinedInput-notchedOutline { border-color: #A6E3E9; }
      .pr-mui-field .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: #71C9CE; }
      .pr-mui-field .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #329DA3; }
      .pr-mui-field .MuiSvgIcon-root { color: #329DA3; }
      .MuiMenu-paper { border: 1px solid #CBF1F5; border-radius: 13px !important; }
      .MuiMenuItem-root { color: #173B3E; }
      .MuiMenuItem-root.Mui-selected, .MuiMenuItem-root:hover { background: #E3FDFD !important; }

      /* Matching approved white-card / cyan-shimmer skeleton design */
      .pr-page-skeleton { display: grid; gap: 22px; animation: pr-skeleton-fade .2s ease-out; }
      .pr-skeleton-header {
        display: flex; align-items: center; justify-content: space-between; gap: 24px;
        min-height: 142px; padding: 26px; border: 1px solid #CBF1F5;
        border-radius: 24px; background: #FFFFFF; box-shadow: 0 8px 28px rgba(23,59,62,.05);
      }
      .pr-skeleton-heading { flex: 1; min-width: 0; }
      .pr-skeleton-grid { display: grid; grid-template-columns: minmax(0,1.55fr) minmax(300px,.85fr); gap: 22px; align-items: start; }
      .pr-skeleton-card {
        display: grid; gap: 14px; min-width: 0; padding: 24px;
        border: 1px solid #CBF1F5; border-radius: 22px; background: #FFFFFF;
        box-shadow: 0 8px 28px rgba(23,59,62,.05);
      }
      .pr-skeleton-fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px 16px; margin-top: 8px; }
      .pr-skeleton-field { display: grid; gap: 5px; min-width: 0; }
      .pr-skeleton-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
      .pr-page-skeleton .MuiSkeleton-root { background-color: #CBF1F5; opacity: 1; }
      .pr-page-skeleton .MuiSkeleton-root::after {
        background: linear-gradient(90deg,transparent,rgba(227,253,253,.96),transparent);
      }
      @keyframes pr-skeleton-fade { from { opacity: .65; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
      /* Keep partner table within its card without a bottom scrollbar */
      .pr-table-wrap { scrollbar-width: none; }
      .pr-table-wrap::-webkit-scrollbar { display: none; }
      @media (max-width: 900px) {
        .pr-skeleton-grid { grid-template-columns: 1fr; }
        .pr-table th, .pr-table td { padding: 9px 7px !important; }
        .pr-table th { font-size: 12px !important; }
        .pr-table td { font-size: 13px !important; }
        .pr-number-group { min-width: 0 !important; }
        .pr-number-input { padding: 0 8px !important; font-size: 12px !important; }
        .pr-number-steppers { flex-basis: 30px !important; width: 30px !important; }
      }
      @media (max-width: 600px) {
        .pr-table-wrap { overflow: visible; border: 0; background: transparent; }
        .pr-table, .pr-table tbody, .pr-table tr, .pr-table td { display: block; width: 100%; }
        .pr-table { table-layout: auto; }
        .pr-table thead { display: none; }
        .pr-table tbody { display: grid; gap: 12px; }
        .pr-table tr {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          padding: 14px; border: 1px solid #CBF1F5; border-radius: 15px;
          background: #FFFFFF; box-shadow: 0 4px 14px rgba(23,59,62,.04);
        }
        .pr-table td { width: 100% !important; padding: 0 !important; border: 0 !important; }
        .pr-table td:first-child { grid-column: 1 / -1; color: #329DA3 !important; font-weight: 700; }
        .pr-table td:nth-child(n+2) { grid-column: 1 / -1; }
        .pr-table td:nth-child(2)::before { content: "Name of Partner"; }
        .pr-table td:nth-child(3)::before { content: "Actual Rate (%)"; }
        .pr-table td:nth-child(4)::before { content: "Amount of Interest"; }
        .pr-table td:nth-child(5)::before { content: "Action"; }
        .pr-table td:nth-child(n+2)::before {
          display: block; margin: 0 0 6px; color: #315F63;
          font-size: 12px; font-weight: 700;
        }
        .pr-table td input, .pr-table td .pr-number-group { width: 100%; }
      }
      @media (max-width: 600px) {
        .pr-modern-page { padding: 18px 12px !important; }
        .pr-skeleton-header { align-items: flex-start; padding: 18px; }
        .pr-skeleton-header > .MuiSkeleton-root { display: none; }
        .pr-skeleton-card { padding: 18px; }
        .pr-skeleton-fields { grid-template-columns: 1fr; gap: 12px; }
        .pr-skeleton-actions { flex-direction: column; }
        .pr-skeleton-actions .MuiSkeleton-root { width: 100% !important; }
      }
    `}</style>

  </div>

);

}
