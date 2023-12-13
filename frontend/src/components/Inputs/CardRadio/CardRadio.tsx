import React from "react";

import styles from "./CardRadio.module.scss";

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
  <div className={styles.RadioCardGroup}>
    {options.map((option) => (
      <div
        key={option.value}
        className={`${styles.RadioCard} ${
          value === option.value ? styles.checked : ""
        }`}
      >
        <input
          ref={ref} // Attach ref provided by Controller to each radio input
          type="radio"
          id={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(option.value)} // Pass the value to the onChange handler
          className={styles.RadioCardInput}
        />
        <label htmlFor={option.value} className={styles.radioCardLabel}>
          {option.icon && <span className="icon">{option.icon}</span>}
          {option.label}
        </label>
      </div>
    ))}
  </div>
));

export default CardRadioGroup;
