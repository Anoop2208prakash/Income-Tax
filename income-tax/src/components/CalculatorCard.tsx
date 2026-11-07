
import type { KeyboardEvent } from "react";
import InfoCard from "./InfoCard";
import "./CalculatorCard.scss";

interface CalculatorCardProps {
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
}

export default function CalculatorCard({
  title,
  description,
  badge,
  onClick,
}: CalculatorCardProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="calculator-card-wrapper calculator-card-link"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="calculator-card-inner">
        <div className="calculator-card-content">
          <InfoCard
            title={title}
            description={description}
            badge={badge}
          />
        </div>
      </div>
    </div>
  );
}
