
import { useId } from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import "./NumberField.scss";

interface NumberFieldProps {
  id?: string;
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
  fullWidth?: boolean;
}

export default function NumberField({
  id,
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
  fullWidth = false,
}: NumberFieldProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const helperId = `${fieldId}-helper`;

  return (
    <div
      className={[
        "custom-number-field",
        size,
        fullWidth ? "full-width" : "",
        error ? "has-error" : "",
        disabled ? "is-disabled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label
        htmlFor={fieldId}
        className="number-field-label"
      >
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
        format={format}
        required={required}
        className="number-field-root"
      >
        <BaseNumberField.Group className="number-field-group">
          <BaseNumberField.Input
            id={fieldId}
            placeholder={placeholder}
            aria-label={label}
            aria-invalid={error}
            aria-describedby={helperText ? helperId : undefined}
          />

          {/* VERTICAL INCREMENT / DECREMENT BUTTONS */}
          <div className="number-field-actions">
            <BaseNumberField.Increment
              className="number-action-btn increment-btn"
              aria-label={`Increase ${label}`}
            >
              +
            </BaseNumberField.Increment>

            <BaseNumberField.Decrement
              className="number-action-btn decrement-btn"
              aria-label={`Decrease ${label}`}
            >
              −
            </BaseNumberField.Decrement>
          </div>
        </BaseNumberField.Group>
      </BaseNumberField.Root>

      {helperText && (
        <p
          id={helperId}
          className={`number-field-helper ${error ? "error" : ""}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
