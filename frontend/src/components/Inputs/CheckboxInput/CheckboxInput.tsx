import { forwardRef, Ref } from "react";

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
      <div>
        <label>{label}</label>
        {options.map((option, index) => (
          <label key={option.value}>
            {option.label}
            <input type="checkbox" value={option.value} ref={ref} {...rest} />
          </label>
        ))}
      </div>
    );
  }
);

export default CheckboxInput;
