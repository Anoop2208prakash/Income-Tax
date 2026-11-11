import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { useNavigate } from "react-router-dom";


function AMMNumberField({ value, onChange, placeholder, min = 0, step = 1, ...props }) {
  const numericValue = value === "" ? null : Number(value);
  const update = (next) => onChange(next == null ? "" : String(next));
  return (
    <BaseNumberField.Root
      value={numericValue}
      onValueChange={update}
      min={min}
      step={step}
      className="amm-number-root"
      {...props}
    >
      <BaseNumberField.Input
        className="amm-number-input"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <div className="amm-number-steppers">
        <BaseNumberField.Increment className="amm-number-stepper" aria-label="Increase">+</BaseNumberField.Increment>
        <BaseNumberField.Decrement className="amm-number-stepper" aria-label="Decrease">−</BaseNumberField.Decrement>
      </div>
    </BaseNumberField.Root>
  );
}

export default function AMT_MAT_Calculator() {

  const navigate = useNavigate();

  const [mode, setMode] = useState("");



  const initialAMT = {

    taxpayer: "",

    assessmentYear: "",

    isIFSC: "",

    totalIncome: "",

    normalTax: "",

    deduction80: "",

    deduction10AA: "",

    deduction35AD: "",

  };



  const initialMAT = {

    companyType: "",

    assessmentYear: "",

    isIFSC: "",

    netProfit: "",

    normalTax: "",

    posAdj: "",

    negAdj: "",

    posOCI: "",

    negOCI: "",

  };



  const [amt, setAmt] = useState(initialAMT);

  const [mat, setMat] = useState(initialMAT);
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const handleCalculate = () => {
    if (isLoading || isCalculating) return;
    setIsCalculating(true);
    window.setTimeout(() => setIsCalculating(false), 650);
  };



  const updateAMT = (k, v) => setAmt((p) => ({ ...p, [k]: v }));

  const updateMAT = (k, v) => setMat((p) => ({ ...p, [k]: v }));



  // 🔥 ROUNDING (VERY IMPORTANT)*

  const round = (n) => Math.round(n);



  // ================= AMT SURCHARGE + MARGINAL RELIEF =================*

  const calcAMTSurcharge = (ATI, tax, taxpayer, isIFSC) => {

  let rate = 0, prevRate = 0, threshold = 0;



// ---------------- INDIVIDUAL TYPE ----------------*

  if (["Individual","HUF","AOP/BOI","AJP"].includes(taxpayer)) {

    if (ATI > 50000000) { rate = 37; prevRate = 25; threshold = 50000000; }

    else if (ATI > 20000000) { rate = 25; prevRate = 15; threshold = 20000000; }

    else if (ATI > 10000000) { rate = 15; prevRate = 10; threshold = 10000000; }

    else if (ATI > 5000000) { rate = 10; prevRate = 0; threshold = 5000000; }

  }



  // ---------------- CO-OPERATIVE SOCIETY ----------------*

  else if (taxpayer === "Co-operative Society") {

    if (ATI > 10000000) {

      rate = 12;

      prevRate = 0;

      threshold = 10000000;

    }

  }



  // ---------------- FIRM / LLP / OTHERS ----------------*

  else {

    if (ATI > 10000000) {

      rate = 12;

      prevRate = 0;

      threshold = 10000000;

    }

  }



  let surcharge = Math.round((tax * rate) / 100);



  // ✅ Marginal Relief (correct threshold-based)*

  if (threshold > 0 && ATI > threshold) {

    const baseRate = isIFSC === "yes" ? 9 : 18.5;



    const baseTaxAtThreshold = Math.round(

      (threshold * baseRate) / 100

    );



    const lowerTax = Math.round(

      baseTaxAtThreshold +

      (baseTaxAtThreshold * prevRate) / 100

    );



    const incomeDiff = ATI - threshold;



    const maxAllowed = lowerTax + incomeDiff;



    const currentTotal = tax + surcharge;



    if (currentTotal > maxAllowed) {

      surcharge = Math.round(maxAllowed - tax);

    }

  }



  // ✅ Safety (edge case)*

  if (surcharge < 0) surcharge = 0;



  return { rate, surcharge };

};

  // ================= MAT SURCHARGE + MARGINAL RELIEF =================*

  const calcMATSurcharge = (profit, tax, type, isIFSC) => {

  let rate = 0, prevRate = 0, threshold = 0;



  if (type === "Domestic") {

    if (profit > 100000000) { rate = 12; prevRate = 7; threshold = 100000000; }

    else if (profit > 10000000) { rate = 7; prevRate = 0; threshold = 10000000; }

  } else {

    if (profit > 100000000) { rate = 5; prevRate = 2; threshold = 100000000; }

    else if (profit > 10000000) { rate = 2; prevRate = 0; threshold = 10000000; }

  }



  let surcharge = round((tax * rate) / 100);



  // ✅ Marginal Relief (ONLY when threshold crossed)*

  if (threshold > 0 && profit > threshold) {

    const baseRate = isIFSC === "yes" ? 9 : 15;



    const baseTaxAtThreshold = round((threshold * baseRate) / 100);



    const lowerTax = round(

      baseTaxAtThreshold + (baseTaxAtThreshold * prevRate) / 100

    );



    const incomeDiff = profit - threshold;



    const maxAllowed = lowerTax + incomeDiff;



    const currentTotal = tax + surcharge;



    if (currentTotal > maxAllowed) {

      surcharge = round(maxAllowed - tax);

    }

  }



  return { rate, surcharge };

};

  // ================= AMT =================*

  const amtCalc = useMemo(() => {

    const ti = +amt.totalIncome || 0;

    const nt = +amt.normalTax || 0;



    const ATI =

      ti +

      (+amt.deduction80 || 0) +

      (+amt.deduction10AA || 0) +

      (+amt.deduction35AD || 0);



    if (ATI <= 2000000) return { message: "AMT not applicable" };



    const rate = amt.isIFSC === "yes" ? 9 : 18.5;



    const tax = round((ATI * rate) / 100);



    const { rate: surchargeRate, surcharge } =

  calcAMTSurcharge(ATI, tax, amt.taxpayer, amt.isIFSC);



    const cess = round((tax + surcharge) * 0.04);



    const total = round(tax + surcharge + cess);



    return {

      ATI,

      rate,

      tax,

      surchargeRate,

      surcharge,

      cess,

      total,

      payable: Math.max(total, nt),

      credit: total > nt ? total - nt : 0,

    };

  }, [amt]);



  // ================= MAT =================*

  const matCalc = useMemo(() => {

    const profit =

      (+mat.netProfit || 0) +

      (+mat.posAdj || 0) -

      (+mat.negAdj || 0) +

      (+mat.posOCI || 0) -

      (+mat.negOCI || 0);



    const nt = +mat.normalTax || 0;



    const rate = mat.isIFSC === "yes" ? 9 : 15;



    const tax = round((profit * rate) / 100);



    const { rate: surchargeRate, surcharge } =

  calcMATSurcharge(profit, tax, mat.companyType, mat.isIFSC);



    const cess = round((tax + surcharge) * 0.04);



    const total = round(tax + surcharge + cess);



    return {

      profit,

      rate,

      tax,

      surchargeRate,

      surcharge,

      cess,

      total,

      payable: Math.max(total, nt),

      credit: total > nt ? total - nt : 0,

    };

  }, [mat]);



  const resetAll = () => {

    setMode("");

    setAmt(initialAMT);

    setMat(initialMAT);

  };



  const years = [

    "2017-18","2018-19","2019-20","2020-21","2021-22",

    "2022-23","2023-24","2024-25","2025-26","2026-27"

  ];





 return (

  <div className="amm-modern-page">

    <div className="amm-modern-container">

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
        <div className="amm-page-skeleton" role="status" aria-label="Loading AMT and MAT calculator">
          <div className="amm-skeleton-header">
            <div>
              <Skeleton variant="text" width={170} height={22} />
              <Skeleton variant="text" width="min(420px, 85%)" height={42} />
              <Skeleton variant="text" width="min(540px, 95%)" height={22} />
            </div>
            <Skeleton variant="rounded" width={160} height={68} />
          </div>
          <div className="amm-skeleton-grid">
            <div className="amm-skeleton-card">
              <Skeleton variant="text" width={220} height={30} />
              <Skeleton variant="rounded" width="100%" height={48} />
              <div className="amm-skeleton-fields">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="amm-skeleton-field" key={i}>
                    <Skeleton variant="text" width="48%" height={20} />
                    <Skeleton variant="rounded" width="100%" height={46} />
                  </div>
                ))}
              </div>
              <div className="amm-skeleton-actions">
                <Skeleton variant="rounded" width={110} height={44} />
                <Skeleton variant="rounded" width={150} height={44} />
              </div>
            </div>
            <div className="amm-skeleton-card">
              <Skeleton variant="text" width="60%" height={26} />
              <Skeleton variant="rounded" width="100%" height={130} />
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rounded" width="100%" height={42} />)}
            </div>
          </div>
        </div>
      ) : (
      <>
      <div className="amm-modern-header">

        <div>

          <p className="amm-modern-kicker">Company & Non-Company Tax Utility</p>

          <h1>AMT / MAT Calculator</h1>

          <p>

            Calculate Alternate Minimum Tax under section 115JC and Minimum Alternate Tax under section 115JB.

          </p>

        </div>



        <div className="amm-modern-badge">

          <span>Selected Mode</span>

          <strong>{mode || "Not Selected"}</strong>

        </div>

      </div>



      <div className="amm-modern-grid">



        {/* LEFT FORM */}

        <div className="amm-modern-card">



          {/* MODE SELECT */}

          <div className="amm-section-title">

            <h2>Select Calculator Type</h2>

            <p>Choose AMT for non-company taxpayers or MAT for companies</p>

          </div>



          <div className="amm-mode-grid">

            <button

              type="button"

              onClick={() => setMode("AMT")}

              className={mode === "AMT" ? "amm-mode-btn active" : "amm-mode-btn"}

            >

              AMT

              <span>Section 115JC</span>

            </button>



            <button

              type="button"

              onClick={() => setMode("MAT")}

              className={mode === "MAT" ? "amm-mode-btn active" : "amm-mode-btn"}

            >

              MAT

              <span>Section 115JB</span>

            </button>

          </div>



          {/* AMT FORM */}

          {mode === "AMT" && (

            <>

              <div className="amm-section-title small">

                <h2>AMT Basic Details</h2>

                <p>Enter taxpayer, assessment year and IFSC details</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Taxpayer <span>*</span></label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={amt.taxpayer}

                    onChange={(e) => updateAMT("taxpayer", e.target.value)}

                  >

                    <MenuItem value="">Select Taxpayer</MenuItem>

                    <MenuItem>Individual</MenuItem>

                    <MenuItem>HUF</MenuItem>

                    <MenuItem>AOP/BOI</MenuItem>

                    <MenuItem>AJP</MenuItem>

                    <MenuItem>LLP</MenuItem>

                    <MenuItem>Firm</MenuItem>

                    <MenuItem>Co-operative Society</MenuItem>

                    <MenuItem>Local Authority</MenuItem>

                  </TextField>

                </div>



                <div className="amm-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={amt.assessmentYear}

                    onChange={(e) => updateAMT("assessmentYear", e.target.value)}

                  >

                    <MenuItem value="">Select Assessment Year</MenuItem>

                    {years.map((y) => (

                      <MenuItem key={y} value={y}>{y}</MenuItem>

                    ))}

                  </TextField>

                </div>



                <div className="amm-field">

                  <label>IFSC Unit?</label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={amt.isIFSC}

                    onChange={(e) => updateAMT("isIFSC", e.target.value)}

                  >

                    <MenuItem value="">Select Option</MenuItem>

                    <MenuItem value="yes">Yes</MenuItem>

                    <MenuItem value="no">No</MenuItem>

                  </TextField>

                </div>

              </div>



              <div className="amm-section-title small">

                <h2>Income Details</h2>

                <p>Enter total income and normal tax liability</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Total Income</label>

                  <AMMNumberField value={amt.totalIncome} onChange={(v) => updateAMT("totalIncome", v)} placeholder="Enter total income" />

                </div>



                <div className="amm-field">

                  <label>Normal Tax Liability</label>

                  <AMMNumberField value={amt.normalTax} onChange={(v) => updateAMT("normalTax", v)} placeholder="Enter normal tax liability" />

                </div>

              </div>



              <div className="amm-section-title small">

                <h2>Deductions / Adjustments</h2>

                <p>Enter deductions to compute adjusted total income</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Part C Deduction</label>

                  <AMMNumberField value={amt.deduction80} onChange={(v) => updateAMT("deduction80", v)} placeholder="80C–80RRB except 80P" />

                </div>



                <div className="amm-field">

                  <label>Section 10AA</label>

                  <AMMNumberField value={amt.deduction10AA} onChange={(v) => updateAMT("deduction10AA", v)} placeholder="Enter deduction" />

                </div>



                <div className="amm-field">

                  <label>Section 35AD</label>

                  <AMMNumberField value={amt.deduction35AD} onChange={(v) => updateAMT("deduction35AD", v)} placeholder="Enter deduction" />

                </div>

              </div>

            </>

          )}



          {/* MAT FORM */}

          {mode === "MAT" && (

            <>

              <div className="amm-section-title small">

                <h2>MAT Basic Details</h2>

                <p>Enter company type, assessment year and IFSC details</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Company Type <span>*</span></label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={mat.companyType}

                    onChange={(e) => updateMAT("companyType", e.target.value)}

                  >

                    <MenuItem value="">Select Company Type</MenuItem>

                    <MenuItem>Domestic</MenuItem>

                    <MenuItem>Foreign</MenuItem>

                  </TextField>

                </div>



                <div className="amm-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={mat.assessmentYear}

                    onChange={(e) => updateMAT("assessmentYear", e.target.value)}

                  >

                    <MenuItem value="">Select Assessment Year</MenuItem>

                    {years.map((y) => (

                      <MenuItem key={y} value={y}>{y}</MenuItem>

                    ))}

                  </TextField>

                </div>



                <div className="amm-field">

                  <label>IFSC Unit?</label>

                  <TextField select fullWidth size="small" className="amm-mui-field"

                    value={mat.isIFSC}

                    onChange={(e) => updateMAT("isIFSC", e.target.value)}

                  >

                    <MenuItem value="">Select Option</MenuItem>

                    <MenuItem value="yes">Yes</MenuItem>

                    <MenuItem value="no">No</MenuItem>

                  </TextField>

                </div>

              </div>



              <div className="amm-section-title small">

                <h2>Income Details</h2>

                <p>Enter book profit and normal tax liability</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Net Profit</label>

                  <AMMNumberField value={mat.netProfit} onChange={(v) => updateMAT("netProfit", v)} placeholder="Enter net profit" />

                </div>



                <div className="amm-field">

                  <label>Normal Tax Liability</label>

                  <AMMNumberField value={mat.normalTax} onChange={(v) => updateMAT("normalTax", v)} placeholder="Enter normal tax liability" />

                </div>

              </div>



              <div className="amm-section-title small">

                <h2>Book Profit Adjustments</h2>

                <p>Enter positive / negative adjustments and OCI details</p>

              </div>



              <div className="amm-form-grid">

                <div className="amm-field">

                  <label>Positive Adjustment</label>

                  <AMMNumberField value={mat.posAdj} onChange={(v) => updateMAT("posAdj", v)} placeholder="Enter amount" />

                </div>



                <div className="amm-field">

                  <label>Negative Adjustment</label>

                  <AMMNumberField value={mat.negAdj} onChange={(v) => updateMAT("negAdj", v)} placeholder="Enter amount" />

                </div>



                <div className="amm-field">

                  <label>OCI Positive</label>

                  <AMMNumberField value={mat.posOCI} onChange={(v) => updateMAT("posOCI", v)} placeholder="Enter amount" />

                </div>



                <div className="amm-field">

                  <label>OCI Negative</label>

                  <AMMNumberField value={mat.negOCI} onChange={(v) => updateMAT("negOCI", v)} placeholder="Enter amount" />

                </div>

              </div>

            </>

          )}



          {!mode && (

            <div className="amm-empty-box">

              <strong>Select AMT or MAT</strong>

              <p>

                Choose a calculator type above to start entering details.

              </p>

            </div>

          )}



          <div className="amm-info-box">

            <strong>Information</strong>

            <p>

              This calculator shows tax, surcharge, cess, payable amount and available AMT/MAT credit based on selected mode.

            </p>

          </div>



          <div className="amm-modern-actions">
            <Button type="button" variant="outlined" onClick={resetAll} className="amm-reset-mui">Reset</Button>
            <Button
              type="button"
              variant="contained"
              onClick={handleCalculate}
              disabled={isCalculating || isLoading || !mode}
              className="amm-calculate-mui"
              startIcon={isCalculating ? <CircularProgress size={17} color="inherit" /> : null}
            >
              {isCalculating ? "Calculating..." : "Calculate"}
            </Button>
          </div>

        </div>



        {/* RIGHT RESULT PANEL */}

        <div className="amm-result-panel">

          <div className="amm-result-head">

            <p>Computation Summary</p>



            {mode === "AMT" ? (

              <>

                <h2>

                  {amtCalc.message

                    ? "Not Applicable"

                    : `₹ ${(amtCalc.payable || 0).toLocaleString("en-IN")}`}

                </h2>

                <span>AMT Tax Payable</span>

              </>

            ) : mode === "MAT" ? (

              <>

                <h2>₹ {(matCalc.payable || 0).toLocaleString("en-IN")}</h2>

                <span>MAT Tax Payable</span>

              </>

            ) : (

              <>

                <h2>₹ 0</h2>

                <span>Select AMT or MAT</span>

              </>

            )}

          </div>



          <div className="amm-result-list">

            {mode === "AMT" && (

              <>

                {amtCalc.message ? (

                  <div className="amm-message-box">

                    {amtCalc.message}

                  </div>

                ) : (

                  <>

                    <div className="amm-result-item">

                      <span>Adjusted Total Income</span>

                      <strong>₹ {(amtCalc.ATI || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>AMT Rate</span>

                      <strong>{amtCalc.rate || 0}%</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>Tax</span>

                      <strong>₹ {(amtCalc.tax || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>Surcharge ({amtCalc.surchargeRate || 0}%)</span>

                      <strong>₹ {(amtCalc.surcharge || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>Cess 4%</span>

                      <strong>₹ {(amtCalc.cess || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>Total AMT</span>

                      <strong>₹ {(amtCalc.total || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item">

                      <span>AMT Credit</span>

                      <strong>₹ {(amtCalc.credit || 0).toLocaleString("en-IN")}</strong>

                    </div>



                    <div className="amm-result-item final">

                      <span>Tax Payable</span>

                      <strong>₹ {(amtCalc.payable || 0).toLocaleString("en-IN")}</strong>

                    </div>

                  </>

                )}

              </>

            )}



            {mode === "MAT" && (

              <>

                <div className="amm-result-item">

                  <span>Book Profit</span>

                  <strong>₹ {(matCalc.profit || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item">

                  <span>MAT Rate</span>

                  <strong>{matCalc.rate || 0}%</strong>

                </div>



                <div className="amm-result-item">

                  <span>Tax</span>

                  <strong>₹ {(matCalc.tax || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item">

                  <span>Surcharge ({matCalc.surchargeRate || 0}%)</span>

                  <strong>₹ {(matCalc.surcharge || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item">

                  <span>Cess 4%</span>

                  <strong>₹ {(matCalc.cess || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item">

                  <span>Total MAT</span>

                  <strong>₹ {(matCalc.total || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item">

                  <span>MAT Credit</span>

                  <strong>₹ {(matCalc.credit || 0).toLocaleString("en-IN")}</strong>

                </div>



                <div className="amm-result-item final">

                  <span>Tax Payable</span>

                  <strong>₹ {(matCalc.payable || 0).toLocaleString("en-IN")}</strong>

                </div>

              </>

            )}



            {!mode && (

              <div className="amm-message-box">

                Select AMT or MAT to view result summary.

              </div>

            )}

          </div>

        </div>

      </div>

      </>
      )}
    </div>
    <style>{`

      /* Income Tax Portal palette */
      .amm-modern-page { min-height: 100vh; background: #E3FDFD !important; color: #173B3E !important; }
      .amm-modern-container { color: #173B3E; }
      .amm-modern-header, .amm-modern-card, .amm-result-panel, .amm-skeleton-header, .amm-skeleton-card {
        background: #FFFFFF !important; border: 1px solid #CBF1F5 !important;
        box-shadow: 0 8px 28px rgba(23,59,62,.05) !important;
      }
      .amm-modern-header h1, .amm-modern-card h2, .amm-section-title h2 { color: #173B3E !important; }
      .amm-modern-kicker, .amm-section-title p { color: #52777A !important; }
      .amm-modern-badge, .amm-mode-btn.active, .amm-result-head {
        background: #71C9CE !important; color: #FFFFFF !important; border-color: #71C9CE !important;
      }
      .amm-mode-btn { border: 1px solid #A6E3E9 !important; background: #F4FEFE !important; color: #315F63 !important; }
      .amm-mode-btn:hover { background: #E3FDFD !important; border-color: #71C9CE !important; }
      .amm-field label { color: #315F63 !important; }
      .amm-mui-field .MuiOutlinedInput-root { min-height: 46px; border-radius: 13px; background: #FFFFFF; color: #173B3E; }
      .amm-mui-field .MuiOutlinedInput-notchedOutline { border-color: #A6E3E9; }
      .amm-mui-field .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline { border-color: #71C9CE; }
      .amm-mui-field .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline { border-color: #329DA3; }
      .amm-mui-field .MuiSelect-select, .amm-mui-field input { color: #173B3E; }
      .amm-mui-field .MuiSvgIcon-root { color: #329DA3; }
      .MuiMenu-paper { border: 1px solid #CBF1F5; border-radius: 13px !important; }
      .MuiMenuItem-root.Mui-selected, .MuiMenuItem-root:hover { background: #E3FDFD !important; }
      .amm-number-root {
        display:flex; align-items:stretch; width:100%; min-height:46px; overflow:hidden;
        border:1px solid #71C9CE; border-radius:13px; background:#FFFFFF;
      }
      .amm-number-root:focus-within { border-color:#329DA3; box-shadow:0 0 0 3px rgba(113,201,206,.16); }
      .amm-number-input {
        flex:1 1 auto; width:100%; min-width:0; border:0; outline:0; padding:0 13px;
        background:transparent; color:#173B3E; font:inherit;
      }
      .amm-number-input::placeholder { color:#78999B; opacity:1; }
      .amm-number-steppers { display:flex; flex-direction:column; flex:0 0 40px; }
      .amm-number-stepper {
        flex:1; display:flex; align-items:center; justify-content:center; border:0;
        border-left:1px solid #CBF1F5; background:#E3FDFD; color:#329DA3;
        font-size:17px; font-weight:700; cursor:pointer;
      }
      .amm-number-stepper + .amm-number-stepper { border-top:1px solid #CBF1F5; }
      .amm-number-stepper:hover { background:#CBF1F5; }
      .amm-modern-actions { display:flex; justify-content:flex-end; gap:12px; flex-wrap:wrap; }
      .amm-calculate-mui { background:#71C9CE !important; color:#173B3E !important; font-weight:700 !important; border-radius:12px !important; }
      .amm-calculate-mui:hover { background:#A6E3E9 !important; }
      .amm-reset-mui { color:#329DA3 !important; border-color:#71C9CE !important; border-radius:12px !important; }
      .amm-page-skeleton { display:grid; gap:22px; }
      .amm-skeleton-header {
        display:flex; justify-content:space-between; align-items:center; gap:22px;
        padding:26px; min-height:140px; border-radius:24px;
      }
      .amm-skeleton-grid { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(280px,.85fr); gap:22px; }
      .amm-skeleton-card { display:grid; gap:14px; min-width:0; padding:24px; border-radius:22px; }
      .amm-skeleton-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
      .amm-skeleton-field { display:grid; gap:5px; }
      .amm-skeleton-actions { display:flex; justify-content:flex-end; gap:12px; }
      .amm-page-skeleton .MuiSkeleton-root { background-color:#CBF1F5; opacity:1; }
      .amm-page-skeleton .MuiSkeleton-root::after {
        background:linear-gradient(90deg,transparent,rgba(227,253,253,.96),transparent);
      }
      .amm-result-head { background:#71C9CE !important; color:#FFFFFF !important; }
      .amm-result-list, .amm-info-box, .amm-empty-box {
        background:#FFFFFF !important; color:#315F63 !important; border-color:#CBF1F5 !important;
      }
      .amm-result-list strong, .amm-result-list span { color:#315F63 !important; }
      @media(max-width:900px) { .amm-skeleton-grid { grid-template-columns:1fr; } }
      @media(max-width:600px) {
        .amm-skeleton-header { padding:18px; }
        .amm-skeleton-header > .MuiSkeleton-root { display:none; }
        .amm-skeleton-card { padding:18px; }
        .amm-skeleton-fields { grid-template-columns:1fr; }
        .amm-modern-actions > button { flex:1; }
      }


      .amm-modern-page {

        min-height: 100vh;

        background:

          radial-gradient(circle at top left, rgba(37, 99, 235, 0.25), transparent 32%),

          linear-gradient(135deg, #07111f 0%, #0f172a 45%, #111827 100%);

        color: #e5e7eb;

        padding: 34px;

        font-family: Inter, Arial, sans-serif;

      }



      .amm-modern-container {

        max-width: 1300px;

        margin: 0 auto;

      }



      .amm-modern-header {

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



      .amm-modern-kicker {

        color: #60a5fa;

        text-transform: uppercase;

        letter-spacing: 2px;

        font-size: 12px;

        font-weight: 800;

        margin: 0 0 8px;

      }



      .amm-modern-header h1 {

        font-size: 36px;

        line-height: 1.1;

        margin: 0;

        color: #ffffff;

      }



      .amm-modern-header p {

        margin: 10px 0 0;

        color: #94a3b8;

        font-size: 15px;

      }



      .amm-modern-badge {

        min-width: 190px;

        padding: 18px;

        border-radius: 20px;

        background: linear-gradient(135deg, rgba(37,99,235,0.18), rgba(14,165,233,0.12));

        border: 1px solid rgba(96, 165, 250, 0.28);

        text-align: center;

      }



      .amm-modern-badge span {

        display: block;

        color: #93c5fd;

        font-size: 12px;

        font-weight: 700;

        margin-bottom: 5px;

      }



      .amm-modern-badge strong {

        color: #ffffff;

        font-size: 20px;

      }



      .amm-modern-grid {

        display: grid;

        grid-template-columns: minmax(0, 1fr) 380px;

        gap: 26px;

        align-items: start;

      }



      .amm-modern-card,

      .amm-result-panel {

        background: rgba(15, 23, 42, 0.9);

        border: 1px solid rgba(148, 163, 184, 0.18);

        border-radius: 24px;

        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);

      }



      .amm-modern-card {

        padding: 26px;

      }



      .amm-section-title {

        margin-bottom: 24px;

        padding-bottom: 18px;

        border-bottom: 1px solid rgba(148, 163, 184, 0.15);

      }



      .amm-section-title.small {

        margin-top: 28px;

      }



      .amm-section-title h2 {

        margin: 0;

        color: #ffffff;

        font-size: 22px;

      }



      .amm-section-title p {

        margin: 7px 0 0;

        color: #94a3b8;

        font-size: 14px;

      }



      .amm-mode-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 16px;

      }



      .amm-mode-btn {

        min-height: 82px;

        border-radius: 18px;

        border: 1px solid rgba(148, 163, 184, 0.22);

        background: rgba(2, 6, 23, 0.48);

        color: #ffffff;

        font-size: 20px;

        font-weight: 900;

        cursor: pointer;

        transition: all 0.2s ease;

      }



      .amm-mode-btn span {

        display: block;

        margin-top: 6px;

        color: #94a3b8;

        font-size: 12px;

        font-weight: 700;

      }



      .amm-mode-btn:hover {

        border-color: #60a5fa;

      }



      .amm-mode-btn.active {

        background: linear-gradient(135deg, #2563eb, #0ea5e9);

        border-color: rgba(96, 165, 250, 0.55);

        box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);

      }



      .amm-mode-btn.active span {

        color: #dbeafe;

      }



      .amm-form-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 18px;

      }



      .amm-field {

        display: flex;

        flex-direction: column;

        gap: 8px;

      }



      .amm-field label {

        color: #cbd5e1;

        font-size: 13px;

        font-weight: 700;

      }



      .amm-field label span {

        color: #f87171;

      }



      .amm-field input,

      .amm-field select {

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



      .amm-field input::placeholder {

        color: #64748b;

      }



      .amm-field input:focus,

      .amm-field select:focus {

        border-color: #60a5fa;

        box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.14);

        background: rgba(15, 23, 42, 0.95);

      }



      .amm-field option {

        background: #0f172a;

        color: #ffffff;

      }



      .amm-empty-box,

      .amm-info-box {

        margin-top: 24px;

        padding: 16px;

        border-radius: 18px;

        background: rgba(37, 99, 235, 0.08);

        border: 1px solid rgba(96, 165, 250, 0.18);

      }



      .amm-empty-box strong,

      .amm-info-box strong {

        color: #bfdbfe;

        font-size: 14px;

      }



      .amm-empty-box p,

      .amm-info-box p {

        margin: 7px 0 0;

        color: #94a3b8;

        font-size: 13px;

        line-height: 1.6;

      }



      .amm-modern-actions {

        display: flex;

        justify-content: flex-end;

        margin-top: 26px;

      }



      .amm-btn-secondary {

        height: 44px;

        padding: 0 24px;

        border-radius: 14px;

        font-weight: 800;

        cursor: pointer;

        transition: all 0.2s ease;

        background: rgba(148, 163, 184, 0.12);

        color: #cbd5e1;

        border: 1px solid rgba(148, 163, 184, 0.22);

      }



      .amm-btn-secondary:hover {

        background: rgba(248, 113, 113, 0.16);

        color: #fecaca;

        border-color: rgba(248, 113, 113, 0.32);

      }



      .amm-result-panel {

        overflow: hidden;

        position: sticky;

        top: 22px;

      }



      .amm-result-head {

        padding: 26px;

        background: linear-gradient(135deg, rgba(37, 99, 235, 0.32), rgba(14, 165, 233, 0.16));

        border-bottom: 1px solid rgba(148, 163, 184, 0.14);

      }



      .amm-result-head p {

        margin: 0;

        color: #bfdbfe;

        font-size: 13px;

        font-weight: 800;

        text-transform: uppercase;

        letter-spacing: 1.5px;

      }



      .amm-result-head h2 {

        margin: 14px 0 4px;

        color: #ffffff;

        font-size: 32px;

        line-height: 1.2;

        word-break: break-word;

      }



      .amm-result-head span {

        color: #93c5fd;

        font-size: 13px;

        font-weight: 700;

      }



      .amm-result-list {

        padding: 18px;

      }



      .amm-result-item {

        display: flex;

        justify-content: space-between;

        align-items: flex-start;

        gap: 14px;

        padding: 15px 0;

        border-bottom: 1px solid rgba(148, 163, 184, 0.12);

      }



      .amm-result-item:last-child {

        border-bottom: none;

      }



      .amm-result-item span {

        color: #94a3b8;

        font-size: 14px;

        line-height: 1.4;

      }



      .amm-result-item strong {

        color: #ffffff;

        font-size: 15px;

        text-align: right;

        white-space: nowrap;

      }



      .amm-result-item.final {

        margin-top: 10px;

        padding: 16px;

        border-radius: 16px;

        border: 1px solid rgba(34, 197, 94, 0.24);

        background: rgba(34, 197, 94, 0.08);

      }



      .amm-result-item.final span {

        color: #bbf7d0;

        font-weight: 800;

      }



      .amm-result-item.final strong {

        color: #86efac;

        font-size: 20px;

      }



      .amm-message-box {

        padding: 16px;

        border-radius: 16px;

        background: rgba(245, 158, 11, 0.12);

        border: 1px solid rgba(245, 158, 11, 0.3);

        color: #fde68a;

        font-size: 14px;

        font-weight: 800;

      }



      @media (max-width: 1100px) {

        .amm-modern-page {

          padding: 20px;

        }



        .amm-modern-header {

          flex-direction: column;

          align-items: flex-start;

        }



        .amm-modern-grid {

          grid-template-columns: 1fr;

        }



        .amm-result-panel {

          position: static;

        }

      }



      @media (max-width: 680px) {

        .amm-form-grid,

        .amm-mode-grid {

          grid-template-columns: 1fr;

        }



        .amm-modern-actions {

          flex-direction: column;

        }



        .amm-btn-secondary {

          width: 100%;

        }



        .amm-result-item {

          flex-direction: column;

        }



        .amm-result-item strong {

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


      /* FINAL THEME OVERRIDES — enforce the portal's light teal palette */
      .amm-modern-page,
      .amm-modern-page * {
        --amm-ink: #173B3E;
        --amm-muted: #52777A;
        --amm-border: #A6E3E9;
        --amm-accent: #71C9CE;
      }
      .amm-modern-page {
        background: #E3FDFD !important;
        color: #173B3E !important;
      }
      .amm-modern-header,
      .amm-modern-card,
      .amm-result-panel {
        background: #FFFFFF !important;
        border: 1px solid #CBF1F5 !important;
        box-shadow: 0 8px 28px rgba(23,59,62,.06) !important;
      }
      .amm-modern-header h1,
      .amm-section-title h2 { color: #173B3E !important; }
      .amm-modern-header p,
      .amm-modern-kicker,
      .amm-section-title p { color: #52777A !important; }
      .amm-modern-badge {
        background: #E3FDFD !important;
        border: 1px solid #A6E3E9 !important;
      }
      .amm-modern-badge span,
      .amm-modern-badge strong { color: #237F85 !important; }

      /* Number fields: white surface, teal outline, no gray/navy fill */
      .amm-number-root,
      .amm-modern-page .amm-field .amm-number-root {
        background: #FFFFFF !important;
        border: 1px solid #71C9CE !important;
        border-radius: 15px !important;
        box-shadow: none !important;
      }
      .amm-number-root:focus-within {
        background: #FFFFFF !important;
        border-color: #329DA3 !important;
        box-shadow: 0 0 0 3px rgba(113,201,206,.17) !important;
      }
      .amm-number-root input,
      .amm-number-input,
      .amm-modern-page .amm-field input.amm-number-input {
        background: #FFFFFF !important;
        color: #173B3E !important;
        -webkit-text-fill-color: #173B3E !important;
        opacity: 1 !important;
        border: 0 !important;
        box-shadow: none !important;
      }
      .amm-number-root input:focus,
      .amm-number-input:focus {
        background: #FFFFFF !important;
        color: #173B3E !important;
        -webkit-text-fill-color: #173B3E !important;
        outline: 0 !important;
      }
      .amm-number-root input::placeholder,
      .amm-number-input::placeholder {
        color: #78999B !important;
        -webkit-text-fill-color: #78999B !important;
        opacity: 1 !important;
      }
      .amm-number-steppers { background: #E3FDFD !important; }
      .amm-number-stepper {
        background: #E3FDFD !important;
        color: #329DA3 !important;
        border-color: #CBF1F5 !important;
      }
      .amm-number-stepper:hover { background: #CBF1F5 !important; }

      /* MUI dropdowns and text fields */
      .amm-modern-page .amm-mui-field .MuiOutlinedInput-root {
        background: #FFFFFF !important;
        color: #173B3E !important;
      }
      .amm-modern-page .amm-mui-field .MuiSelect-select,
      .amm-modern-page .amm-mui-field input {
        color: #173B3E !important;
        -webkit-text-fill-color: #173B3E !important;
      }
      .amm-modern-page .amm-mui-field .MuiOutlinedInput-notchedOutline {
        border-color: #A6E3E9 !important;
      }
      .amm-modern-page .amm-mui-field .Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #329DA3 !important;
      }

      /* Teal result summary; remove yellow/gold warning styling */
      .amm-result-head {
        background: #71C9CE !important;
        border-color: #71C9CE !important;
      }
      .amm-result-head p,
      .amm-result-head h2,
      .amm-result-head span { color: #FFFFFF !important; }
      .amm-result-item { border-color: #CBF1F5 !important; }
      .amm-result-item span { color: #52777A !important; }
      .amm-result-item strong { color: #173B3E !important; }
      .amm-result-item.final {
        background: #E3FDFD !important;
        border: 1px solid #A6E3E9 !important;
      }
      .amm-result-item.final span,
      .amm-result-item.final strong { color: #237F85 !important; }
      .amm-message-box {
        background: #E3FDFD !important;
        border: 1px solid #A6E3E9 !important;
        color: #237F85 !important;
      }
      .amm-empty-box,
      .amm-info-box {
        background: #F4FEFE !important;
        border: 1px solid #CBF1F5 !important;
      }
      .amm-empty-box strong,
      .amm-info-box strong { color: #237F85 !important; }
      .amm-empty-box p,
      .amm-info-box p { color: #52777A !important; }

      /* Back button follows the same light theme */
      .business-code-back-btn {
        background: #FFFFFF !important;
        color: #164E52 !important;
        border: 1px solid #A6E3E9 !important;
        box-shadow: 0 3px 10px rgba(23,59,62,.04) !important;
      }
      .business-code-back-btn:hover {
        background: #E3FDFD !important;
        color: #164E52 !important;
        border-color: #71C9CE !important;
      }
      .business-code-back-btn span { color: #329DA3 !important; }

      .amm-calculate-mui {
        background: #71C9CE !important;
        color: #173B3E !important;
      }
      .amm-calculate-mui:hover { background: #A6E3E9 !important; }
      .amm-reset-mui {
        background: #FFFFFF !important;
        color: #237F85 !important;
        border-color: #71C9CE !important;
      }
    `}</style>

  </div>

);

}