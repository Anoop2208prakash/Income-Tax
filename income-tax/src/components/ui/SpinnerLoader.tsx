
import CircularProgress from "@mui/material/CircularProgress";
import "./spinner-loader.scss";

interface SpinnerLoaderProps {
  size?: number;
  thickness?: number;
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

export default function SpinnerLoader({
  size = 42,
  thickness = 4,
  message = "Please wait...",
  fullScreen = false,
  overlay = false,
}: SpinnerLoaderProps) {
  return (
    <div
      className={[
        "spinner-loader",
        fullScreen ? "spinner-loader-fullscreen" : "",
        overlay ? "spinner-loader-overlay" : "",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <CircularProgress
        size={size}
        thickness={thickness}
        aria-label={message}
        className="spinner-loader-progress"
      />

      {message && <p>{message}</p>}
    </div>
  );
}
