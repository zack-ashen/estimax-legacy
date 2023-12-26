import { forwardRef, Ref } from "react";

import styles from "./CheckboxInput.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface CheckboxInputProps {
  name: string;
  label: string;
  options: Option[];
  [key: string]: any;
}

const CheckboxInput = forwardRef(
  (
    { name, label, options, register, ...rest }: CheckboxInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={styles.CheckboxGroup}>
        <label className={styles.inputLabel}>{label}</label>
        <div className={styles.checkboxOptions}>
          {options.map((option, index) => (
            <label key={option.value} className={styles.checkboxRow}>
              <input
                className={styles.checkbox}
                type="checkbox"
                name={name}
                value={option.value}
                ref={register ? register(name) : ref}
                {...rest}
              />
              <span className={styles.checkboxLabel}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
);

export default CheckboxInput;
