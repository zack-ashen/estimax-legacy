import { forwardRef, Ref } from "react";

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
      <div>
        <label>{label}</label>
        {options.map((option, index) => (
          <label key={option.value}>
            {option.label}
            <input type="radio" value={option.value} ref={ref} {...rest} />
          </label>
        ))}
      </div>
    );
  }
);

export default RadioInput;
