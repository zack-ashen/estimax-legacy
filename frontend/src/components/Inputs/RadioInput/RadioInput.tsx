import { forwardRef, Ref } from "react";

import styles from "./RadioInput.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface RadioInputProps {
  name: string;
  label: string;
  options: Option[];
  [key: string]: any;
}

const RadioInput = forwardRef(
  (
    { name, label, options, register, ...rest }: RadioInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className={styles.RadioGroup}>
        <label className={styles.inputLabel}>{label}</label>
        <div className={styles.radioOptions}>
          {options.map((option, index) => (
            <label key={option.value} className={styles.radioRow}>
              <input
                className={styles.radio}
                type="radio"
                name={name}
                value={option.value}
                ref={register ? register(name) : ref}
                {...rest}
              />
              <span className={styles.radioLabel}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
);

export default RadioInput;
