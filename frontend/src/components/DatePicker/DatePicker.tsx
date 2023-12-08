import { ReactElement, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker_override.css";

interface DatePickerProps {
  customInput: JSX.Element;
  onChange?: (date: Date | null) => void;
  selected?: Date;
}

export default function DatePicker({
  customInput,
  selected,
  onChange,
}: DatePickerProps): ReactElement {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <ReactDatePicker
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
  );
}
