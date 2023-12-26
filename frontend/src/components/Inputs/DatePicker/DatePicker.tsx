import { ReactElement, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.scss";
import "./datepicker_override.css";
interface DatePickerProps {
  customInput: JSX.Element;
  onChange?: (date: Date | null) => void;
  selected?: Date;
  label: string;
  id: string;
}

export default function DatePicker({
  customInput,
  selected,
  label,
  id,
  onChange,
}: DatePickerProps): ReactElement {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <div className={styles.DatePicker}>
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
      <ReactDatePicker
        id={id}
        showTimeSelect
        selected={selected || startDate}
        onChange={(date: Date | null) => {
          onChange && onChange(date);
          setStartDate(date || new Date());
        }}
        customInput={customInput}
        popperModifiers={[
          {
            name: "arrow",
            options: {
              padding: ({ popper, reference, placement }) => ({
                right: Math.min(popper.width, reference.width) - 24,
              }),
            },
          },
        ]}
      />
    </div>
  );
}
