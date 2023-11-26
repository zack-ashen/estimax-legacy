import { useState } from "react";
import styles from "./CardRadio.module.scss";
import React from "react";

export interface RadioOption {
  value: string;
  label: string;
  icon?: JSX.Element; // React component for icons (e.g., from FontAwesome)
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  // Name is required for associating the label with the input
  name: string;
  // Include the onChange and value from the field object
  onChange: (...event: any[]) => void;
  value: string;
}

const CardRadioGroup = React.forwardRef<
  HTMLInputElement,
  RadioButtonGroupProps
>(({ options, name, onChange, value }, ref) => (
  <div className="radio-group">
    {options.map((option) => (
      <React.Fragment key={option.value}>
        <input
          ref={ref} // Attach ref provided by Controller to each radio input
          type="radio"
          id={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(option.value)} // Pass the value to the onChange handler
          className="radio-input"
        />
        <label htmlFor={option.value} className="radio-label">
          {option.icon && <span className="icon">{option.icon}</span>}
          {option.label}
        </label>
      </React.Fragment>
    ))}
  </div>
));

export default CardRadioGroup;
