
import { Link } from "react-router-dom";
import "./InfoCard.scss";

interface InfoCardProps {
  title: string;
  description: string;
  route?: string;
  badge?: string;
  link?: string;
}

export default function InfoCard({
  title,
  description,
  route,
  badge,
  link,
}: InfoCardProps) {
  const content = (
    <>
      {badge && <span className="card-badge">{badge}</span>}

      <h3>{title}</h3>

      <p>{description}</p>

      {(route || link) && (
        <span className="card-link">Explore →</span>
      )}
    </>
  );

  if (route) {
    return (
      <Link to={route} className="info-card clickable-card">
        {content}
      </Link>
    );
  }

  if (link) {
    return (
      <a
        href={link}
        className="info-card clickable-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return <article className="info-card">{content}</article>;
}
