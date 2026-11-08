
import {
  FormControl,
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
    <div className="select-field-wrapper">
      <label
        htmlFor={id}
        className="select-field-label"
      >
        {label}
      </label>

      <FormControl
        className="select-field"
        fullWidth={fullWidth}
        disabled={disabled}
        variant="outlined"
      >
        <Select
          id={id}
          value={value}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            PaperProps: {
              className: "select-field-menu",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
