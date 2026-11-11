import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Skeleton } from "@mui/material";



const STATUS_OPTIONS = [

  {

    value: "individual",

    label: "Individual / HUF / AOP / BOI / Artificial Juridical Person",

    shortLabel: "Individual / HUF / AOP / BOI / AJP",

  },

  {

    value: "aop_company_members",

    label: "AOP consisting only companies as members",

    shortLabel: "AOP – Companies as Members",

  },

  {

    value: "firm_llp_local_authority",

    label: "Firm / LLP / Local Authority",

    shortLabel: "Firm / LLP / Local Authority",

  },

  {

    value: "company",

    label: "Domestic Company and Foreign Company",

    shortLabel: "Domestic / Foreign Company",

  },

  {

    value: "cooperative_society",

    label: "Co-operative Society",

    shortLabel: "Co-operative Society",

  },

];



export default function SurchargeMarginalReliefCalculatorStatusWise() {

   const navigate = useNavigate();

 const [selectedStatusWise, setSelectedStatusWise] = useState("");
  const [loadingStatus, setLoadingStatus] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setPageLoading(false), 550); return () => window.clearTimeout(timer); }, []);
  const goToStatus = (status, path) => { setLoadingStatus(status); setSelectedStatusWise(status); window.setTimeout(() => navigate(path), 220); };

const selectedStatus = selectedStatusWise;



  const selectedStatusDetails = STATUS_OPTIONS.find(

    (item) => item.value === selectedStatus

  );



  const handleReset = () => {

    setSelectedStatus("");

  };



  return (

    <div className="status-wise-mr-page">
      <div className="status-wise-mr-toolbar">
        <Button variant="outlined" onClick={() => navigate(-1)} className="status-wise-mr-back">← Back</Button>
      </div>






      {/* =========================================================

    STATUS-WISE MARGINAL RELIEF - NEW STATUS SELECTOR UI

    ========================================================= */}



<div

  style={{

    width: "100%",

    maxWidth: "1300px",

    padding: "10px",

    background: "linear-gradient(135deg, #E3FDFD, #CBF1F5)"

  }}

>

  {/* PAGE HEADER */}

  <div

    style={{

      background: "linear-gradient(135deg, #CBF1F5, #E3FDFD)",



      borderRadius: "22px",

      padding: "30px",

      marginBottom: "24px",

    }}

  >

    <div

      style={{

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        gap: "20px",

      }}

    >

      <div>

        <span

          style={{

            display: "inline-block",

            background: "#71C9CE",

            color: "#173B3E",

            padding: "6px 12px",

            borderRadius: "7px",

            fontSize: "11px",

            fontWeight: "800",

            letterSpacing: "1px",

            marginBottom: "10px",

          }}

        >

          CALCULATOR

        </span>



        <h1

  style={{

    margin: 0,

    fontSize: "32px",

    fontWeight: "800",

    color: "#173B3E",

    lineHeight: "1.2",

  }}

>

  Surcharge & Marginal Relief Calculator

</h1>



        <p

  style={{

    margin: "10px 0 0",

    color: "#52777A",

    fontSize: "14px",

    lineHeight: "1.6",

  }}

>

  Calculate surcharge and marginal relief based on taxpayer

  status, income and applicable tax rules.

</p>

      </div>



      <div

        style={{

          minWidth: "180px",

          padding: "20px",

          borderRadius: "16px",

          background: "rgba(203,241,245,0.85)",

          border: "1px solid rgba(113,201,206,0.55)",

          textAlign: "center",

        }}

      >

        <span

          style={{

            display: "block",

            color: "#52777A",

            fontSize: "11px",

            fontWeight: "700",

          }}

        >

          INCOME TAX

        </span>



        <strong

  style={{

    display: "block",

    marginTop: "6px",

    fontSize: "17px",

    color: "#173B3E",

  }}

>

  Marginal Relief

</strong>

      </div>

    </div>

  </div>





  {/* MAIN CONTENT */}

  <div

  style={{

    width: "100%",

  }}

>



    {/* LEFT CARD */}

    <div

      style={{

        background: "#173B3E",

        border: "1px solid rgba(166,227,233,0.65)",

        borderRadius: "22px",

        overflow: "hidden",

      }}

    >



      {/* STATUS SECTION */}

      <div

        style={{

          padding: "30px",

          borderBottom: "1px solid rgba(166,227,233,0.65)",

        }}

      >



        <div

          style={{

            display: "flex",

            gap: "14px",

            alignItems: "flex-start",

            marginBottom: "22px",

          }}

        >

          <span

            style={{

              width: "34px",

              height: "34px",

              borderRadius: "50%",

              background: "#71C9CE",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontWeight: "800",

            }}

          >

            1

          </span>



          <div>

           <h2

  style={{

    margin: 0,

    fontSize: "21px",

    fontWeight: "800",

    color: "#173B3E",

    lineHeight: "1.3",

  }}

>

  Select Status

</h2>



            <p

  style={{

    margin: "6px 0 0",

    color: "#52777A",

    fontSize: "13px",

    lineHeight: "1.5",

  }}

>

  Select the taxpayer status for marginal relief calculation.

</p>

          </div>

        </div>





        {/* STATUS OPTIONS */}

        <div

          style={{

            display: "flex",

            flexWrap: "wrap",

            gap: "10px",

          }}

        >



         <button

  type="button"

  onClick={() => goToStatus("individual", "/SurchargeMarginalReliefCalculator/individual")}

  style={{

  padding: "14px 18px",

  minHeight: "50px",

  borderRadius: "12px",

  border:

    selectedStatusWise === "individual"

      ? "1px solid #71C9CE"

      : "1px solid #A6E3E9",

  background:

    selectedStatusWise === "individual"

      ? "linear-gradient(135deg, #A6E3E9, #71C9CE)"

      : "#173B3E",

  color: "#173B3E",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

  transition: "all 0.2s ease",

  boxShadow:

    selectedStatusWise === "individual"

      ? "0 6px 18px rgba(113,201,206,0.20)"

      : "none",

}}

>

  Individual / HUF / AOP / BOI / AJP

</button>





         <button

  type="button"

  onClick={() => goToStatus("aop_company", "/SurchargeMarginalReliefCalculator/aop-company")}

   style={{

  padding: "14px 18px",

  minHeight: "50px",

  borderRadius: "12px",

  border:

    selectedStatusWise === "aop_company"

      ? "1px solid #71C9CE"

      : "1px solid #A6E3E9",

  background:

    selectedStatusWise === "aop_company"

      ? "linear-gradient(135deg, #A6E3E9, #71C9CE)"

      : "#173B3E",

  color: "#173B3E",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

  transition: "all 0.2s ease",

  boxShadow:

    selectedStatusWise === "aop_company"

      ? "0 6px 18px rgba(113,201,206,0.20)"

      : "none",

}}

>

  AOP – Share indeterminate or unknown

</button>





          <button

  type="button"

  onClick={() => goToStatus("firm_llp_local", "/SurchargeMarginalReliefCalculator/firm-llp-local")}

  style={{

  padding: "14px 18px",

  minHeight: "50px",

  borderRadius: "12px",

  border:

    selectedStatusWise === "firm_llp_local"

      ? "1px solid #71C9CE"

      : "1px solid #A6E3E9",

  background:

    selectedStatusWise === "firm_llp_local"

      ? "linear-gradient(135deg, #A6E3E9, #71C9CE)"

      : "#173B3E",

  color: "#173B3E",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

  transition: "all 0.2s ease",

  boxShadow:

    selectedStatusWise === "firm_llp_local"

      ? "0 6px 18px rgba(113,201,206,0.20)"

      : "none",

}}

>

  Firm / LLP / Local Authority

</button>





          <button

  type="button"

  onClick={() => goToStatus("company", "/SurchargeMarginalReliefCalculator/company")}

  style={{

  padding: "14px 18px",

  minHeight: "50px",

  borderRadius: "12px",

  border:

    selectedStatusWise === "company"

      ? "1px solid #71C9CE"

      : "1px solid #A6E3E9",

  background:

    selectedStatusWise === "company"

      ? "linear-gradient(135deg, #A6E3E9, #71C9CE)"

      : "#173B3E",

  color: "#173B3E",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

  transition: "all 0.2s ease",

  boxShadow:

    selectedStatusWise === "company"

      ? "0 6px 18px rgba(113,201,206,0.20)"

      : "none",

}}

>

  Domestic / Foreign Company

</button>





          <button

  type="button"

  onClick={() => goToStatus("cooperative", "/SurchargeMarginalReliefCalculator/cooperative")}

  style={{

  padding: "14px 18px",

  minHeight: "50px",

  borderRadius: "12px",

  border:

    selectedStatusWise === "cooperative"

      ? "1px solid #71C9CE"

      : "1px solid #A6E3E9",

  background:

    selectedStatusWise === "cooperative"

      ? "linear-gradient(135deg, #A6E3E9, #71C9CE)"

      : "#173B3E",

  color: "#173B3E",

  cursor: "pointer",

  fontWeight: "700",

  fontSize: "13px",

  transition: "all 0.2s ease",

  boxShadow:

    selectedStatusWise === "cooperative"

      ? "0 6px 18px rgba(113,201,206,0.20)"

      : "none",

}}

>

  Co-operative Society

</button>

{selectedStatusWise && (

  <div

    style={{

      marginTop: "24px",

      borderRadius: "18px",

      border: "1px solid rgba(113,201,206,0.35)",

      background: "#173B3E",

      overflow: "hidden",

    }}

  >

    {/* ACTIVE STATUS HEADER */}

    <div

      style={{

        padding: "22px 26px",

        background: "linear-gradient(135deg, #CBF1F5, #E3FDFD)",

        borderBottom: "1px solid rgba(166,227,233,0.65)",

      }}

    >

      <div

        style={{

          color: "#238F98",

          fontSize: "11px",

          fontWeight: "800",

          letterSpacing: "1px",

          textTransform: "uppercase",

          marginBottom: "7px",

        }}

      >

        Selected Status

      </div>



      <h2

        style={{

          margin: 0,

          color: "#173B3E",

          fontSize: "22px",

          fontWeight: "800",

          lineHeight: "1.3",

        }}

      >

        {selectedStatusWise === "individual" &&

          "Individual / HUF / AOP / BOI / Artificial Juridical Person"}



        {selectedStatusWise === "aop_company" &&

          "AOP consisting only Companies as Members"}



        {selectedStatusWise === "firm_llp_local" &&

          "Firm / LLP / Local Authority"}



        {selectedStatusWise === "company" &&

          "Domestic Company / Foreign Company"}



        {selectedStatusWise === "cooperative" &&

          "Co-operative Society"}

      </h2>

    </div>



    {/* CONTENT */}

    <div

      style={{

        padding: "28px",

        color: "#173B3E",

      }}

    >

      {selectedStatusWise === "individual" && (

        <>

          <h3

            style={{

              margin: "0 0 8px",

              color: "#173B3E",

              fontSize: "19px",

            }}

          >

            Individual / HUF / AOP / BOI / AJP

          </h3>



          <p

            style={{

              margin: 0,

              color: "#52777A",

              fontSize: "13px",

              lineHeight: "1.6",

            }}

          >

            Individual status ke applicable inputs aur marginal relief

            calculation yahan open hoga.

          </p>

        </>

      )}



      {selectedStatusWise === "aop_company" && (

        <>

          <h3

            style={{

              margin: "0 0 8px",

              color: "#173B3E",

              fontSize: "19px",

            }}

          >

            AOP – Companies as Members

          </h3>



          <p style={{ margin: 0, color: "#52777A" }}>

            AOP consisting only companies as members ke inputs yahan

            open honge.

          </p>

        </>

      )}



      {selectedStatusWise === "firm_llp_local" && (

        <>

          <h3

            style={{

              margin: "0 0 8px",

              color: "#173B3E",

              fontSize: "19px",

            }}

          >

            Firm / LLP / Local Authority

          </h3>



          <p style={{ margin: 0, color: "#52777A" }}>

            Firm / LLP / Local Authority ke inputs yahan open honge.

          </p>

        </>

      )}



      {selectedStatusWise === "company" && (

        <>

          <h3

            style={{

              margin: "0 0 8px",

              color: "#173B3E",

              fontSize: "19px",

            }}

          >

            Domestic / Foreign Company

          </h3>



          <p style={{ margin: 0, color: "#52777A" }}>

            Domestic aur Foreign Company ke inputs yahan open honge.

          </p>

        </>

      )}



      {selectedStatusWise === "cooperative" && (

        <>

          <h3

            style={{

              margin: "0 0 8px",

              color: "#173B3E",

              fontSize: "19px",

            }}

          >

            Co-operative Society

          </h3>



          <p style={{ margin: 0, color: "#52777A" }}>

            Co-operative Society ke inputs yahan open honge.

          </p>

        </>

      )}

    </div>

  </div>

)}

        </div>



      </div>







      </div>



    </div>



  </div>



      <style>{`
.status-wise-mr-page {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 22px;
  color: #173B3E;
  background: linear-gradient(135deg, #E3FDFD 0%, #F7FFFF 52%, #CBF1F5 100%);
}
.status-wise-mr-page * { box-sizing: border-box; }
.status-wise-mr-page > div[style] {
  max-width: 1300px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding: 0 !important;
  background: transparent !important;
}
.status-wise-mr-page > div[style] > div[style] {
  background: linear-gradient(135deg, #CBF1F5 0%, #E3FDFD 100%) !important;
  border: 1px solid #A6E3E9 !important;
  border-radius: 22px !important;
  box-shadow: 0 12px 32px rgba(49,95,99,.08) !important;
}
.status-wise-mr-page h1,
.status-wise-mr-page h2,
.status-wise-mr-page h3,
.status-wise-mr-page strong { color: #173B3E !important; }
.status-wise-mr-page p { color: #52777A !important; }
.status-wise-mr-page button:not(.MuiButton-root) {
  border: 1px solid #A6E3E9 !important;
  border-radius: 12px !important;
  background: #173B3E !important;
  color: #315F63 !important;
  box-shadow: none !important;
  transition: background .18s ease, border-color .18s ease !important;
}
.status-wise-mr-page button:not(.MuiButton-root):hover {
  background: #E3FDFD !important;
  border-color: #71C9CE !important;
}
.status-wise-mr-page .status-wise-mr-toolbar { max-width:1300px; margin:0 auto 12px; }
.status-wise-mr-page .status-wise-mr-back {
  color:#238F98 !important;
  border-color:#71C9CE !important;
  background:#173B3E !important;
  text-transform:none !important;
  font-weight:700 !important;
}
.status-wise-mr-page .status-wise-mr-skeleton {
  max-width:1300px; margin:0 auto; display:grid; gap:16px;
}
.status-wise-mr-page .MuiSkeleton-root {
  background-color:#CBF1F5 !important;
}
.status-wise-mr-page .MuiSkeleton-root::after {
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent) !important;
}
@media (max-width: 700px) {
  .status-wise-mr-page { padding:12px !important; }
}

/* Exact Color Hunt palette override for every inline-styled panel in this page */
.status-wise-mr-page {
  background: linear-gradient(135deg, #E3FDFD 0%, #F7FFFF 52%, #CBF1F5 100%) !important;
  color: #173B3E !important;
}
.status-wise-mr-page > div[style],
.status-wise-mr-page > div[style] > div[style],
.status-wise-mr-page > div[style] > div[style] > div[style] {
  background: #E3FDFD !important;
  color: #173B3E !important;
  border-color: #A6E3E9 !important;
}
.status-wise-mr-page h1,
.status-wise-mr-page h2,
.status-wise-mr-page h3,
.status-wise-mr-page strong,
.status-wise-mr-page span {
  color: #173B3E;
}
.status-wise-mr-page p,
.status-wise-mr-page small {
  color: #52777A;
}
.status-wise-mr-page button:not(.MuiButton-root) {
  background: #FFFFFF !important;
  color: #315F63 !important;
  border: 1px solid #A6E3E9 !important;
  box-shadow: none !important;
}
.status-wise-mr-page button:not(.MuiButton-root):hover {
  background: #E3FDFD !important;
  border-color: #71C9CE !important;
}
.status-wise-mr-page button[style*="linear-gradient"],
.status-wise-mr-page button[style*="#0c162a"],
.status-wise-mr-page button[style*="#174477"] {
  background: #CBF1F5 !important;
  color: #173B3E !important;
  border-color: #71C9CE !important;
}
.status-wise-mr-page .status-wise-mr-back {
  color: #238F98 !important;
  background: #FFFFFF !important;
  border-color: #71C9CE !important;
}

`}</style>
</div>







  );

}