
import "./CalculationPrintReport.scss";

type ReportValue = string | number | null | undefined;

interface ReportRow {
  label: string;
  values?: ReportValue[];
}

interface ReportSection {
  title?: string;
  columns?: string[];
  rows?: ReportRow[];
}

interface CalculationPrintReportProps {
  calculatorName?: string;
  assessmentYear?: string;
  sections?: ReportSection[];
}

const formatValue = (value: ReportValue): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "number") {
    return `₹ ${Math.round(value).toLocaleString("en-IN")}`;
  }

  return value;
};

export default function CalculationPrintReport({
  calculatorName = "",
  assessmentYear = "",
  sections = [],
}: CalculationPrintReportProps) {
  return (
    <div className="calculation-print-report">

      {/* REPORT HEADER */}
      <div className="print-report-header">
        <h1 className="print-report-title">
          {calculatorName}
        </h1>

        {assessmentYear && (
          <p className="print-report-ay">
            Assessment Year: {assessmentYear}
          </p>
        )}
      </div>

      {/* REPORT SECTIONS */}
      {sections.map((section, sectionIndex) => (
        <section
          className="print-report-section"
          key={sectionIndex}
        >
          {section.title && (
            <h2 className="print-report-section-title">
              {section.title}
            </h2>
          )}

          <table className="print-report-table">

            {section.columns && section.columns.length > 0 && (
              <thead>
                <tr>
                  {section.columns.map((column, columnIndex) => (
                    <th key={columnIndex}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {(section.rows ?? []).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.label}</td>

                  {(row.values ?? []).map((value, valueIndex) => (
                    <td key={valueIndex}>
                      {formatValue(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </section>
      ))}

    </div>
  );
}
