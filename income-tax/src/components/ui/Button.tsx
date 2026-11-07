
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import "./Button.scss";

interface AppButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
  appearance?: "primary" | "light" | "outlined";
}

const Button = ({
  appearance = "primary",
  className = "",
  children,
  ...props
}: AppButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      disableElevation
      className={`app-button app-button--${appearance} ${className}`}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
