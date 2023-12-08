import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext } from "react-hook-form";
import CheckboxInput from "../../../Inputs/CheckboxInput/CheckboxInput";
import RadioInput from "../../../Inputs/RadioInput/RadioInput";

const BiddingSettingsElement = () => {
  const { register } = useFormContext();

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
        {...register("myRadio")}
      />
      <CheckboxInput
        label="Dynamic Bidding"
        options={[
          {
            label: "Allow vendors to change their bid price",
            value: "dynamicBidding",
          },
        ]}
        {...register("myRadio")}
      />
      <p>Calendar Settings</p>
      <DatePicker selected={new Date()} onChange={() => {}} />
    </>
  );
};

export const BiddingSettings = {
  title: "Bidding Configuration",
  Element: BiddingSettingsElement,
  description:
    "Configure the details for how you want bidding to work on your project.",
};
