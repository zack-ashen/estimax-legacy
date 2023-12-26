import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CalendarIcon } from "../../../../assets/icons";
import Button, { ButtonStyles } from "../../../Button/Button";
import CheckboxInput from "../../../Inputs/CheckboxInput/CheckboxInput";
import DatePicker from "../../../Inputs/DatePicker/DatePicker";
import RadioInput from "../../../Inputs/RadioInput/RadioInput";

interface ExampleCustomInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}

const DateButton = forwardRef<HTMLButtonElement, ExampleCustomInputProps>(
  ({ value, onClick }, ref) => (
    <Button
      buttonStyle={ButtonStyles.SECONDARY}
      LeftIcon={CalendarIcon}
      onClick={onClick}
      ref={ref}
      text={value}
    />
  )
);

const BiddingSettingsElement = () => {
  const { register, control } = useFormContext();

  return (
    <>
      <RadioInput
        label="Privacy"
        options={[
          { label: "Only allow vendors you invite to bid.", value: "private" },
          {
            label: "Allow vendors from the marketplace to view and bid.",
            value: "public",
          },
        ]}
        {...register("public")}
      />
      <CheckboxInput
        label="Dynamic Bidding"
        options={[
          {
            label: "Allow vendors to change their bid price",
            value: "dynamicBidding",
          },
        ]}
        {...register("dynamicBidding")}
      />
      <Controller
        control={control}
        name={"expirationDate"}
        render={({ field }) => (
          <DatePicker
            id={"bid-expiration-date"}
            selected={field.value as Date}
            onChange={(date: Date | null) => field.onChange(date)}
            customInput={<DateButton />}
            label={"Bidding End Date"}
          />
        )}
      />
    </>
  );
};

export const BiddingSettings = {
  title: "Bidding Configuration",
  Element: BiddingSettingsElement,
  description:
    "Configure the details for how you want bidding to work on your project.",
};
