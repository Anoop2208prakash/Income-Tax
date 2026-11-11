import React, { useMemo, useState, useEffect } from "react";
import { Button, CircularProgress, MenuItem, Skeleton, TextField } from "@mui/material";
import { NumberField } from "@base-ui/react/number-field";
import { useNavigate } from "react-router-dom";

function SMRNumberField({ value, onChange, placeholder = "Enter amount", className = "smr-number-field", ariaLabel }) {
  const numericValue = value === "" || value == null ? null : (Number.isFinite(Number(value)) ? Number(value) : null);
  return (
    <NumberField.Root value={numericValue} onValueChange={(next) => onChange(next == null ? "" : String(next))} min={0} step={1} className={className} allowWheelScrub={false}>
      <NumberField.Group className="smr-number-group">
        <span className="smr-number-currency" aria-hidden="true">₹</span>
        <NumberField.Input className="smr-number-input" placeholder={placeholder} aria-label={ariaLabel || placeholder} inputMode="numeric" />
        <div className="smr-number-steppers">
          <NumberField.Increment className="smr-number-step" aria-label="Increase value">+</NumberField.Increment>
          <NumberField.Decrement className="smr-number-step" aria-label="Decrease value">−</NumberField.Decrement>
        </div>
      </NumberField.Group>
    </NumberField.Root>
  );
}

/* =========================================================
   CONSTANTS
========================================================= */

const ACTIVE_YEARS = [
  "2026-27",
];

const YEAR_OPTIONS = [
  { value: "", label: "Select Assessment Year" },
  { value: "2026-27", label: "AY 2026-27" },
];

const REGIME_OPTIONS = [
  {
    value: "old",
    label: "Old Regime / Old Slab",
  },
  {
    value: "new",
    label: "New Regime / New Slab",
  },
];

const RANGE_OPTIONS = {
  individual_group: [
    {
      key: "R50L",
      label: "₹50 lakh to ₹1 crore",
      shortLabel: "50L - 1Cr",
      thresholdIncome: 5000000,
    },
    {
      key: "R1CR",
      label: "₹1 crore to ₹2 crore",
      shortLabel: "1Cr - 2Cr",
      thresholdIncome: 10000000,
    },
    {
      key: "R2CR",
      label: "₹2 crore to ₹5 crore",
      shortLabel: "2Cr - 5Cr",
      thresholdIncome: 20000000,
    },
    {
      key: "R5CR",
      label: "Above ₹5 crore",
      shortLabel: "Above 5Cr",
      thresholdIncome: 50000000,
    },
  ],
};

const INDIVIDUAL_THRESHOLD_TAX = {
  
  "2026-27": {
    old: {
      R50L: 1312500,
      R1CR: 2812500,
      R2CR: 5812500,
      R5CR: 14812500,
    },
    new: {
      R50L: 1080000,
      R1CR: 2580000,
      R2CR: 5580000,
      R5CR: 14580000,
    },
  },
};

const THRESHOLD_PREVIOUS_SURCHARGE_RATE = {
  individual_group: {
    old: {
      R50L: 0,
      R1CR: 10,
      R2CR: 15,
      R5CR: 25,
    },
    new: {
        "2026-27": {
        R50L: 0,
        R1CR: 10,
        R2CR: 15,
        R5CR: 25,
      },
    },
  },
};

const SURCHARGE_RULES = {
  individual_group: {
    old: {
      R50L: 10,
      R1CR: 15,
      R2CR: 25,
      R5CR: 37,
    },
    new: {
      "2026-27": {
        R50L: 10,
        R1CR: 15,
        R2CR: 25,
        R5CR: 25,
      },
    },
  },

};

const SPECIAL_RATE_RULES = {
  "2026-27": {
    rate111A: 20,
    rate112: 12.5,
    rate112A: 12.5,
    exemption112A: 125000,
  },
};

/* =========================================================
   HELPERS
========================================================= */

function toNumber(value) {
  if (value === null || value === undefined) return 0;

  const cleaned = String(value)
    .replace(/,/g, "")
    .trim();

  const num = Number(cleaned);

  return Number.isFinite(num) ? num : 0;
}

function formatINR(value) {
  const num = Number(value) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

// =======================================================
// STEP 4 — INDIVIDUAL SURCHARGE RATE
// =======================================================


function getSurchargeRate({
  ay,
  regime,
  rangeKey,
}) {
  if (!ay || !regime || !rangeKey) {
    return 0;
  }

  if (regime === "old") {
    return (
      SURCHARGE_RULES
        .individual_group
        ?.old?.[rangeKey] || 0
    );
  }

  return (
    SURCHARGE_RULES
      .individual_group
      ?.new?.[ay]?.[rangeKey] || 0
  );
}

function getThresholdPreviousSurchargeRate({
  ay,
  regime,
  rangeKey,
}) {
  if (!ay || !regime || !rangeKey) {
    return 0;
  }

  if (regime === "old") {
    return (
      THRESHOLD_PREVIOUS_SURCHARGE_RATE
        .individual_group
        ?.old?.[rangeKey] || 0
    );
  }

  return (
    THRESHOLD_PREVIOUS_SURCHARGE_RATE
      .individual_group
      ?.new?.[ay]?.[rangeKey] || 0
  );
}

// =======================================================
// STEP 4 — THRESHOLD TAX
// =======================================================

function getThresholdTax({
  ay,
  regime,
  rangeKey,
}) {
  if (!ay || !regime || !rangeKey) {
    return 0;
  }

  return (
    INDIVIDUAL_THRESHOLD_TAX
      ?. [ay]
      ?. [regime]
      ?. [rangeKey] || 0
  );
}

// =======================================================
// STEP 5 — INDIVIDUAL INCOME RANGE ENGINE
// =======================================================

// =======================================================
// STEP 5 — INDIVIDUAL INCOME RANGE ENGINE
// =======================================================

function getRangeKeyForIncome(income) {
  const taxableIncome = Math.max(
    Number(income) || 0,
    0
  );

  if (taxableIncome > 50000000) return "R5CR";
  if (taxableIncome > 20000000) return "R2CR";
  if (taxableIncome > 10000000) return "R1CR";
  if (taxableIncome > 5000000) return "R50L";

  return "";
}


// =======================================================
// STEP 5 — SURCHARGE RATE BY INCOME
// =======================================================

function getSurchargeRateForIncome({
  ay,
  regime,
  income,
}) {
  const incomeRangeKey =
    getRangeKeyForIncome(income);

  if (!incomeRangeKey) {
    return 0;
  }

  return getSurchargeRate({
    ay,
    regime,
    rangeKey: incomeRangeKey,
  });
}


// =======================================================
// STEP 5 — INDIVIDUAL AUTO RANGE ENGINE
// =======================================================

function getIndividualRange(
  ay,
  regime,
  income
) {
  const taxableIncome = Math.max(
    Number(income) || 0,
    0
  );

  if (taxableIncome <= 5000000) {
    return {
      rangeKey: "",
      thresholdIncome: 0,
      surchargeRate: 0,
      previousRate: 0,
      thresholdTax: 0,
      thresholdPayable: 0,
    };
  }

  // -----------------------------------------
  // Range identification
  // -----------------------------------------

  let rangeKey = "";

  if (taxableIncome <= 10000000) {
    rangeKey = "R50L";
  } else if (taxableIncome <= 20000000) {
    rangeKey = "R1CR";
  } else if (taxableIncome <= 50000000) {
    rangeKey = "R2CR";
  } else {
    rangeKey = "R5CR";
  }


  // -----------------------------------------
  // Threshold income
  // -----------------------------------------

  const thresholdIncome =
    RANGE_OPTIONS
      .individual_group
      .find(
        (item) => item.key === rangeKey
      )
      ?.thresholdIncome || 0;

  // -----------------------------------------
  // Threshold tax
  // -----------------------------------------

   const thresholdTax =
    getThresholdTax({
      ay,
      regime,
      rangeKey,
    });
  // -----------------------------------------
  // Current surcharge
  // -----------------------------------------

  let surchargeRate = 0;

  if (regime === "old") {
    surchargeRate =
      SURCHARGE_RULES
        .individual_group
        ?.old
        ?.[rangeKey] || 0;
  } else {
    surchargeRate =
      SURCHARGE_RULES
        .individual_group
        ?.new
        ?.[ay]
        ?.[rangeKey] || 0;
  }

  // -----------------------------------------
  // Previous surcharge
  // -----------------------------------------

  let previousRate = 0;

  if (regime === "old") {
    previousRate =
      THRESHOLD_PREVIOUS_SURCHARGE_RATE
        .individual_group
        ?.old
        ?.[rangeKey] || 0;
  } else {
    previousRate =
      THRESHOLD_PREVIOUS_SURCHARGE_RATE
        .individual_group
        ?.new
        ?.[ay]
        ?.[rangeKey] || 0;
  }

  // -----------------------------------------
  // Threshold payable
  // -----------------------------------------

   const thresholdPayable =
    thresholdTax +
    (thresholdTax * previousRate) / 100;

  return {
    rangeKey,
    thresholdIncome,
    surchargeRate,
    previousRate,
    thresholdTax,
    thresholdPayable,
  };
}



// =======================================================
// STEP 6 — SPECIAL RATE TAX CALCULATION
// =======================================================

function calculateSpecialRateTaxes({
  ay,
  totalIncome,
  normalTax,
  income111A = 0,
  income112 = 0,
  income112A = 0,
  dividendIncome = 0,
}) {
  const income = Math.max(
    Number(totalIncome) || 0,
    0
  );


  const rules =
    SPECIAL_RATE_RULES[ay] ||
    SPECIAL_RATE_RULES["2026-27"];

  const amount111A = Math.max(
    Number(income111A) || 0,
    0
  );

  const amount112 = Math.max(
    Number(income112) || 0,
    0
  );

  const amount112A = Math.max(
    Number(income112A) || 0,
    0
  );

  const dividendAmount = Math.max(
    Number(dividendIncome) || 0,
    0
  );

  const specialIncome =
    amount111A +
    amount112 +
    amount112A +
    dividendAmount;

  const normalIncome = Math.max(
    income - specialIncome,
    0
  );



  // =====================================================
  // SECTION 111A
  // =====================================================

  const taxable111AIncome = amount111A;

  const tax111A =
    taxable111AIncome *
    (rules.rate111A / 100);


  // =====================================================
  // SECTION 112A
  // =====================================================

   const taxable112AIncome = Math.max(
    amount112A -
      rules.exemption112A,
    0
  );

  const tax112A =
    taxable112AIncome *
    (rules.rate112A / 100);


  // =====================================================
  // SECTION 112
  // =====================================================

 const taxable112Income = amount112;

  const tax112 =
    taxable112Income *
    (rules.rate112 / 100);


  // =====================================================
  // DIVIDEND TAX — PROPORTIONATE
  // =====================================================

 

  const normalTaxAmount =
    Math.max(
      Number(normalTax) || 0,
      0
    );


  const normalIncomeWithDividend =
    normalIncome + dividendAmount;

  // Placeholder — existing logic preserved
   const dividendTax =
    normalIncomeWithDividend > 0
      ? normalTaxAmount *
        (
          dividendAmount /
          normalIncomeWithDividend
        )
      : 0;


  // =====================================================
  // TRIGGER INCOME
  // =====================================================

    const triggerIncome =
    income -
    dividendAmount -
    taxable111AIncome -
    taxable112Income -
    taxable112AIncome;


  // =====================================================
  // RETURN
  // =====================================================

  return {
    income,

    specialIncome,

    normalIncome,

    taxable111AIncome,
    taxable112Income,
    taxable112AIncome,

    income112A: amount112A,

    tax111A,
    tax112,
    tax112A,

    dividendIncome: dividendAmount,

    dividendTax,

    restrictedTax:
      tax111A +
      tax112 +
      tax112A,

    triggerIncome,
  };
}
// =======================================================
// STEP 7 — 25% SURCHARGE APPLICABILITY
// =======================================================


function is25PercentSurchargeApplicable({
  totalIncome,
  triggerIncome,
}) {
  const income =
    Number(totalIncome) || 0;

  const trigger =
    Number(triggerIncome) || 0;

  if (income < 20000000) {
    return false;
  }

  if (trigger < 20000000) {
    return false;
  }

  return true;
}

// =======================================================
// STEP 8 — INDIVIDUAL MARGINAL RELIEF ENGINE
// INITIAL DATA / RANGE SETUP
// =======================================================

function calculateIndividualMarginalRelief({
  ay,
  regime,
  totalIncome,
  normalTax,
  specialTax,
  manualThresholdPayable = null,
}) {
  const income = Math.max(
    Number(totalIncome) || 0,
    0
  );

  const normalTaxAmount = Math.max(
    Number(normalTax) || 0,
    0
  );

  const {
    normalIncome: otherIncome,
    specialIncome:
      restrictedIncomeAmount,

    taxable111AIncome,
    taxable112Income,
    taxable112AIncome,

    income112A,

    tax111A:
      tax111AAmount,

    tax112:
      tax112Amount,

    tax112A:
      tax112AAmount,

    dividendIncome:
      dividendIncomeAmount,

    dividendTax:
      dividendTaxAmount,

    restrictedTax:
      restrictedTaxPortion,
  } = specialTax;

const dividendSpecialRateSurcharge =
  (
    toNumber(tax111AAmount) +
    toNumber(tax112Amount) +
    toNumber(tax112AAmount) +
    toNumber(dividendTaxAmount)
  ) * 15 / 100;
  // =====================================================
  // INDIVIDUAL RANGE
  // =====================================================

  const range =
    getIndividualRange(
      ay,
      regime,
      income
    );



  // =====================================================
  // NORMAL INCOME RANGE
  // =====================================================

  const normalRange = getIndividualRange(
    ay,
    regime,
    otherIncome
  );
 /* -------------------------------------------------------
     THRESHOLD DATA
  ------------------------------------------------------- */

  const thresholdIncome =
    range.thresholdIncome;

  let thresholdTax =
    range.thresholdTax;

  const previousRate =
    range.previousRate;

  const surchargeRate =
    range.surchargeRate;

  // =====================================================
  // TRIGGER INCOME
  // =====================================================

const triggerIncome =
    income -
    dividendIncomeAmount -
    taxable111AIncome -
    taxable112Income -
    taxable112AIncome;
  // =====================================================
  // 25% SURCHARGE CHECK
  // =====================================================
 const is25Applicable =
    is25PercentSurchargeApplicable({
      totalIncome: income,
      triggerIncome,
    });


  // =====================================================
  // THRESHOLD DATA
  // =====================================================

  const isOneCroreThreshold =
    thresholdIncome === 10000000;

  const isTwoCroreThreshold =
    thresholdIncome === 20000000;

  const isFiveCroreThreshold =
    thresholdIncome === 50000000;

  const shouldAdjustThresholdTax =
    restrictedIncomeAmount > 0 &&
    (
      isOneCroreThreshold ||
      (
        isTwoCroreThreshold &&
        is25Applicable
      ) ||
      (
        isFiveCroreThreshold &&
        regime === "old"
      )
    );


 if (shouldAdjustThresholdTax) {
    const totalSpecialIncome =
      taxable111AIncome +
      taxable112Income +
      income112A +
      (
        isTwoCroreThreshold
          ? dividendIncomeAmount
          : 0
      );

    const totalSpecialTax =
      tax111AAmount +
      tax112Amount +
      tax112AAmount +
      (
        isTwoCroreThreshold
          ? dividendIncomeAmount * 0.30
          : 0
      );

    thresholdTax =
      thresholdTax -
      (
        totalSpecialIncome * 0.30
      ) + 
      totalSpecialTax;
  }


// =======================================================
// THRESHOLD PAYABLE
// =======================================================


  const thresholdPayable =
    manualThresholdPayable !== null &&
    manualThresholdPayable !== undefined &&
    manualThresholdPayable !== ""
      ? Number(manualThresholdPayable)
      : (
          thresholdTax +
          (
            thresholdTax *
            previousRate
          ) / 100
        );

// =======================================================
// STEP 10 — SURCHARGE SPLIT
// =======================================================
  const shouldSplitSurcharge =
    is25Applicable &&
    restrictedIncomeAmount > 0;

  let normalSurchargeRate =
    surchargeRate;

  let restrictedSurchargeRate = 0;

  if (shouldSplitSurcharge) {
    normalSurchargeRate =
      normalRange.surchargeRate;

    restrictedSurchargeRate =
      Math.min(
        surchargeRate,
        15
      );
  }

// =======================================================
// DIVIDEND TAX AT 30%
// =======================================================

  const dividendTaxAt30 =
    dividendIncomeAmount * 0.30;
// =======================================================
// EFFECTIVE NORMAL TAX
// =======================================================

  const effectiveNormalTax =
    Math.max(
      normalTaxAmount -
      dividendTaxAt30 +
      (
        dividendTaxAt30 -
        dividendTaxAmount
      ),
      0
    );

// =======================================================
// EFFECTIVE RESTRICTED TAX
// =======================================================
 const effectiveRestrictedTax =
    tax111AAmount +
    tax112Amount +
    tax112AAmount;
// =======================================================
// TOTAL TAX BEFORE SURCHARGE
// =======================================================

  const totalTax =
    normalTaxAmount +
    effectiveRestrictedTax;

// =======================================================
// STEP 11 — SURCHARGE CALCULATION
// =======================================================

  const normalTaxForSurcharge =
    effectiveNormalTax;

// =======================================================
// FINAL NORMAL SURCHARGE RATE
// =======================================================
 const finalNormalRate =
    income >= 20000000 &&
    !is25Applicable
      ? normalRange.surchargeRate
      : normalSurchargeRate;
// =======================================================
// NORMAL SURCHARGE
// =======================================================

  const normalSurcharge =
    shouldSplitSurcharge
      ? (
          normalTaxForSurcharge *
          finalNormalRate
        ) / 100
      : (
          totalTax *
          finalNormalRate
        ) / 100;
// =======================================================
// RESTRICTED INCOME SURCHARGE
// =======================================================
 const restrictedSurcharge =
    shouldSplitSurcharge
      ? (
          (
            restrictedTaxPortion +
            dividendTaxAmount
          ) *
          restrictedSurchargeRate
        ) / 100
      : 0;

// =======================================================
// SURCHARGE BEFORE MARGINAL RELIEF
// =======================================================
  const surchargeBeforeRelief =
    normalSurcharge +
    restrictedSurcharge;

// =======================================================
// TOTAL TAX INCLUDING SURCHARGE
// =======================================================
  const totalTaxWithSurcharge =
    totalTax +
    surchargeBeforeRelief;
// =======================================================
// MARGINAL RELIEF
// =======================================================
// Income exceeding the applicable threshold

const excessIncome =
    Math.max(
      income -
      thresholdIncome,
      0
    );

  const balanceRemainingIncome =
    excessIncome;
// =======================================================
// TAX ON EXCESS INCOME
// =======================================================
// Marginal relief comparison rate = 30%

  const taxOnExcessIncome =
    (
      excessIncome * 30
    ) / 100;

// =======================================================
// ALLOWABLE NET SURCHARGE
// =======================================================
  const allowableNetSurcharge =
    Math.max(
      excessIncome -
      taxOnExcessIncome,
      0
    );

// =======================================================
// EXCESS TAX PAYABLE
// =======================================================

  const excessTaxPayable =
    Math.max(
      totalTaxWithSurcharge -
      thresholdPayable,
      0
    );

// =======================================================
// STEP 13 — MARGINAL RELIEF
// =======================================================  
const rawMarginalRelief =
    Math.max(
      surchargeBeforeRelief -
      allowableNetSurcharge,
      0
    );

  let marginalRelief = 0;

  if (thresholdIncome === 5000000) {
    marginalRelief =
      Math.min(
        rawMarginalRelief,
        surchargeBeforeRelief
      );
  } else {
    marginalRelief =
      Math.min(
        Math.max(
          excessTaxPayable -
          balanceRemainingIncome,
          0
        ),
        surchargeBeforeRelief
      );
  }

  if (
    thresholdIncome === 20000000 &&
    !is25Applicable
  ) {
    marginalRelief = 0;
  }

  // ======================================================
// OPTION B
// PROPORTIONAL MARGINAL RELIEF SPLIT
// ======================================================

 const normalMarginalRelief =
    shouldSplitSurcharge
      ? (
          surchargeBeforeRelief > 0
            ? marginalRelief *
              (
                normalSurcharge /
                surchargeBeforeRelief
              )
            : 0
        )
      : marginalRelief;

  const restrictedMarginalRelief =
    shouldSplitSurcharge
      ? (
          surchargeBeforeRelief > 0
            ? marginalRelief *
              (
                restrictedSurcharge /
                surchargeBeforeRelief
              )
            : 0
        )
      : 0;

// ======================================================
// FINAL SURCHARGE
// ======================================================


  const finalNormalSurcharge =
    Math.max(
      normalSurcharge -
      normalMarginalRelief,
      0
    );

  const finalRestrictedSurcharge =
    Math.max(
      restrictedSurcharge -
      restrictedMarginalRelief,
      0
    );

  const finalSurcharge =
    finalNormalSurcharge +
    finalRestrictedSurcharge;

// =======================================================
// FINAL TAX
// =======================================================

const taxAfterMarginalRelief =
    totalTax +
    finalSurcharge;

  const cess =
    taxAfterMarginalRelief * 0.04;

  const totalTaxAfterMarginalRelief =
    taxAfterMarginalRelief +
    cess;

  const isRestrictedSurchargeCase =
    restrictedIncomeAmount > 0 &&
    surchargeRate > 15;

  const isMarginalReliefApplicable =
    marginalRelief > 0;

  const displaySurchargeRate =
    shouldSplitSurcharge
      ? `${normalSurchargeRate}% / ${restrictedSurchargeRate}%`
      : `${finalNormalRate}%`;

 return {
    income,

    thresholdIncome,
    thresholdTax,
    thresholdPayable,

     previousSurchargeRate: previousRate,
     previousSurchargeAmount:
    (thresholdTax * previousRate) / 100,
    surchargeRate,

    otherIncome,
    restrictedIncomeAmount,

    taxable111AIncome,
    taxable112Income,
    taxable112AIncome,

    tax111AAmount,
    tax112Amount,
    tax112AAmount,

    dividendIncomeAmount,
    dividendTaxAmount,
   
 
 
 
    normalTax: Math.max(
  normalTaxAmount - dividendTaxAmount,
  0
),

    restrictedTaxPortion:
      restrictedTaxPortion,

    totalTax,

    triggerIncome,

    is25Applicable,

    shouldSplitSurcharge,

    normalSurchargeRate,
    restrictedSurchargeRate,

    finalNormalRate,
    displaySurchargeRate,
  dividendSpecialRateSurcharge,
    normalSurcharge,
    restrictedSurcharge,

    surchargeBeforeRelief,

    totalTaxWithSurcharge,

    excessIncome,
    balanceRemainingIncome,

    taxOnExcessIncome,
    allowableNetSurcharge,

    excessTaxPayable,

    rawMarginalRelief,
    marginalRelief,

    normalMarginalRelief,
    restrictedMarginalRelief,

    finalNormalSurcharge,
    finalRestrictedSurcharge,

    finalSurcharge,

    cess,

    totalTaxAfterMarginalRelief,

    isRestrictedSurchargeCase,
    isMarginalReliefApplicable,
  };
}

export default function SurchargeMarginalReliefIndividual() {
  const navigate = useNavigate();

  // =======================================================
  // INDIVIDUAL PAGE STATE
  // =======================================================

  const [assessmentYear, setAssessmentYear] =
    useState("");

  const [regime, setRegime] =
    useState("new");

  const [totalIncome, setTotalIncome] =
    useState("");

  const [normalTax, setNormalTax] =
    useState("");

  const [income111A, setIncome111A] =
    useState("");

  const [income112, setIncome112] =
    useState("");

  const [income112A, setIncome112A] =
    useState("");

  const [dividendIncome, setDividendIncome] =
    useState("");

  const [
    manualThresholdPayable,
    setManualThresholdPayable,
  ] = useState("");

  const [
    useManualThresholdPayable,
    setUseManualThresholdPayable,
  ] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  useEffect(() => {
    const loadingId = window.setTimeout(() => setPageLoading(false), 550);
    return () => window.clearTimeout(loadingId);
  }, []);



    // =======================================================
  // SPECIAL RATE TAX CALCULATION
  // =======================================================

   const specialTax = useMemo(
    () =>
      calculateSpecialRateTaxes({
        ay: assessmentYear,
        totalIncome,
        normalTax,
        income111A,
        income112,
        income112A,
        dividendIncome,
      }),
    [
      assessmentYear,
      totalIncome,
      normalTax,
      income111A,
      income112,
      income112A,
      dividendIncome,
    ]
  );
  // =======================================================
// INDIVIDUAL RANGE DATA
// =======================================================

const individualRange = useMemo(
    () =>
      getIndividualRange(
        assessmentYear,
        regime,
        totalIncome
      ),
    [
      assessmentYear,
      regime,
      totalIncome,
    ]
  );


const surchargeRate =
    individualRange.surchargeRate;

  const thresholdPreviousSurchargeRate =
    individualRange.previousRate;

  const thresholdTax =
    individualRange.thresholdTax;

  const thresholdIncome =
    individualRange.thresholdIncome;

  const thresholdPayable =
    useManualThresholdPayable &&
    manualThresholdPayable !== ""
      ? toNumber(manualThresholdPayable)
      : individualRange.thresholdPayable;

  // =======================================================
// INDIVIDUAL — SURCHARGE RATE BASED ON ENTERED INCOME
// =======================================================

 const enteredTotalIncome =
    toNumber(totalIncome);

  const showDividendIncome =
  enteredTotalIncome > 20000000;

  const totalIncomeBasedSurchargeRate =
    enteredTotalIncome > 0
      ? getSurchargeRateForIncome({
          ay: assessmentYear,
          regime,
          income: enteredTotalIncome,
        })
      : surchargeRate;

  const shouldShowRestrictedIncomeField =
    totalIncomeBasedSurchargeRate > 15 ||
    surchargeRate > 15;  
  // =======================================================
  // MAIN INDIVIDUAL CALCULATION
  // =======================================================

   const calculation = useMemo(
    () =>
      calculateIndividualMarginalRelief({
        ay: assessmentYear,
        regime,
        totalIncome,
        normalTax,
        specialTax,
        manualThresholdPayable:
          useManualThresholdPayable
            ? manualThresholdPayable
            : null,
      }),
    [
      assessmentYear,
      regime,
      totalIncome,
      normalTax,
      specialTax,
      manualThresholdPayable,
      useManualThresholdPayable,
    ]
  );
  // =======================================================
  // RESET CALCULATOR
  // =======================================================

  const resetCalculator = () => {
    setAssessmentYear("");
    setRegime("new");

    setTotalIncome("");
    setNormalTax("");

    setIncome111A("");
    setIncome112("");
    setIncome112A("");
    setDividendIncome("");

    setManualThresholdPayable("");
    setUseManualThresholdPayable(false);
  };


  // =======================================================
  // CALCULATOR STATUS
  // =======================================================

 const canCalculate =
    Boolean(
      assessmentYear &&
      totalIncome &&
      normalTax
    );
 const displayThresholdIncome =
    thresholdIncome ||
    individualRange.thresholdIncome ||
    0;

  const displayThresholdTax =
    calculation.thresholdTax ||
    thresholdTax ||
    0;

  const displayThresholdPayable =
    calculation.thresholdPayable ||
    thresholdPayable ||
    0;

  const displaySurchargeBeforeRelief =
    calculation.surchargeBeforeRelief ||
    0;

  const displayTotalTaxWithSurcharge =
    calculation.totalTaxWithSurcharge ||
    0;

  const displayMarginalRelief =
    calculation.marginalRelief ||
    0;

  const displayFinalSurcharge =
    calculation.finalSurcharge ||
    0;

  const displayTotalTaxAfterMR =
    calculation.totalTaxAfterMarginalRelief ||
    0;

  const displayExcessTaxPayable =
    calculation.excessTaxPayable ||
    0;

  const displayBalanceRemainingIncome =
    calculation.balanceRemainingIncome ||
    0;

  const normalTaxPortion =
    calculation.normalTax || 0;

  const restrictedTaxPortion =
    calculation.restrictedTaxPortion || 0


 const downloadReport = () => {
    const report = `
INCOME TAX PORTAL
SURCHARGE & MARGINAL RELIEF — INDIVIDUAL

Assessment Year:
${assessmentYear || "-"}

Regime:
${
  regime === "old"
    ? "Old Regime / Old Slab"
    : "New Regime / New Slab"
}

Total Income:
${formatINR(totalIncome)}

Normal Tax:
${formatINR(normalTax)}

Section 111A:
${formatINR(income111A)}

Section 112:
${formatINR(income112)}

Section 112A:
${formatINR(income112A)}

Dividend Income:
${formatINR(dividendIncome)}

Threshold Income:
${formatINR(displayThresholdIncome)}

Tax on Threshold Income:
${formatINR(displayThresholdTax)}

Previous Slab Surcharge:
${calculation.previousRate || thresholdPreviousSurchargeRate}%

Threshold Tax Payable:
${formatINR(displayThresholdPayable)}

Surcharge Before Marginal Relief:
${formatINR(displaySurchargeBeforeRelief)}

Total Tax With Surcharge:
${formatINR(displayTotalTaxWithSurcharge)}

Excess Tax Payable:
${formatINR(displayExcessTaxPayable)}

Balance Remaining Income:
${formatINR(displayBalanceRemainingIncome)}

Marginal Relief:
${formatINR(displayMarginalRelief)}

Final Surcharge:
${formatINR(displayFinalSurcharge)}

Cess:
${formatINR(calculation.cess || 0)}

Total Tax After Marginal Relief:
${formatINR(displayTotalTaxAfterMR)}
`;

    const blob = new Blob(
      [report],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Surcharge-Marginal-Relief-Individual.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="smr-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .smr-page {
          min-height: 100vh;
          background:
            linear-gradient(
              135deg,
              #E3FDFD 0%,
              #CBF1F5 55%,
              #E3FDFD 100%
            );
          color: #173B3E;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .smr-topbar {
          height: 48px;
          background: #CBF1F5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          font-size: 13px;
          font-weight: 700;
        }

        .smr-main-header {
          min-height: 100px;
          background: #FFFFFF;
          color: #E3FDFD;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          gap: 30px;
        }

        .smr-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .smr-brand-logo {
          width: 62px;
          height: 62px;
          border-radius: 20px;
          background: linear-gradient(
            145deg,
            #A6E3E9,
            #71C9CE
          );
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 900;
          flex-shrink: 0;
        }

        .smr-brand-title {
          font-size: 27px;
          font-weight: 900;
          line-height: 1;
        }

        .smr-brand-subtitle {
          margin-top: 6px;
          color: #52777A;
          font-size: 14px;
        }

        .smr-nav {
          display: flex;
          align-items: center;
          gap: 42px;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
        }

        .smr-nav button {
          border: 0;
          background: transparent;
          color: #CBF1F5;
          cursor: pointer;
          font-weight: 800;
          font-size: 14px;
        }

        .smr-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 28px 70px;
        }

        .smr-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 2fr)
            minmax(350px, 1fr);
          gap: 22px;
          align-items: start;
        }

        .smr-left {
          min-width: 0;
        }

        .smr-right {
          position: sticky;
          top: 18px;
          min-width: 0;
        }

        .smr-card {
          background:
            linear-gradient(
              180deg,
              rgba(16, 29, 51, 0.98),
              rgba(10, 21, 38, 0.98)
            );
          border: 1px solid #CBF1F5;
          border-radius: 22px;
          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.22);
        }

        .smr-input-card {
          padding: 24px;
        }

        .smr-top-selection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .smr-field label {
          display: block;
          margin-bottom: 8px;
          color: #e4e9f2;
          font-size: 13px;
          font-weight: 800;
        }

        .smr-select,
        .smr-input {
          width: 100%;
          height: 46px;
          border-radius: 14px;
          border: 1px solid #273b5c;
          background: #E3FDFD;
          color: #FFFFFF;
          padding: 0 15px;
          outline: none;
          font-size: 14px;
          font-weight: 650;
        }

        .smr-select:focus,
        .smr-input:focus {
          border-color: #71C9CE;
          box-shadow:
            0 0 0 3px rgba(34, 137, 230, 0.13);
        }

        .smr-regimes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }

        .smr-regime-btn {
          height: 48px;
          border-radius: 15px;
          border: 1px solid #A6E3E9;
          background: #CBF1F5;
          color: #52777A;
          font-size: 14px;
          font-weight: 850;
          cursor: pointer;
        }

        .smr-regime-btn.active {
          background:
            linear-gradient(
              90deg,
              #71C9CE,
              #71C9CE
            );
          border-color: #71C9CE;
          color: white;
          box-shadow:
            0 8px 22px rgba(21, 122, 231, 0.22);
        }

        .smr-section-title {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin: 22px 0 18px;
        }

        .smr-step {
          width: 35px;
          height: 35px;
          border-radius: 11px;
          background:
            linear-gradient(
              135deg,
              #71C9CE,
              #71C9CE
            );
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          flex-shrink: 0;
          box-shadow:
            0 7px 20px rgba(21, 125, 239, 0.25);
        }

        .smr-section-title h2 {
          margin: 1px 0 3px;
          font-size: 20px;
          font-weight: 900;
        }

        .smr-section-title p {
          margin: 0;
          color: #52777A;
          font-size: 12px;
          line-height: 1.5;
        }

        .smr-income-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 18px;
        }

        .smr-special-card {
          border: 1px solid #A6E3E9;
          border-radius: 15px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .smr-special-head {
          display: grid;
          grid-template-columns: 1fr 130px 100px;
          padding: 14px 16px;
          background: #CBF1F5;
          border-bottom: 1px solid #A6E3E9;
          color: #173B3E;
          font-size: 12px;
          font-weight: 850;
        }

        .smr-special-row {
          display: grid;
          grid-template-columns: 1fr 130px 100px;
          align-items: center;
          min-height: 58px;
          padding: 8px 16px;
          border-bottom: 1px solid #CBF1F5;
        }

        .smr-special-row:last-child {
          border-bottom: 0;
        }

        .smr-special-name {
          font-size: 13px;
          font-weight: 800;
        }

        .smr-special-description {
          margin-top: 3px;
          color: #52777A;
          font-size: 10px;
        }

        .smr-special-input {
          width: 130px;
          height: 37px;
          border-radius: 8px;
          border: 1px solid #A6E3E9;
          background: #FFFFFF;
          color: white;
          text-align: right;
          padding: 0 10px;
          outline: none;
        }

        .smr-special-tax {
          text-align: right;
          font-size: 13px;
          font-weight: 850;
        }

        .smr-special-total {
          display: flex;
          justify-content: space-between;
          padding: 14px 16px;
          background: #E3FDFD;
          font-size: 12px;
          font-weight: 800;
          color: #52777A;
        }

        .smr-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin: 18px 0 26px;
        }

        .smr-summary-card {
          min-height: 96px;
          border-radius: 18px;
          border: 1px solid #A6E3E9;
          background: #FFFFFF;
          padding: 16px;
        }

        .smr-summary-label {
          color: #52777A;
          font-size: 11px;
          font-weight: 800;
          line-height: 1.35;
        }

        .smr-summary-value {
          margin-top: 10px;
          font-size: 18px;
          font-weight: 900;
        }

        .smr-threshold-card {
          border: 1px solid #A6E3E9;
          border-radius: 20px;
          background: #FFFFFF;
          padding: 16px 18px;
        }

        .smr-threshold-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 54px;
          border-bottom: 1px solid #CBF1F5;
          gap: 20px;
        }

        .smr-threshold-row:last-of-type {
          border-bottom: 0;
        }

        .smr-threshold-label {
          color: #52777A;
          font-size: 13px;
          font-weight: 800;
        }

        .smr-threshold-value {
          font-size: 15px;
          font-weight: 900;
          text-align: right;
        }

        .smr-threshold-highlight {
          margin-top: 6px;
          min-height: 55px;
          border-radius: 14px;
          border: 1px solid #71C9CE;
          background: #CBF1F5;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .smr-checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          color: #52777A;
          font-size: 12px;
          font-weight: 700;
        }

        .smr-checkbox-row input {
          accent-color: #71C9CE;
        }

        .smr-manual-input {
          margin-top: 12px;
        }

        .smr-result-card {
          padding: 18px;
        }

        .smr-result-header {
          border-radius: 17px;
          background: #CBF1F5;
          border: 1px solid #71C9CE;
          padding: 16px;
          margin-bottom: 12px;
        }

        .smr-result-header small {
          color: #52777A;
          font-size: 11px;
          font-weight: 850;
        }

        .smr-result-header h2 {
          margin: 5px 0 0;
          font-size: 17px;
          font-weight: 900;
        }

        .smr-result-item {
          min-height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 0 15px;
          margin-bottom: 10px;
          border-radius: 16px;
          background: #FFFFFF;
          border: 1px solid #A6E3E9;
        }

        .smr-result-item.highlight {
          background: #CBF1F5;
          border-color: #71C9CE;
        }

        .smr-result-label {
          color: #52777A;
          font-size: 12px;
          font-weight: 850;
        }

        .smr-result-value {
          font-size: 14px;
          font-weight: 900;
          text-align: right;
        }

        .smr-result-heading {
          margin: 18px 0 9px;
          color: #71C9CE;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.2px;
        }

        .smr-mmr-card {
          min-height: 70px;
          border-radius: 17px;
          border: 1px solid #A6E3E9;
          background: #CBF1F5;
          padding: 0 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 14px;
        }

        .smr-mmr-card strong {
          font-size: 15px;
        }

        .smr-mmr-card span {
          font-size: 17px;
          font-weight: 900;
        }

        .smr-net-card {
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              #71C9CE,
              #71C9CE
            );
          padding: 20px;
          margin-bottom: 16px;
          box-shadow:
            0 15px 30px rgba(9, 118, 223, 0.18);
        }

        .smr-net-card small {
          display: block;
          font-size: 12px;
          font-weight: 850;
        }

        .smr-net-value {
          margin: 8px 0 10px;
          font-size: 31px;
          font-weight: 950;
        }

        .smr-net-formula {
          color: rgba(255,255,255,0.88);
          font-size: 11px;
          line-height: 1.45;
        }

        .smr-formula-card {
          border: 1px solid #A6E3E9;
          background: #FFFFFF;
          border-radius: 18px;
          padding: 16px;
          margin-bottom: 18px;
        }

        .smr-formula-card h3 {
          margin: 0 0 8px;
          font-size: 13px;
        }

        .smr-formula-card p {
          margin: 0;
          color: #52777A;
          font-size: 11px;
          line-height: 1.65;
        }

        .smr-message {
          margin: 8px 0 18px;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
        }

        .smr-actions {
          display: grid;
          gap: 10px;
        }

        .smr-action-btn {
          min-height: 46px;
          border-radius: 14px;
          border: 1px solid #A6E3E9;
          background: #CBF1F5;
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 900;
        }

        .smr-action-btn.primary {
          background:
            linear-gradient(
              90deg,
              #71C9CE,
              #71C9CE
            );
          border-color: #71C9CE;
        }

        .smr-action-btn:disabled {
          opacity: 0.48;
          cursor: not-allowed;
        }

        .smr-footer {
          min-height: 120px;
          background: #CBF1F5;
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          color: white;
        }

        .smr-footer h3 {
          margin: 0;
          font-size: 15px;
        }

        @media (max-width: 1000px) {
          .smr-grid {
            grid-template-columns: 1fr;
          }

          .smr-right {
            position: static;
          }

          .smr-nav {
            gap: 18px;
          }
        }

        @media (max-width: 720px) {
          .smr-main-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .smr-nav {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 5px;
          }

          .smr-top-selection,
          .smr-income-grid,
          .smr-regimes {
            grid-template-columns: 1fr;
          }

          .smr-summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .smr-special-head,
          .smr-special-row {
            grid-template-columns:
              1fr 100px 70px;
          }

          .smr-special-input {
            width: 100px;
          }

          .smr-content {
            padding: 18px 12px 40px;
          }
        }

        @media (max-width: 480px) {
          .smr-summary-grid {
            grid-template-columns: 1fr;
          }

          .smr-brand-title {
            font-size: 22px;
          }
        }
      
        /* Exact Color Hunt palette overrides */
        .smr-page { background:linear-gradient(135deg,#E3FDFD 0%,#F7FFFF 52%,#CBF1F5 100%) !important; color:#173B3E !important; }
        .smr-page .smr-topbar,.smr-page .smr-footer { background:#CBF1F5 !important; color:#173B3E !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-main-header { background:#E3FDFD !important; color:#173B3E !important; }
        .smr-page .smr-brand-logo,.smr-page .smr-step { background:#A6E3E9 !important; color:#173B3E !important; }
        .smr-page .smr-card,.smr-page .smr-special-card,.smr-page .smr-threshold-card,.smr-page .smr-formula-card { background:#FFFFFF !important; color:#173B3E !important; border-color:#A6E3E9 !important; box-shadow:0 12px 30px rgba(49,95,99,.07) !important; }
        .smr-page .smr-field label,.smr-page .smr-section-title h2,.smr-page .smr-special-name,.smr-page .smr-result-header h2 { color:#173B3E !important; }
        .smr-page .smr-brand-subtitle,.smr-page .smr-section-title p,.smr-page .smr-special-description,.smr-page .smr-result-label,.smr-page .smr-threshold-label,.smr-page .smr-formula-card p { color:#52777A !important; }
        .smr-page .smr-select,.smr-page .smr-input,.smr-page .smr-special-input { background:#FFFFFF !important; color:#173B3E !important; border:1px solid #A6E3E9 !important; }
        .smr-page .smr-select:focus,.smr-page .smr-input:focus,.smr-page .smr-special-input:focus { border-color:#71C9CE !important; box-shadow:0 0 0 3px rgba(113,201,206,.18) !important; }
        .smr-page .smr-regime-btn,.smr-page .smr-action-btn { background:#FFFFFF !important; color:#315F63 !important; border:1px solid #A6E3E9 !important; }
        .smr-page .smr-regime-btn.active,.smr-page .smr-action-btn.primary { background:#CBF1F5 !important; color:#173B3E !important; border-color:#71C9CE !important; }
        .smr-page .smr-special-head { background:#CBF1F5 !important; color:#173B3E !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-special-row,.smr-page .smr-result-item { background:#FFFFFF !important; color:#173B3E !important; border-color:#CBF1F5 !important; }
        .smr-page .smr-summary-card,.smr-page .smr-threshold-highlight,.smr-page .smr-mmr-card { background:#E3FDFD !important; color:#173B3E !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-result-header,.smr-page .smr-special-total { background:#CBF1F5 !important; color:#173B3E !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-net-card { background:linear-gradient(135deg,#CBF1F5,#E3FDFD) !important; color:#173B3E !important; border:1px solid #A6E3E9 !important; box-shadow:none !important; }
        .smr-page .smr-net-card *,.smr-page .smr-net-value,.smr-page .smr-net-formula { color:#173B3E !important; }
        .smr-page .smr-special-tax,.smr-page .smr-summary-value,.smr-page .smr-result-heading { color:#238F98 !important; }
        .smr-page .smr-mui-select .MuiOutlinedInput-root { background:#FFFFFF !important; color:#173B3E !important; border-radius:14px; }
        .smr-page .smr-mui-select .MuiOutlinedInput-notchedOutline { border-color:#A6E3E9 !important; }
        .smr-page .smr-mui-select .MuiSvgIcon-root { color:#238F98 !important; }
        .smr-select-menu { background:#FFFFFF !important; color:#173B3E !important; border:1px solid #A6E3E9 !important; }
        .smr-select-menu .MuiMenuItem-root { color:#173B3E !important; }
        .smr-select-menu .MuiMenuItem-root:hover { background:#E3FDFD !important; }
        .smr-select-menu .MuiMenuItem-root.Mui-selected { background:#CBF1F5 !important; }
        .smr-page .MuiSkeleton-root { background-color:#D7F2F3 !important; }
        .smr-page .MuiSkeleton-wave::after { background:linear-gradient(90deg,transparent,rgba(113,201,206,.25),transparent) !important; }
        .smr-page input[type=number] { color:#173B3E !important; background:#FFFFFF !important; }
        .smr-page input[type=number]::placeholder { color:#8AAEB0 !important; opacity:1; }
        .smr-page button[style*="#E3FDFD"] { background:#FFFFFF !important; color:#238F98 !important; border-color:#71C9CE !important; }

        
        /* Exact Color Hunt palette */
        .smr-page .smr-threshold-card, .smr-page .smr-threshold-card * { color:#173B3E !important; }
        .smr-page .smr-threshold-card { background:#E3FDFD !important; border:1px solid #A6E3E9 !important; box-shadow:0 10px 26px rgba(49,95,99,.08) !important; }
        .smr-page .smr-threshold-card [style*="background"] { background:#CBF1F5 !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-number-input { color:#173B3E !important; -webkit-text-fill-color:#173B3E !important; caret-color:#238F98 !important; }
        .smr-page .smr-number-group { background:#FFFFFF !important; }
        .smr-page .smr-number-step { background:#E3FDFD !important; color:#238F98 !important; }
        .smr-page .smr-number-step:hover { background:#CBF1F5 !important; }
        .smr-page .smr-input, .smr-page .smr-special-input { background:#FFFFFF !important; color:#173B3E !important; }
        .smr-page .smr-special-card, .smr-page .smr-special-card * { color:#173B3E !important; }
        .smr-page .smr-special-head, .smr-page .smr-special-total { background:#CBF1F5 !important; color:#173B3E !important; }
        .smr-page .smr-special-row { background:#FFFFFF !important; border-color:#A6E3E9 !important; }
        .smr-page .smr-threshold-card strong, .smr-page .smr-threshold-card b { color:#238F98 !important; }

        .smr-page{background:linear-gradient(135deg,#E3FDFD 0%,#F7FFFF 52%,#CBF1F5 100%)!important;color:#173B3E!important}
        .smr-page .smr-topbar,.smr-page .smr-footer{background:#CBF1F5!important;color:#173B3E!important;border-color:#A6E3E9!important}
        .smr-page .smr-main-header,.smr-page .smr-hero{background:#E3FDFD!important;color:#173B3E!important;border-color:#A6E3E9!important}
        .smr-page .smr-brand-logo,.smr-page .smr-step{background:#A6E3E9!important;color:#173B3E!important;box-shadow:none!important}
        .smr-page .smr-card,.smr-page .smr-input-card,.smr-page .smr-special-card,.smr-page .smr-threshold-card,.smr-page .smr-formula-card,.smr-page .smr-section-card,.smr-page .smr-result-card{background:#FFFFFF!important;color:#173B3E!important;border:1px solid #A6E3E9!important;box-shadow:0 12px 30px rgba(49,95,99,.07)!important}
        .smr-page .smr-field label,.smr-page .smr-section-title h2,.smr-page .smr-special-name,.smr-page .smr-result-header h2,.smr-page .smr-summary-label,.smr-page .smr-threshold-title{color:#173B3E!important}
        .smr-page .smr-brand-subtitle,.smr-page .smr-section-title p,.smr-page .smr-special-description,.smr-page .smr-result-label,.smr-page .smr-threshold-label,.smr-page .smr-formula-card p,.smr-page .smr-result-item{color:#52777A!important}
        .smr-page .smr-select,.smr-page .smr-input{background:#FFFFFF!important;color:#173B3E!important;border:1px solid #A6E3E9!important}
        .smr-page .smr-regime-btn,.smr-page .smr-action-btn{background:#FFFFFF!important;color:#315F63!important;border:1px solid #A6E3E9!important}
        .smr-page .smr-regime-btn.active,.smr-page .smr-action-btn.primary{background:#CBF1F5!important;color:#173B3E!important;border-color:#71C9CE!important}
        .smr-page .smr-special-head,.smr-page .smr-special-total,.smr-page .smr-result-header{background:#CBF1F5!important;color:#173B3E!important;border-color:#A6E3E9!important}
        .smr-page .smr-special-row,.smr-page .smr-result-item{background:#FFFFFF!important;color:#173B3E!important;border-color:#CBF1F5!important}
        .smr-page .smr-summary-card,.smr-page .smr-threshold-highlight,.smr-page .smr-mmr-card,.smr-page .smr-net-card{background:#E3FDFD!important;color:#173B3E!important;border:1px solid #A6E3E9!important;box-shadow:none!important}
        .smr-page .smr-net-card *,.smr-page .smr-net-value,.smr-page .smr-net-formula,.smr-page .smr-summary-value,.smr-page .smr-special-tax{color:#238F98!important}
        .smr-page .smr-mui-select .MuiOutlinedInput-root{background:#FFFFFF!important;color:#173B3E!important;border-radius:14px}
        .smr-page .smr-mui-select .MuiOutlinedInput-notchedOutline{border-color:#A6E3E9!important}
        .smr-page .smr-mui-select .MuiSvgIcon-root{color:#238F98!important}
        .smr-select-menu{background:#FFFFFF!important;color:#173B3E!important;border:1px solid #A6E3E9!important}
        .smr-select-menu .MuiMenuItem-root{color:#173B3E!important}.smr-select-menu .MuiMenuItem-root:hover{background:#E3FDFD!important}.smr-select-menu .MuiMenuItem-root.Mui-selected{background:#CBF1F5!important}
        .smr-page .MuiSkeleton-root{background-color:#D7F2F3!important}.smr-page .MuiSkeleton-wave:after{background:linear-gradient(90deg,transparent,rgba(113,201,206,.25),transparent)!important}

        /* NumberField: one clean outer control only; no nested legacy input border */
        .smr-page .smr-number-field,.smr-page .smr-special-number-field {
          display:block!important;width:100%!important;min-width:0!important;
          padding:0!important;margin:0!important;border:0!important;
          border-radius:0!important;background:transparent!important;
          box-shadow:none!important;outline:0!important;
        }
        .smr-page .smr-number-group {
          box-sizing:border-box!important;width:100%!important;min-width:0!important;
          border:1.5px solid #A6E3E9!important;border-radius:15px!important;
          background:#FFFFFF!important;box-shadow:none!important;
        }
        .smr-page .smr-number-group:focus-within {
          border-color:#71C9CE!important;box-shadow:0 0 0 3px rgba(113,201,206,.18)!important;
        }
        .smr-page .smr-number-input {
          color:#173B3E!important;background:transparent!important;
          -webkit-text-fill-color:#173B3E!important;opacity:1!important;
          font-family:inherit!important;font-weight:600!important;
        }
        .smr-page .smr-number-input::placeholder {
          color:#789A9D!important;-webkit-text-fill-color:#789A9D!important;opacity:1!important;
        }
        .smr-page .smr-number-currency{color:#238F98!important}
        .smr-page .smr-number-steppers,.smr-page .smr-number-step {
          background:#E3FDFD!important;color:#238F98!important;
        }
        .smr-page .smr-number-step:hover{background:#CBF1F5!important}

        /* Proper Base UI NumberField controls, styled to match MUI's documented pattern */
        .smr-page .smr-number-field{width:100%;min-width:0}
        .smr-page .smr-number-group{display:flex;align-items:center;width:100%;min-height:58px;gap:10px;padding:5px 7px 5px 15px;border:1px solid #A6E3E9;border-radius:15px;background:#FFFFFF;transition:border-color .18s,box-shadow .18s}
        .smr-page .smr-number-group:focus-within{border-color:#71C9CE;box-shadow:0 0 0 3px rgba(113,201,206,.18)}
        .smr-page .smr-number-currency{flex:0 0 auto;color:#238F98;font-weight:800;font-size:16px}
        .smr-page .smr-number-input{display:block;flex:1 1 auto;width:100%;min-width:0;height:44px;padding:0 4px;border:0!important;outline:0!important;box-shadow:none!important;background:transparent!important;color:#173B3E!important;font:600 15px/1.4 inherit;text-align:left}
        .smr-page .smr-number-input::placeholder{color:#8AAEB0!important;opacity:1}
        .smr-page .smr-number-steppers{display:flex;flex-direction:column;flex:0 0 38px;align-self:stretch;overflow:hidden;border-radius:10px;background:#E3FDFD}
        .smr-page .smr-number-step{display:flex;flex:1 1 50%;align-items:center;justify-content:center;min-height:20px;border:0;background:#E3FDFD;color:#238F98;font-size:18px;font-weight:900;line-height:1;cursor:pointer}
        .smr-page .smr-number-step:hover{background:#CBF1F5}.smr-page .smr-number-step:disabled{opacity:.4;cursor:not-allowed}
        .smr-page .smr-special-number-field{width:100%;min-width:0}.smr-page .smr-special-number-field .smr-number-group{min-height:44px;border-radius:11px;padding:3px 6px 3px 10px;gap:7px}.smr-page .smr-special-number-field .smr-number-input{height:34px;font-size:14px;text-align:right}.smr-page .smr-special-number-field .smr-number-currency{font-size:13px}.smr-page .smr-special-number-field .smr-number-steppers{flex-basis:30px;border-radius:8px}.smr-page .smr-special-number-field .smr-number-step{font-size:15px}.smr-page .smr-manual-number .smr-number-group{min-height:58px}
`}</style>



      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="smr-content">
        {pageLoading ? (
          <div className="smr-grid" aria-label="Loading calculator">
            <section className="smr-left"><div className="smr-card smr-input-card">
              <Skeleton variant="rounded" height={54} sx={{ mb: 2, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={46} sx={{ mb: 3, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={42} sx={{ mb: 2, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={150} sx={{ mb: 2, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={110} sx={{ bgcolor: "#D7F2F3" }} />
            </div></section>
            <aside className="smr-right"><div className="smr-card smr-result-card">
              <Skeleton variant="rounded" height={82} sx={{ mb: 2, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={54} sx={{ mb: 1, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={54} sx={{ mb: 1, bgcolor: "#D7F2F3" }} />
              <Skeleton variant="rounded" height={54} sx={{ bgcolor: "#D7F2F3" }} />
            </div></aside>
          </div>
        ) : (
          <>
             {/* =====================================================
    BACK BUTTON
===================================================== */}

<button
  type="button"
  onClick={() =>
    navigate(
      "/SurchargeMarginalReliefCalculatorStatusWise"
    )
  }
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #71C9CE",
    background: "#FFFFFF",
    color: "#238F98",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "22px",
  }}
>
  ← Back
</button>
        <div className="smr-grid">

          

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <section className="smr-left">

            <div className="smr-card smr-input-card">

              {/* ---------------------------------------------
                  YEAR / STATUS
              --------------------------------------------- */}

              <div className="smr-top-selection">

                <div className="smr-field">
                  <label>
                    Assessment Year
                  </label>

                  <TextField select fullWidth size="medium" value={assessmentYear}
                    onChange={(e) => setAssessmentYear(e.target.value)}
                    className="smr-mui-select"
                    SelectProps={{ MenuProps: { PaperProps: { className: "smr-select-menu" } } }}>
                    {YEAR_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="smr-field">
                  <label>
                    Status
                  </label>

                  <TextField select fullWidth size="medium" value="individual" disabled
                    className="smr-mui-select"
                    SelectProps={{ MenuProps: { PaperProps: { className: "smr-select-menu" } } }}>
                    <MenuItem value="individual">Individual / HUF / AOP / BOI / Artificial Juridical Person</MenuItem>
                  </TextField>
                </div>

              </div>

              {/* ---------------------------------------------
                  REGIME
              --------------------------------------------- */}

              <div className="smr-regimes">

                {REGIME_OPTIONS.map(
                  (option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={
                        "smr-regime-btn " +
                        (
                          regime ===
                          option.value
                            ? "active"
                            : ""
                        )
                      }
                      onClick={() =>
                        setRegime(
                          option.value
                        )
                      }
                    >
                      {option.label}
                    </button>
                  )
                )}

              </div>

              {/* =================================================
                  STEP 2
              ================================================= */}

              <div className="smr-section-title">

                <div className="smr-step">
                  2
                </div>

                <div>
                  <h2>
                    Computation of Total Income
                  </h2>

                  <p>
                    Total income aur normal tax manually enter karega.
                  </p>
                </div>

              </div>

              {/* ---------------------------------------------
                  TOTAL INCOME / NORMAL TAX
              --------------------------------------------- */}

              <div className="smr-income-grid">

                <div className="smr-field">
                  <label>
                    Total Income
                  </label>

                  <SMRNumberField className="smr-number-field" value={totalIncome} onChange={setTotalIncome} placeholder="Example: 2,00,50,000" ariaLabel="Example: 2,00,50,000" />
                </div>

                <div className="smr-field">
                  <label>
                    Normal Tax (Excluding Special Rate Income Tax)
                  </label>

                  <SMRNumberField className="smr-number-field" value={normalTax} onChange={setNormalTax} placeholder="Enter normal tax" ariaLabel="Enter normal tax" />
                </div>

              </div>

              {/* =================================================
                  SPECIAL RATE TABLE
              ================================================= */}

              <div className="smr-special-card">

                <div className="smr-special-head">
                  <span>
                    Special Rate Income
                  </span>

                  <span>
                    Income
                  </span>

                  <span>
                    Tax
                  </span>
                </div>

                {/* 111A */}

                <div className="smr-special-row">

                  <div>
                    <div className="smr-special-name">
                      Section 111A
                    </div>

                    <div className="smr-special-description">
                      Short-Term Capital Gain
                    </div>
                  </div>

                  <SMRNumberField className="smr-number-field smr-special-number-field" value={income111A} onChange={setIncome111A} placeholder="0" ariaLabel="0" />

                  <div className="smr-special-tax">
                    {formatINR(
                      specialTax.tax111A
                    )}
                  </div>

                </div>

                {/* 112 */}

                <div className="smr-special-row">

                  <div>
                    <div className="smr-special-name">
                      Section 112
                    </div>

                    <div className="smr-special-description">
                      Long-Term Capital Gain
                    </div>
                  </div>

                  <SMRNumberField className="smr-number-field smr-special-number-field" value={income112} onChange={setIncome112} placeholder="0" ariaLabel="0" />

                  <div className="smr-special-tax">
                    {formatINR(
                      specialTax.tax112
                    )}
                  </div>

                </div>

                {/* 112A */}

                <div className="smr-special-row">

                  <div>
                    <div className="smr-special-name">
                      Section 112A
                    </div>

                    <div className="smr-special-description">
                      Eligible LTCG
                    </div>
                  </div>

                  <SMRNumberField className="smr-number-field smr-special-number-field" value={income112A} onChange={setIncome112A} placeholder="0" ariaLabel="0" />

                  <div className="smr-special-tax">
                    {formatINR(
                      specialTax.tax112A
                    )}
                  </div>

                </div>

                {/* DIVIDEND */}

               {toNumber(totalIncome) > 20000000 && (
  <div className="smr-special-row">

    <div>
      <div className="smr-special-name">
        Dividend Income
      </div>

      <div className="smr-special-description">
        Dividend / Other special-rate income
      </div>
    </div>

    <SMRNumberField className="smr-number-field smr-special-number-field" value={dividendIncome} onChange={setDividendIncome} placeholder="0" ariaLabel="0" />

    <div className="smr-special-tax">
      {formatINR(
        specialTax.dividendTax
      )}
    </div>

  </div>
)}

                <div className="smr-special-total">

                  <span>
                    Total Tax Before Surcharge Exclude dividend
                  </span>

                  <strong>
                    {formatINR(
                      (
                        toNumber(normalTax) +
                        specialTax.restrictedTax
                      )
                    )}
                  </strong>

                </div>

              </div>

              {/* =================================================
                  SUMMARY CARDS
              ================================================= */}

              <div className="smr-summary-grid">

                <div className="smr-summary-card">
                  <div className="smr-summary-label">
                    Normal / Other Tax Portion
                  </div>

                  <div className="smr-summary-value">
                    {formatINR(
                      normalTaxPortion
                    )}
                  </div>
                </div>

                <div className="smr-summary-card">
                  <div className="smr-summary-label">
                    Restricted Tax Portion
                  </div>

                  <div className="smr-summary-value">
                    {formatINR(
                      restrictedTaxPortion
                    )}
                  </div>
                </div>

                <div className="smr-summary-card">
                  <div className="smr-summary-label">
                    Surcharge before MMR
                  </div>

                  <div className="smr-summary-value">
                    {formatINR(
                      displaySurchargeBeforeRelief
                    )}
                  </div>
                </div>

                <div className="smr-summary-card">
                  <div className="smr-summary-label">
                    Total Tax with Surcharge
                  </div>

                  <div className="smr-summary-value">
                    {formatINR(
                      displayTotalTaxWithSurcharge
                    )}
                  </div>
                </div>

              </div>
{/* STEP 3 — CALCULATE TAX UP TO THRESHOLD */}
<div
  style={{
    background: "#FFFFFF",
    border: "1px solid rgba(113,201,206,.28)",
    borderRadius: "22px",
    padding: "26px",
    marginBottom: "22px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
  }}
>
  {/* STEP HEADER */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "22px",
    }}
  >
    <div
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "10px",
        background: "#71C9CE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontWeight: 800,
        fontSize: "17px",
      }}
    >
      3
    </div>

    <div>
      <h2
        style={{
          margin: 0,
          color: "#173B3E",
          fontSize: "22px",
          fontWeight: 800,
        }}
      >
        Calculate Tax up to Threshold
      </h2>

      <p
        style={{
          margin: "5px 0 0",
          color: "#52777A",
          fontSize: "14px",
        }}
      >
        Threshold tax ke sath previous slab surcharge include hai.
      </p>
    </div>
  </div>

  {/* THRESHOLD DETAILS */}
  <div
    style={{
      background: "#E3FDFD",
      border: "1px solid rgba(113,201,206,.28)",
      borderRadius: "20px",
      padding: "18px",
    }}
  >
    {/* TOTAL INCOME UP TO THRESHOLD */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 0 18px",
        borderBottom: "1px solid rgba(113,201,206,.28)",
      }}
    >
      <span
        style={{
          color: "#52777A",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        Total Income up to Threshold
      </span>

      <strong
        style={{
          color: "#173B3E",
          fontSize: "17px",
          fontWeight: 800,
        }}
      >
        {formatINR(calculation.thresholdIncome)}
      </strong>
    </div>

    {/* TAX ON THRESHOLD INCOME */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 0",
        borderBottom: "1px solid rgba(113,201,206,.28)",
      }}
    >
      <span
        style={{
          color: "#52777A",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        Tax on Threshold Income
      </span>

      <strong
        style={{
          color: "#173B3E",
          fontSize: "17px",
          fontWeight: 800,
        }}
      >
        {formatINR(calculation.thresholdTax)}
      </strong>
    </div>

    {/* PREVIOUS SLAB SURCHARGE */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 0",
        borderBottom: "1px solid rgba(113,201,206,.28)",
      }}
    >
      <div>
  <span
    style={{
      color: "#52777A",
      fontSize: "15px",
      fontWeight: 700,
    }}
  >
    Previous Slab Surcharge @{" "}
    {calculation.previousSurchargeRate || 0}%
  </span>
</div>

<strong
  style={{
    color: "#173B3E",
    fontSize: "17px",
    fontWeight: 800,
  }}
>
  {formatINR(
    calculation.previousSurchargeAmount || 0
  )}
</strong>
</div>
    {/* FINAL THRESHOLD PAYABLE */}
    <div
      style={{
        marginTop: "16px",
        padding: "16px 18px",
        borderRadius: "14px",
        background: "#CBF1F5",
        border: "1px solid rgba(14,165,233,0.35)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "#52777A",
          fontSize: "15px",
          fontWeight: 800,
        }}
      >
        Tax Payable on Threshold including Surcharge
      </span>

      <strong
        style={{
          color: "#173B3E",
          fontSize: "17px",
          fontWeight: 900,
        }}
      >
        {formatINR(calculation.thresholdPayable)}
      </strong>
    </div>

    {/* MANUAL OVERRIDE */}
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "18px",
        color: "#52777A",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={useManualThresholdPayable}
        onChange={(e) =>
          setUseManualThresholdPayable(e.target.checked)
        }
      />

      <span>
        Threshold payable manually override karna hai
      </span>
    </label>

    {/* MANUAL INPUT */}
    {useManualThresholdPayable && (
      <div style={{ marginTop: "14px" }}>
        <SMRNumberField value={manualThresholdPayable} onChange={setManualThresholdPayable} placeholder="Enter threshold payable" ariaLabel="Manual threshold payable" className="smr-number-field smr-manual-number" />
      </div>
    )}
  </div>
</div>
                         </div>

          </section>

          {/* =================================================
              RIGHT RESULT PANEL
          ================================================= */}

          <aside className="smr-right">

            <div className="smr-card smr-result-card">

              {/* ---------------------------------------------
                  SELECTED CASE
              --------------------------------------------- */}

              <div className="smr-result-header">

                <small>
                  Selected Case
                </small>

                <h2>
                  {assessmentYear
                    ? `AY ${assessmentYear}`
                    : "Assessment Year"}
                  {" / "}
                  {
                    regime === "old"
                      ? "Old Regime"
                      : "New Regime"
                  }
                </h2>

              </div>

              {/* ---------------------------------------------
                  CURRENT SURCHARGE
              --------------------------------------------- */}

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Current Surcharge Rate
                </span>

                <span className="smr-result-value">
                  {calculation.displaySurchargeRate ||
                    `${surchargeRate}%`}
                </span>

              </div>

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Normal / Other Surcharge @
                  {" "}
                  {calculation.normalSurchargeRate ||
                    surchargeRate}
                  %
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    calculation.normalSurcharge ||
                    0
                  )}
                </span>

              </div>
             {toNumber(totalIncome) > 20000000 && (
  <div className="smr-result-item">

    <span className="smr-result-label">
      Dividend / 111A / 112 / 112A Surcharge @ 15%
    </span>

    <span className="smr-result-value">
      {formatINR(
        calculation.dividendSpecialRateSurcharge ||
        0
      )}
    </span>

  </div>
  )}

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Surcharge before Marginal Relief
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    displaySurchargeBeforeRelief
                  )}
                </span>

              </div>

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Total Tax with Surcharge
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    displayTotalTaxWithSurcharge
                  )}
                </span>

              </div>

              <div className="smr-result-item highlight">

                <span className="smr-result-label">
                  Threshold Tax Payable
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    displayThresholdPayable
                  )}
                </span>

              </div>

              {/* ---------------------------------------------
                  EXCESS TAX
              --------------------------------------------- */}

              <div className="smr-result-heading">
                EXCESS TAX PAYABLE
              </div>

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Excess Tax Payable
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    displayExcessTaxPayable
                  )}
                </span>

              </div>

              <div className="smr-result-item">

                <span className="smr-result-label">
                  Balance Remaining Income
                </span>

                <span className="smr-result-value">
                  {formatINR(
                    displayBalanceRemainingIncome
                  )}
                </span>

              </div>

              {/* ---------------------------------------------
                  MARGINAL RELIEF
              --------------------------------------------- */}

              <div className="smr-result-heading">
                MARGINAL RELIEF
              </div>

              <div className="smr-mmr-card">

                <strong>
                  {
                    calculation.isMarginalReliefApplicable
                      ? "Marginal Relief Applicable"
                      : "MMR Not Applicable"
                  }
                </strong>

                <span>
                  {formatINR(
                    displayMarginalRelief
                  )}
                </span>

              </div>

              {/* ---------------------------------------------
                  NET SURCHARGE
              --------------------------------------------- */}

              <div className="smr-net-card">

                <small>
                  Net Surcharge Amount
                </small>

                <div className="smr-net-value">
                  {formatINR(
                    displayFinalSurcharge
                  )}
                </div>

                <div className="smr-net-formula">
                  Net Surcharge = Final Normal Surcharge
                  + Final Restricted Surcharge
                </div>

              </div>

              {/* ---------------------------------------------
                  FORMULA USED
              --------------------------------------------- */}

              <div className="smr-formula-card">

                <h3>
                  Formula Used:
                </h3>

                <p>
                  Normal income mode me tax before
                  surcharge par applicable surcharge
                  rate apply hota hai. Blank/zero
                  restricted income hone par existing
                  normal income calculation same rahegi.
                  Marginal relief ke existing formula
                  ke according calculation ki gayi hai.
                </p>

              </div>

              <div className="smr-message">
                {
                  canCalculate
                    ? "Calculation completed successfully."
                    : "Total tax must be greater than zero."
                }
              </div>

              {/* ---------------------------------------------
                  ACTIONS
              --------------------------------------------- */}

              <div className="smr-actions">

                <button
                  type="button"
                  className="smr-action-btn primary"
                  onClick={downloadReport}
                  disabled={!canCalculate}
                >
                  {isDownloading ? "Preparing report..." : "Download Calculation Report"}
                </button>

                <button
                  type="button"
                  className="smr-action-btn"
                  onClick={resetCalculator}
                >
                  Reset Calculator
                </button>

              </div>

            </div>

          </aside>

        </div>
          </>
        )}
      </main>

    </div>
  );
}