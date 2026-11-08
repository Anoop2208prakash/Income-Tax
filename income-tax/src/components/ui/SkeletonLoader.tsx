
import Skeleton from "@mui/material/Skeleton";
import "./skeleton-loader.scss";

interface SkeletonLoaderProps {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: number | string;
  height?: number | string;
  count?: number;
  animation?: "pulse" | "wave" | false;
  className?: string;
}

export default function SkeletonLoader({
  variant = "rounded",
  width = "100%",
  height = 20,
  count = 1,
  animation = "wave",
  className = "",
}: SkeletonLoaderProps) {
  return (
    <div className={`skeleton-loader ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={width}
          height={height}
          animation={animation}
          className="skeleton-loader-item"
        />
      ))}
    </div>
  );
}
