import React, { useState, useMemo, useEffect } from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Button, CircularProgress, MenuItem, Skeleton, TextField } from "@mui/material";

import InfoCard from "../components/InfoCard";

import { useNavigate } from "react-router-dom";


function CapitalGainNumberField({ value, onChange, placeholder = "Enter amount" }) {
  const parsed = value === "" || value == null ? null : Number(value);
  return (
    <BaseNumberField.Root className="cg-number-root" value={Number.isFinite(parsed) ? parsed : null}
      onValueChange={(next) => onChange(next == null ? "" : String(next))} min={0}>
      <div className="cg-number-control">
        <BaseNumberField.Input className="cg-number-input" placeholder={placeholder} />
        <div className="cg-number-steppers">
          <BaseNumberField.Increment className="cg-number-step">+</BaseNumberField.Increment>
          <BaseNumberField.Decrement className="cg-number-step">−</BaseNumberField.Decrement>
        </div>
      </div>
    </BaseNumberField.Root>
  );
}

export default function Section54Calculator() {

  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);
  const handleCalculate = () => {
    setIsCalculating(true);
    window.setTimeout(() => setIsCalculating(false), 500);
  };

  const initial54 = {

  assessmentYear: "",

  capitalGain: "",

  investment: "",

  cgasDeposit: "",

};



const initial54B = {

  assessmentYear: "",

  capitalGain: "",

  investment: "",

  cgasDeposit: "",

};



const initial54D = { 

  assessmentYear: "",

  capitalGainType: "",

  capitalGain: "",

  investment: "",

  cgasDeposit: "",

};



const initial54EC = {

  assessmentYear: "",

  capitalGain: "",

  investment: "",

};



const initial54EE = {

  assessmentYear: "",

  capitalGain: "",

  investment: "",

};



const initial54F = {

  assessmentYear: "",

  capitalGain: "",

  netConsideration: "",

  investment: "",

  cgas: "",

};



const initial54G = {

  assessmentYear: "",

  capitalGain: "",

  investmentCost: "",

  cgas: "",

};



const initial54GA = {

  assessmentYear: "",

  capitalGain: "",

  investmentCost: "",

  cgas: "",

};



const [sec54, setSec54] = useState(initial54);

const [sec54B, setSec54B] = useState(initial54B);

const [sec54D, setSec54D] = useState(initial54D);

const [sec54EC, setSec54EC] = useState(initial54EC);

const [sec54EE, setSec54EE] = useState(initial54EE);

const [sec54F, setSec54F] = useState(initial54F);

const [sec54G, setSec54G] = useState(initial54G);

const [sec54GA, setSec54GA] = useState(initial54GA);



const update54 = (k, v) => setSec54((p) => ({ ...p, [k]: v }));

const update54B = (k, v) => setSec54B((p) => ({ ...p, [k]: v }));

const update54D = (k, v) => setSec54D((p) => ({ ...p, [k]: v }));

const update54EC = (k, v) => setSec54EC((p) => ({ ...p, [k]: v }));

const update54EE = (k, v) => setSec54EE((p) => ({ ...p, [k]: v }));

const update54F = (k, v) => setSec54F((p) => ({ ...p, [k]: v }));

const update54G = (k, v) => setSec54G((p) => ({ ...p, [k]: v }));

const update54GA = (k, v) => setSec54GA((p) => ({ ...p, [k]: v }));







 const handleReset = () => {

  if (activeTab === "54") setSec54(initial54);

  if (activeTab === "54B") setSec54B(initial54B);

  if (activeTab === "54D") setSec54D(initial54D);

  if (activeTab === "54EC") setSec54EC(initial54EC);

  if (activeTab === "54EE") setSec54EE(initial54EE);

  if (activeTab === "54F") setSec54F(initial54F);

  if (activeTab === "54G") setSec54G(initial54G);

  if (activeTab === "54GA") setSec54GA(initial54GA);

};



const [activeTab, setActiveTab] = useState("54");



  const assessmentYears = [

    "2017-18","2018-19","2019-20","2020-21","2021-22",

    "2022-23","2023-24","2024-25","2025-26","2026-27",

  ];





const result = useMemo(() => {

const capitalGain = Number(sec54.capitalGain || 0);

const investment = Number(sec54.investment || 0);

const cgas = Number(sec54.cgasDeposit || 0);

const totalInvestment = investment + cgas;

// 🔥 Extract starting year from AY (e.g., "2024-25" → 2024)*

const ayStart = Number(sec54.assessmentYear?.split("-")[0] || 0);

let exemption;

if (ayStart >= 2024) {

    // ✅ Apply ₹10 Cr cap*

    const cap = 100000000; // 10 Crore*

    exemption = Math.min(capitalGain, totalInvestment, cap);

  } else {

    // ✅ No cap for earlier years*

    exemption = Math.min(capitalGain, totalInvestment);

  }

const taxable = Math.max(capitalGain - exemption, 0);

return { exemption, taxable };},

[sec54]);



const result54B = useMemo(() => {

const capitalGain = Number(sec54B.capitalGain || 0);

const investment = Number(sec54B.investment || 0);

const cgas = Number(sec54B.cgasDeposit || 0);

const totalInvestment = investment + cgas;

const exemption = Math.min(capitalGain, totalInvestment);

const taxable = Math.max(capitalGain - exemption, 0);

return { exemption, taxable };}, 

[sec54B]);



const result54D = useMemo(() => {

const capitalGain = Number(sec54D.capitalGain || 0);

const investment = Number(sec54D.investment || 0);

const cgas = Number(sec54D.cgasDeposit || 0);

const totalInvestment = investment + cgas;

const exemption = Math.min(capitalGain, totalInvestment);

const taxable = Math.max(capitalGain - exemption, 0);

const warning =totalInvestment > capitalGain && capitalGain > 0;

return { exemption,taxable,warning,};}, 

[sec54D]);



const num = (val) => Number(val) || 0;

const calculation = useMemo(() => {

const capitalGain = num(sec54EC.capitalGain);

const investment = num(sec54EC.investment);

const MAX_LIMIT = 5000000;

const eligibleInvestment = Math.min(investment, MAX_LIMIT);

const exemption = Math.min(capitalGain, eligibleInvestment);

const taxable = capitalGain - exemption;

return { eligibleInvestment,exemption,taxable};},

[sec54EC]);



const result54EE = useMemo(() => {

const capitalGain = num(sec54EE.capitalGain);

const investment = num(sec54EE.investment);

const MAX_LIMIT = 5000000;

const eligibleInvestment = Math.min(investment, MAX_LIMIT);

const exemption = Math.min(capitalGain, eligibleInvestment, MAX_LIMIT);

const taxable = capitalGain - exemption;

return { eligibleInvestment,exemption,taxable};},

[sec54EE]);



const result54F = useMemo(() => {

const ay = sec54F.assessmentYear;

const capitalGain = num(sec54F.capitalGain);

const netConsideration = num(sec54F.netConsideration);

const investment = num(sec54F.investment);

const cgas = num(sec54F.cgas);

let totalInvestment = investment + cgas;

let exemption = 0;

let warnings = [];

const ayNumber = parseInt(ay?.split("-")[0]) || 0;

    // AY CAP LOGIC (₹10 crore cap)*

const MAX_LIMIT = 100000000; // 10 crore*





   if (ayNumber >= 2024) {

    if (totalInvestment > MAX_LIMIT) {

      totalInvestment = MAX_LIMIT;

      warnings.push("Exemption capped at ₹10 Crore (AY 2024-25 onwards)");

    }

  }



    if (capitalGain > 0 && netConsideration > 0 && totalInvestment > 0) {

    exemption = (capitalGain * totalInvestment + cgas) / netConsideration;

  }



  // final cap*

  exemption = Math.min(exemption, capitalGain);

  exemption = Math.round(exemption);

  const taxable = Math.round(capitalGain - exemption);



    // Warnings*

   if (netConsideration > 0 && totalInvestment < netConsideration) {

    warnings.push("Proportionate exemption applied");

  }



  if (totalInvestment <= 0) {

    warnings.push("No exemption (no investment / CGAS)");

  }



  if (netConsideration <= 0) {

    warnings.push("Invalid Net Consideration");

  }

    return { exemption,taxable,warnings,};},

[sec54F]);



  const result54G= useMemo(() => {

  const capitalGain = num(sec54G.capitalGain);

  const investmentCost = num(sec54G.investmentCost);

  const cgas = num(sec54G.cgas);

  const totalEligibleAmount = investmentCost + cgas;

  const exemption = Math.min(capitalGain, totalEligibleAmount);

  const taxable = capitalGain - exemption;

  return { exemption, taxable,};}, 

  [sec54G]);



  const result54GA= useMemo(() => {

  const capitalGain = num(sec54GA.capitalGain);

  const investmentCost = num(sec54GA.investmentCost);

  const cgas = num(sec54GA.cgas);

  const totalEligibleAmount = investmentCost + cgas;

  const exemption = Math.min(capitalGain, totalEligibleAmount);

  const taxable = capitalGain - exemption;

  return { exemption, taxable,};}, 

  [sec54GA]);







return (

  <div className="cg-modern-page">

    <div className="cg-modern-container">

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

      {isPageLoading ? (
        <div className="cg-page-skeleton" role="status" aria-label="Loading capital gains calculator">
          <div className="cg-skeleton-header"><div>
            <Skeleton variant="text" width={175} height={22}/><Skeleton variant="text" width="min(390px, 85%)" height={42}/><Skeleton variant="text" width="min(560px, 95%)" height={22}/>
          </div><Skeleton variant="rounded" width={160} height={70}/></div>
          <div className="cg-skeleton-grid">
            <div className="cg-skeleton-card">
              <Skeleton variant="rounded" width="100%" height={48}/><Skeleton variant="text" width={240} height={30}/><Skeleton variant="text" width={320} height={20}/>
              <div className="cg-skeleton-tabs">{Array.from({length:8}).map((_,i)=><Skeleton key={i} variant="rounded" width={82} height={38}/>)}</div>
              <div className="cg-skeleton-fields">{Array.from({length:4}).map((_,i)=><div className="cg-skeleton-field" key={i}><Skeleton variant="text" width="48%" height={20}/><Skeleton variant="rounded" width="100%" height={49}/></div>)}</div>
              <div className="cg-skeleton-actions"><Skeleton variant="rounded" width={115} height={44}/><Skeleton variant="rounded" width={160} height={44}/></div>
            </div>
            <div className="cg-skeleton-card"><Skeleton variant="text" width="62%" height={28}/><Skeleton variant="rounded" width="100%" height={120}/>{Array.from({length:4}).map((_,i)=><Skeleton key={i} variant="rounded" width="100%" height={42}/>)}</div>
          </div>
        </div>
      ) : (
      <>{/* HEADER */}

      <div className="cg-modern-header">

        <div>

          <p className="cg-modern-kicker">Capital Gain Exemption Utility</p>

          <h1>Section 54 Exemption Calculator</h1>

          <p>

            Calculate exemption and taxable capital gain under Sections 54, 54B, 54D, 54EC, 54EE, 54F, 54G and 54GA.

          </p>

        </div>



        <div className="cg-modern-badge">

          <span>Active Section</span>

          <strong>Section {activeTab}</strong>

        </div>

      </div>



      <div className="cg-modern-grid">



        {/* LEFT FORM */}

        <div className="cg-modern-card">



          {/* TABS */}

          <div className="cg-tab-wrap">

            {["54","54B","54D","54EC","54EE","54F","54G","54GA"].map((sec) => (

              <button

                key={sec}

                onClick={() => setActiveTab(sec)}

                className={activeTab === sec ? "cg-tab active" : "cg-tab"}

              >

                Section {sec}

              </button>

            ))}

          </div>



          {/* ================= SECTION 54 ================= */}

          {activeTab === "54" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54 Calculator</h2>

                <p>Exemption for investment in residential house property</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54.assessmentYear}
                    onChange={(e) => update54("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select Assessment Year</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming exemption <span>*</span></label>

                  <input value="Individual / HUF" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input value="Residential House Property" disabled />

                </div>



                <div className="cg-field">

                  <label>Amount of Capital Gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54.capitalGain} onChange={(nextValue) => update54("capitalGain", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount of Investment / Cost / Expenditure incurred</label>

                  <CapitalGainNumberField value={sec54.investment} onChange={(nextValue) => update54("investment", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount deposited in Capital Gain Account Scheme</label>

                  <CapitalGainNumberField value={sec54.cgasDeposit} onChange={(nextValue) => update54("cgasDeposit", nextValue)} placeholder="Enter CGAS deposit" />

                </div>

              </div>

            </>

          )}



          {/* ================= SECTION 54B ================= */}

          {activeTab === "54B" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54B Calculator</h2>

                <p>Exemption for investment in agricultural land</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54B.assessmentYear}
                    onChange={(e) => update54B("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select Assessment Year</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming the exemption <span>*</span></label>

                  <input value="Individual / HUF" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term / Short Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input value="Agricultural Land" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input value="Agricultural Land" disabled />

                </div>



                <div className="cg-field">

                  <label>Amount of capital gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54B.capitalGain} onChange={(nextValue) => update54B("capitalGain", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount of investment / cost / expenditure</label>

                  <CapitalGainNumberField value={sec54B.investment} onChange={(nextValue) => update54B("investment", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount deposited in Capital Gains Account Scheme</label>

                  <CapitalGainNumberField value={sec54B.cgasDeposit} onChange={(nextValue) => update54B("cgasDeposit", nextValue)} placeholder="Enter amount" />

                </div>

              </div>

            </>

          )}



          {/* ================= SECTION 54D ================= */}

          {activeTab === "54D" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54D Calculator</h2>

                <p>Exemption on compulsory acquisition of industrial land/building</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54D.assessmentYear}
                    onChange={(e) => update54D("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming the exemption <span>*</span></label>

                  <input value="Any person" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term / Short Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input

                    value="Compulsory acquistion land or building used for industrial purpose"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input

                    value="Land or building used for new establishment of undertaking"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Amount of capital gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54D.capitalGain} onChange={(nextValue) => update54D("capitalGain", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount of investment / cost / expenditure</label>

                  <CapitalGainNumberField value={sec54D.investment} onChange={(nextValue) => update54D("investment", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount deposited in Capital Gains Account Scheme</label>

                  <CapitalGainNumberField value={sec54D.cgasDeposit} onChange={(nextValue) => update54D("cgasDeposit", nextValue)} placeholder="Enter amount" />

                </div>

              </div>



              {result54D.warning && (

                <div className="cg-warning-box">

                  ⚠ Investment + CGAS cannot exceed Capital Gain

                </div>

              )}

            </>

          )}



          {/* ================= SECTION 54EC ================= */}

          {activeTab === "54EC" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54EC Calculator</h2>

                <p>Exemption for investment in specified bonds</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54EC.assessmentYear}
                    onChange={(e) => update54EC("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select Assessment Year</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming exemption <span>*</span></label>

                  <input value="Any person" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input value="Land and building" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input

                    value="NHAI bond / REC bond / Any other notified bonds"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Amount of Capital Gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54EC.capitalGain} onChange={(nextValue) => update54EC("capitalGain", nextValue)} placeholder="Enter capital gain amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount of Investment / Cost / Expenditure incurred</label>

                  <CapitalGainNumberField value={sec54EC.investment} onChange={(nextValue) => update54EC("investment", nextValue)} placeholder="Enter investment amount" />

                </div>

              </div>



              {num(sec54EC.investment) > 5000000 && (

                <div className="cg-warning-box">

                  ⚠ Maximum eligible investment under 54EC is ₹50,00,000 per FY.

                </div>

              )}

            </>

          )}



          {/* ================= SECTION 54EE ================= */}

          {activeTab === "54EE" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54EE Calculator</h2>

                <p>Exemption for investment in specified assets</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54EE.assessmentYear}
                    onChange={(e) => update54EE("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select Assessment Year</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming exemption <span>*</span></label>

                  <input value="Any person" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital assets eligible for exemption <span>*</span></label>

                  <input value="Long term capital assets" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input value="Specified assets" disabled />

                </div>



                <div className="cg-field">

                  <label>Amount of Capital Gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54EE.capitalGain} onChange={(nextValue) => update54EE("capitalGain", nextValue)} placeholder="Enter capital gain amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount of Investment / Cost / Expenditure incurred</label>

                  <CapitalGainNumberField value={sec54EE.investment} onChange={(nextValue) => update54EE("investment", nextValue)} placeholder="Enter investment amount" />

                </div>

              </div>



              {num(sec54EE.investment) > 5000000 && (

                <div className="cg-warning-box">

                  ⚠ Maximum eligible investment under 54EE is ₹50,00,000 per FY.

                </div>

              )}

            </>

          )}



          {/* ================= SECTION 54F ================= */}

          {activeTab === "54F" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54F Calculator</h2>

                <p>Exemption for investment in residential house property</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54F.assessmentYear}
                    onChange={(e) => update54F("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select Year</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming exemption <span>*</span></label>

                  <input value="Individiual/HUF" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital assets eligible for exemption <span>*</span></label>

                  <input

                    value="Any long term asset other than residenitial house property"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input value="Residenitial house property of India" disabled />

                </div>



                <div className="cg-field">

                  <label>Amount of Capital Gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54F.capitalGain} onChange={(nextValue) => update54F("capitalGain", nextValue)} placeholder="Enter capital gain amount" />

                </div>



                <div className="cg-field full">

                  <label>Net sale consideration</label>

                  <CapitalGainNumberField value={sec54F.netConsideration} onChange={(nextValue) => update54F("netConsideration", nextValue)} placeholder="Enter net sale consideration amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount of Investment / Cost / Expenditure incurred</label>

                  <CapitalGainNumberField value={sec54F.investment} onChange={(nextValue) => update54F("investment", nextValue)} placeholder="Enter investment amount" />

                </div>



                <div className="cg-field full">

                  <label>Amount deposited in Capital Gains Account Scheme</label>

                  <CapitalGainNumberField value={sec54F.cgas} onChange={(nextValue) => update54F("cgas", nextValue)} placeholder="Enter amount" />

                </div>

              </div>



              {result54F.warnings.length > 0 && (

                <div className="cg-warning-box">

                  <p>Notes:</p>

                  <ul>

                    {result54F.warnings.map((w, i) => (

                      <li key={i}>• {w}</li>

                    ))}

                  </ul>

                </div>

              )}

            </>

          )}



          {/* ================= SECTION 54G ================= */}

          {activeTab === "54G" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54G Calculator</h2>

                <p>Exemption on shifting of industrial undertaking</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54G.assessmentYear}
                    onChange={(e) => update54G("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming the exemption <span>*</span></label>

                  <input value="Any person" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term / Short Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input

                    value="Plant and machinery, Land and building and Shifting expenses"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input

                    value="Plant and machinery, Land and building and any right thereon"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Amount of capital gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54G.capitalGain} onChange={(nextValue) => update54G("capitalGain", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount of investment / cost / expenditure</label>

                  <CapitalGainNumberField value={sec54G.investmentCost} onChange={(nextValue) => update54G("investmentCost", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount deposited in Capital Gains Account Scheme</label>

                  <CapitalGainNumberField value={sec54G.cgas} onChange={(nextValue) => update54G("cgas", nextValue)} placeholder="Enter amount" />

                </div>

              </div>

            </>

          )}



          {/* ================= SECTION 54GA ================= */}

          {activeTab === "54GA" && (

            <>

              <div className="cg-section-title">

                <h2>Section 54GA Calculator</h2>

                <p>Exemption on shifting of industrial undertaking to SEZ</p>

              </div>



              <div className="cg-form-grid">

                <div className="cg-field">

                  <label>Assessment Year <span>*</span></label>

                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="cg-mui-select"
                    value={sec54GA.assessmentYear}
                    onChange={(e) => update54GA("assessmentYear", e.target.value)}
                    SelectProps={{ MenuProps: { PaperProps: { className: "cg-select-menu-paper" } } }}
                  >
                    <MenuItem value="">Select</MenuItem>{assessmentYears.map((year) => (<MenuItem key={year} value={year}>{year}</MenuItem>))}
                  </TextField>

                </div>



                <div className="cg-field">

                  <label>Eligible person for claiming the exemption <span>*</span></label>

                  <input value="Any person" disabled />

                </div>



                <div className="cg-field">

                  <label>Type of capital gain <span>*</span></label>

                  <input value="Long Term / Short Term" disabled />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for exemption <span>*</span></label>

                  <input

                    value="Plant and machinery, Land and building and Shifting expenses"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Capital asset eligible for investment <span>*</span></label>

                  <input

                    value="Plant and machinery, Land and building and any right thereon"

                    disabled

                  />

                </div>



                <div className="cg-field">

                  <label>Amount of capital gain <span>*</span></label>

                  <CapitalGainNumberField value={sec54GA.capitalGain} onChange={(nextValue) => update54GA("capitalGain", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount of investment / cost / expenditure</label>

                  <CapitalGainNumberField value={sec54GA.investmentCost} onChange={(nextValue) => update54GA("investmentCost", nextValue)} placeholder="Enter amount" />

                </div>



                <div className="cg-field">

                  <label>Amount deposited in Capital Gains Account Scheme</label>

                  <CapitalGainNumberField value={sec54GA.cgas} onChange={(nextValue) => update54GA("cgas", nextValue)} placeholder="Enter amount" />

                </div>

              </div>

            </>

          )}



          <div className="cg-modern-actions">

            <Button variant="contained" className="cg-calculate-button" onClick={handleCalculate} disabled={isCalculating}
              startIcon={isCalculating ? <CircularProgress size={17} color="inherit"/> : null}>
              {isCalculating ? "Calculating..." : "Calculate Exemption"}
            </Button>
            <button onClick={handleReset} className="cg-btn-secondary">Reset</button>

          </div>

        </div>



        {/* RIGHT RESULT PANEL */}

        <div className="cg-result-panel">

          <div className="cg-result-head">

            <p>Computation Summary</p>

            <h2>

              ₹ {

                activeTab === "54" ? result.exemption.toLocaleString() :

                activeTab === "54B" ? result54B.exemption.toLocaleString() :

                activeTab === "54D" ? result54D.exemption.toLocaleString() :

                activeTab === "54EC" ? calculation.exemption.toLocaleString() :

                activeTab === "54EE" ? result54EE.exemption.toLocaleString() :

                activeTab === "54F" ? result54F.exemption.toLocaleString() :

                activeTab === "54G" ? result54G.exemption.toLocaleString() :

                activeTab === "54GA" ? result54GA.exemption.toLocaleString() :

                "0"

              }

            </h2>

            <span>Amount of Exemption</span>

          </div>



          <div className="cg-result-list">

            <div className="cg-result-item">

              <span>Selected Section</span>

              <strong>Section {activeTab}</strong>

            </div>



            <div className="cg-result-item">

              <span>Assessment Year</span>

              <strong>

                {

                  activeTab === "54" ? sec54.assessmentYear || "-" :

                  activeTab === "54B" ? sec54B.assessmentYear || "-" :

                  activeTab === "54D" ? sec54D.assessmentYear || "-" :

                  activeTab === "54EC" ? sec54EC.assessmentYear || "-" :

                  activeTab === "54EE" ? sec54EE.assessmentYear || "-" :

                  activeTab === "54F" ? sec54F.assessmentYear || "-" :

                  activeTab === "54G" ? sec54G.assessmentYear || "-" :

                  activeTab === "54GA" ? sec54GA.assessmentYear || "-" :

                  "-"

                }

              </strong>

            </div>



            <div className="cg-result-item">

              <span>Capital Gain</span>

              <strong>

                ₹ {

                  activeTab === "54" ? Number(sec54.capitalGain || 0).toLocaleString() :

                  activeTab === "54B" ? Number(sec54B.capitalGain || 0).toLocaleString() :

                  activeTab === "54D" ? Number(sec54D.capitalGain || 0).toLocaleString() :

                  activeTab === "54EC" ? Number(sec54EC.capitalGain || 0).toLocaleString() :

                  activeTab === "54EE" ? Number(sec54EE.capitalGain || 0).toLocaleString() :

                  activeTab === "54F" ? Number(sec54F.capitalGain || 0).toLocaleString() :

                  activeTab === "54G" ? Number(sec54G.capitalGain || 0).toLocaleString() :

                  activeTab === "54GA" ? Number(sec54GA.capitalGain || 0).toLocaleString() :

                  "0"

                }

              </strong>

            </div>



            <div className="cg-result-item exempt">

              <span>Amount of Exemption</span>

              <strong>

                ₹ {

                  activeTab === "54" ? result.exemption.toLocaleString() :

                  activeTab === "54B" ? result54B.exemption.toLocaleString() :

                  activeTab === "54D" ? result54D.exemption.toLocaleString() :

                  activeTab === "54EC" ? calculation.exemption.toLocaleString() :

                  activeTab === "54EE" ? result54EE.exemption.toLocaleString() :

                  activeTab === "54F" ? result54F.exemption.toLocaleString() :

                  activeTab === "54G" ? result54G.exemption.toLocaleString() :

                  activeTab === "54GA" ? result54GA.exemption.toLocaleString() :

                  "0"

                }

              </strong>

            </div>



            <div className="cg-result-item final">

              <span>Taxable Capital Gain</span>

              <strong>

                ₹ {

                  activeTab === "54" ? result.taxable.toLocaleString() :

                  activeTab === "54B" ? result54B.taxable.toLocaleString() :

                  activeTab === "54D" ? result54D.taxable.toLocaleString() :

                  activeTab === "54EC" ? calculation.taxable.toLocaleString() :

                  activeTab === "54EE" ? result54EE.taxable.toLocaleString() :

                  activeTab === "54F" ? result54F.taxable.toLocaleString() :

                  activeTab === "54G" ? result54G.taxable.toLocaleString() :

                  activeTab === "54GA" ? result54GA.taxable.toLocaleString() :

                  "0"

                }

              </strong>

            </div>

          </div>

        </div>

      </div>

          </>
      )}

    </div>

      <style>{`

      .cg-modern-page {

        min-height: 100vh;

        background:

          radial-gradient(circle at top left, rgba(37, 99, 235, 0.25), transparent 32%),

          linear-gradient(135deg, #07111f 0%, #0f172a 45%, #111827 100%);

        color: #e5e7eb;

        padding: 34px;

        font-family: Inter, Arial, sans-serif;

      }



      .cg-modern-container {

        max-width: 1300px;

        margin: 0 auto;

      }



      .cg-modern-header {

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



      .cg-modern-kicker {

        color: #60a5fa;

        text-transform: uppercase;

        letter-spacing: 2px;

        font-size: 12px;

        font-weight: 800;

        margin: 0 0 8px;

      }



      .cg-modern-header h1 {

        font-size: 36px;

        line-height: 1.1;

        margin: 0;

        color: #ffffff;

      }



      .cg-modern-header p {

        margin: 10px 0 0;

        color: #94a3b8;

        font-size: 15px;

      }



      .cg-modern-badge {

        min-width: 190px;

        padding: 18px;

        border-radius: 20px;

        background: linear-gradient(135deg, rgba(37,99,235,0.18), rgba(14,165,233,0.12));

        border: 1px solid rgba(96, 165, 250, 0.28);

        text-align: center;

      }



      .cg-modern-badge span {

        display: block;

        color: #93c5fd;

        font-size: 12px;

        font-weight: 700;

        margin-bottom: 5px;

      }



      .cg-modern-badge strong {

        color: #ffffff;

        font-size: 20px;

      }



      .cg-modern-grid {

        display: grid;

        grid-template-columns: minmax(0, 1fr) 380px;

        gap: 26px;

        align-items: start;

      }



      .cg-modern-card,

      .cg-result-panel {

        background: rgba(15, 23, 42, 0.9);

        border: 1px solid rgba(148, 163, 184, 0.18);

        border-radius: 24px;

        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);

      }



      .cg-modern-card {

        padding: 26px;

      }



      .cg-tab-wrap {

        display: flex;

        gap: 12px;

        overflow-x: auto;

        padding-bottom: 18px;

        margin-bottom: 24px;

        border-bottom: 1px solid rgba(148, 163, 184, 0.15);

      }



      .cg-tab {

        min-width: max-content;

        height: 42px;

        padding: 0 18px;

        border-radius: 14px;

        border: 1px solid rgba(148, 163, 184, 0.22);

        background: rgba(2, 6, 23, 0.48);

        color: #cbd5e1;

        font-weight: 800;

        cursor: pointer;

        transition: all 0.2s ease;

      }



      .cg-tab:hover {

        border-color: #60a5fa;

        color: #ffffff;

      }



      .cg-tab.active {

        background: linear-gradient(135deg, #2563eb, #0ea5e9);

        border-color: rgba(96, 165, 250, 0.55);

        color: #ffffff;

        box-shadow: 0 14px 30px rgba(37, 99, 235, 0.28);

      }



      .cg-section-title {

        margin-bottom: 24px;

        padding-bottom: 18px;

        border-bottom: 1px solid rgba(148, 163, 184, 0.15);

      }



      .cg-section-title h2 {

        margin: 0;

        color: #ffffff;

        font-size: 22px;

      }



      .cg-section-title p {

        margin: 7px 0 0;

        color: #94a3b8;

        font-size: 14px;

      }



      .cg-form-grid {

        display: grid;

        grid-template-columns: repeat(2, minmax(0, 1fr));

        gap: 18px;

      }



      .cg-field {

        display: flex;

        flex-direction: column;

        gap: 8px;

      }



      .cg-field.full {

        grid-column: span 2;

      }



      .cg-field label {

        color: #cbd5e1;

        font-size: 13px;

        font-weight: 700;

        line-height: 1.45;

      }



      .cg-field label span {

        color: #f87171;

      }



      .cg-field input,

      .cg-field select {

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



      .cg-field input::placeholder {

        color: #64748b;

      }



      .cg-field input:focus,

      .cg-field select:focus {

        border-color: #60a5fa;

        box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.14);

        background: rgba(15, 23, 42, 0.95);

      }



      .cg-field input:disabled {

        opacity: 0.9;

        cursor: not-allowed;

        background: rgba(30, 41, 59, 0.75);

        color: #cbd5e1;

      }



      .cg-field option {

        background: #0f172a;

        color: #ffffff;

      }



      .cg-warning-box {

        margin-top: 22px;

        padding: 16px;

        border-radius: 18px;

        background: rgba(245, 158, 11, 0.12);

        border: 1px solid rgba(245, 158, 11, 0.3);

        color: #fde68a;

        font-size: 14px;

        font-weight: 700;

        line-height: 1.6;

      }



      .cg-warning-box p {

        margin: 0 0 6px;

      }



      .cg-warning-box ul {

        margin: 0;

        padding-left: 0;

        list-style: none;

      }



      .cg-modern-actions {

        display: flex;

        justify-content: flex-end;

        margin-top: 26px;

      }



      .cg-btn-secondary {

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



      .cg-btn-secondary:hover {

        background: rgba(248, 113, 113, 0.16);

        color: #fecaca;

        border-color: rgba(248, 113, 113, 0.32);

      }



      .cg-result-panel {

        overflow: hidden;

        position: sticky;

        top: 22px;

      }



      .cg-result-head {

        padding: 26px;

        background: linear-gradient(135deg, rgba(37, 99, 235, 0.32), rgba(14, 165, 233, 0.16));

        border-bottom: 1px solid rgba(148, 163, 184, 0.14);

      }



      .cg-result-head p {

        margin: 0;

        color: #bfdbfe;

        font-size: 13px;

        font-weight: 800;

        text-transform: uppercase;

        letter-spacing: 1.5px;

      }



      .cg-result-head h2 {

        margin: 14px 0 4px;

        color: #ffffff;

        font-size: 32px;

        line-height: 1.2;

        word-break: break-word;

      }



      .cg-result-head span {

        color: #93c5fd;

        font-size: 13px;

        font-weight: 700;

      }



      .cg-result-list {

        padding: 18px;

      }



      .cg-result-item {

        display: flex;

        justify-content: space-between;

        align-items: flex-start;

        gap: 14px;

        padding: 15px 0;

        border-bottom: 1px solid rgba(148, 163, 184, 0.12);

      }



      .cg-result-item:last-child {

        border-bottom: none;

      }



      .cg-result-item span {

        color: #94a3b8;

        font-size: 14px;

        line-height: 1.4;

      }



      .cg-result-item strong {

        color: #ffffff;

        font-size: 15px;

        text-align: right;

        white-space: nowrap;

      }



      .cg-result-item.exempt {

        margin-top: 10px;

        padding: 16px;

        border-radius: 16px;

        border: 1px solid rgba(34, 197, 94, 0.24);

        background: rgba(34, 197, 94, 0.08);

      }



      .cg-result-item.exempt span {

        color: #bbf7d0;

        font-weight: 800;

      }



      .cg-result-item.exempt strong {

        color: #86efac;

        font-size: 18px;

      }



      .cg-result-item.final {

        margin-top: 10px;

        padding: 16px;

        border-radius: 16px;

        border: 1px solid rgba(248, 113, 113, 0.28);

        background: rgba(248, 113, 113, 0.09);

      }



      .cg-result-item.final span {

        color: #fecaca;

        font-weight: 800;

      }



      .cg-result-item.final strong {

        color: #fca5a5;

        font-size: 20px;

      }



      @media (max-width: 1100px) {

        .cg-modern-page {

          padding: 20px;

        }



        .cg-modern-header {

          flex-direction: column;

          align-items: flex-start;

        }



        .cg-modern-grid {

          grid-template-columns: 1fr;

        }



        .cg-result-panel {

          position: static;

        }

      }



      @media (max-width: 680px) {

        .cg-form-grid {

          grid-template-columns: 1fr;

        }



        .cg-field.full {

          grid-column: span 1;

        }



        .cg-modern-actions {

          flex-direction: column;

        }



        .cg-btn-secondary {

          width: 100%;

        }



        .cg-result-item {

          flex-direction: column;

        }



        .cg-result-item strong {

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


      .cg-modern-page{background:#E3FDFD!important;color:#173B3E!important;min-height:100vh}
      .cg-modern-header,.cg-modern-card,.cg-result-panel,.cg-skeleton-card,.cg-skeleton-header{background:#fff!important;color:#173B3E!important;border:1px solid #CBF1F5!important;box-shadow:0 8px 28px rgba(23,59,62,.055)!important}
      .cg-modern-header h1,.cg-section-title h2{color:#173B3E!important}.cg-modern-header p,.cg-section-title p,.cg-modern-kicker{color:#52777A!important}
      .cg-modern-badge{background:#E3FDFD!important;border:1px solid #A6E3E9!important}.cg-modern-badge span{color:#52777A!important}.cg-modern-badge strong{color:#164E52!important}
      .cg-tab{background:#fff!important;color:#315F63!important;border:1px solid #A6E3E9!important}.cg-tab.active{background:#71C9CE!important;color:#173B3E!important;border-color:#71C9CE!important}
      .cg-field label{color:#315F63!important}.cg-field select{width:100%;min-height:49px;padding:0 14px;border:1px solid #A6E3E9;border-radius:13px;background:#fff;color:#173B3E;font:inherit}.cg-field select:focus{outline:0;border-color:#329DA3;box-shadow:0 0 0 3px rgba(113,201,206,.16)}
      .cg-number-control{display:flex;width:100%;min-height:49px;overflow:hidden;border:1px solid #71C9CE;border-radius:14px;background:#fff}.cg-number-control:focus-within{border-color:#329DA3;box-shadow:0 0 0 3px rgba(113,201,206,.16)}
      .cg-number-input{flex:1;min-width:0;width:100%;padding:0 14px;border:0!important;outline:0;background:#fff!important;color:#173B3E!important;font:inherit;box-shadow:none!important}.cg-number-input::placeholder{color:#78999B!important}
      .cg-number-steppers{display:flex;flex-direction:column;width:42px;flex:0 0 42px;background:#E3FDFD;border-left:1px solid #CBF1F5}.cg-number-step{flex:1;display:flex;align-items:center;justify-content:center;padding:0;border:0;background:#E3FDFD;color:#329DA3;font-size:17px;font-weight:800;cursor:pointer}.cg-number-step+.cg-number-step{border-top:1px solid #CBF1F5}.cg-number-step:hover{background:#CBF1F5}
      .business-code-back-btn{background:#fff!important;color:#164E52!important;border:1px solid #A6E3E9!important}.business-code-back-btn:hover{background:#E3FDFD!important;border-color:#71C9CE!important;color:#164E52!important}.business-code-back-btn span{color:#329DA3!important}
      .cg-btn-primary,.cg-calculate-button{background:#71C9CE!important;color:#173B3E!important;border-radius:12px!important;box-shadow:none!important;font-weight:800!important}.cg-btn-primary:hover,.cg-calculate-button:hover{background:#A6E3E9!important}.cg-btn-secondary{background:#fff!important;color:#237F85!important;border:1px solid #71C9CE!important}
      .cg-result-head{background:#71C9CE!important;border-color:#71C9CE!important}.cg-result-head p,.cg-result-head h2,.cg-result-head span{color:#fff!important}.cg-result-list{background:#fff!important}.cg-result-item{border-color:#CBF1F5!important}.cg-result-item span{color:#52777A!important}.cg-result-item strong{color:#173B3E!important}.cg-result-item.exempt{background:#E3FDFD!important;border-color:#A6E3E9!important}.cg-result-item.exempt span,.cg-result-item.exempt strong{color:#237F85!important}.cg-result-item.final{background:#F0FCFC!important;border-color:#A6E3E9!important}.cg-result-item.final span,.cg-result-item.final strong{color:#164E52!important}
      .cg-page-skeleton{display:grid;gap:22px}.cg-skeleton-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:24px;border-radius:22px}.cg-skeleton-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.85fr);gap:22px}.cg-skeleton-card{display:grid;align-content:start;gap:14px;padding:24px;border-radius:22px;min-width:0}.cg-skeleton-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}.cg-skeleton-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.cg-skeleton-field{display:grid;gap:5px;min-width:0}.cg-skeleton-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:8px}.cg-page-skeleton .MuiSkeleton-root{background-color:#CBF1F5!important;opacity:1!important}.cg-page-skeleton .MuiSkeleton-root::after{background:linear-gradient(90deg,transparent,rgba(227,253,253,.98),transparent)!important}
      @media(max-width:900px){.cg-skeleton-grid{grid-template-columns:1fr}}@media(max-width:680px){.cg-skeleton-header{padding:17px}.cg-skeleton-header>.MuiSkeleton-root{display:none}.cg-skeleton-card{padding:17px}.cg-skeleton-fields{grid-template-columns:1fr}.cg-skeleton-actions{flex-direction:column}.cg-calculate-button,.cg-btn-secondary{width:100%}}


      /* MUI Select: force the complete popup and focused control into the light palette.
         The menu is rendered in a portal, so these selectors intentionally are global. */
      html, body, #root { color-scheme: light !important; }
      .cg-modern-page { color-scheme: light !important; }
      .cg-modern-page .cg-mui-select,
      .cg-modern-page .cg-mui-select .MuiInputBase-root,
      .cg-modern-page .cg-mui-select .MuiOutlinedInput-root {
        background: #FFFFFF !important;
        background-color: #FFFFFF !important;
        color: #173B3E !important;
        border-radius: 14px !important;
      }
      .cg-modern-page .cg-mui-select .MuiSelect-select,
      .cg-modern-page .cg-mui-select .MuiInputBase-input {
        background: #FFFFFF !important;
        background-color: #FFFFFF !important;
        color: #173B3E !important;
        -webkit-text-fill-color: #173B3E !important;
      }
      .cg-modern-page .cg-mui-select .MuiOutlinedInput-notchedOutline {
        border: 1px solid #71C9CE !important;
        border-radius: 14px !important;
      }
      .cg-modern-page .cg-mui-select .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: #329DA3 !important;
      }
      .cg-modern-page .cg-mui-select .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 2px solid #71C9CE !important;
        box-shadow: 0 0 0 3px rgba(113,201,206,.16) !important;
      }
      .cg-modern-page .cg-mui-select .MuiSelect-icon { color: #329DA3 !important; }
      body .cg-select-menu-paper,
      body .MuiPopover-paper.cg-select-menu-paper,
      body .MuiMenu-paper.cg-select-menu-paper {
        background: #FFFFFF !important;
        background-color: #FFFFFF !important;
        color: #173B3E !important;
        border: 1px solid #A6E3E9 !important;
        border-radius: 14px !important;
        box-shadow: 0 12px 30px rgba(23,59,62,.14) !important;
        margin-top: 6px !important;
      }
      body .cg-select-menu-paper .MuiList-root,
      body .cg-select-menu-paper .MuiMenu-list {
        background: #FFFFFF !important;
        background-color: #FFFFFF !important;
        padding: 6px !important;
      }
      body .cg-select-menu-paper .MuiMenuItem-root {
        background: #FFFFFF !important;
        background-color: #FFFFFF !important;
        color: #173B3E !important;
        border-radius: 9px !important;
        min-height: 40px !important;
      }
      body .cg-select-menu-paper .MuiMenuItem-root:hover {
        background: #E3FDFD !important;
        background-color: #E3FDFD !important;
        color: #164E52 !important;
      }
      body .cg-select-menu-paper .MuiMenuItem-root.Mui-selected {
        background: #CBF1F5 !important;
        background-color: #CBF1F5 !important;
        color: #164E52 !important;
        font-weight: 700 !important;
      }
      body .cg-select-menu-paper .MuiMenuItem-root.Mui-selected:hover {
        background: #A6E3E9 !important;
        background-color: #A6E3E9 !important;
      }
      .cg-modern-page .cg-mui-select .Mui-disabled,
      .cg-modern-page .cg-field input:disabled {
        background: #F0FCFC !important;
        background-color: #F0FCFC !important;
        color: #52777A !important;
        -webkit-text-fill-color: #52777A !important;
        opacity: 1 !important;
      }

    `}</style>

  </div>

);

}