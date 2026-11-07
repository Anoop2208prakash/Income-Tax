
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

import "./SelectField.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  fullWidth = true,
  disabled = false,
}: SelectFieldProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      className="select-field"
      fullWidth={fullWidth}
      size="small"
      disabled={disabled}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>

      
<Select
  labelId={`${id}-label`}
  id={id}
  value={value}
  label={label}
  onChange={handleChange}
  MenuProps={{
    slotProps: {
      paper: {
        className: "select-field-menu",
        sx: {
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          boxShadow: "var(--navbar-shadow)",
        },
      },
    },
  }}
>
  {options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</Select>

    </FormControl>
  );
}
