
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import "./NumberField.scss";

interface NumberFieldProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: "small" | "medium";
  format?: Intl.NumberFormatOptions;
  name?: string;
}

export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = "Enter amount",
  helperText,
  disabled = false,
  required = false,
  error = false,
  size = "medium",
  format,
  name,
}: NumberFieldProps) {
  return (
    <div
      className={`custom-number-field ${size} ${
        error ? "has-error" : ""
      }`}
    >
      <label className="number-field-label">
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>

      <BaseNumberField.Root
        value={value}
        onValueChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
        className="number-field-root"
      >
        <BaseNumberField.Group className="number-field-group">
          <BaseNumberField.Input
            placeholder={placeholder}
            aria-label={label}
            aria-invalid={error}
          />

          <div className="number-field-actions">
            <BaseNumberField.Increment
              className="number-action-btn"
              aria-label={`Increase ${label}`}
            >
              +
            </BaseNumberField.Increment>

            <BaseNumberField.Decrement
              className="number-action-btn"
              aria-label={`Decrease ${label}`}
            >
              −
            </BaseNumberField.Decrement>
          </div>
        </BaseNumberField.Group>
      </BaseNumberField.Root>

      {helperText && (
        <p className={`number-field-helper ${error ? "error" : ""}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}
