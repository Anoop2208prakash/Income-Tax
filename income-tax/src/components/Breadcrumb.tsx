
import "./Breadcrumb.scss";

interface BreadcrumbProps {
  current: string;
}

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <div className="breadcrumb-wrap">
      <div className="container">
        <p className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{current}</span>
        </p>
      </div>
    </div>
  );
}
