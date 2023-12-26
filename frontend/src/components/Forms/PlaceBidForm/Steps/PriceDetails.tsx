import { useFormContext } from "react-hook-form";
import RadioInput from "../../../Inputs/RadioInput/RadioInput";
import TextInput from "../../../Inputs/TextInput/TextInput";

function PriceDetailsElement() {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <RadioInput
        label="Price Type"
        options={[
          { label: "Estimate", value: "private" },
          {
            label: "Fixed",
            value: "public",
          },
        ]}
        {...register("public")}
      />
      <TextInput
        id="price-details-price"
        placeholder="1000.00"
        label="Total Price"
        error={errors.propertyName?.message}
        {...register("name", { required: "Property name is required" })}
      />
      <RadioInput
        label="Price Breakdown"
        options={[
          { label: "Provide a detailed price breakdown.", value: "breakdown" },
          {
            label: "Do not provide a detailed price breakdown.",
            value: "noBreakdown",
          },
        ]}
        {...register("price-breakdown")}
      />
      {watch("price-breakdown") === "breakdown" && <p>Breakdown Placeholder</p>}
    </>
  );
}

const PriceDetails = {
  title: "Price Details",
  Element: PriceDetailsElement,
  description: "Please enter the price details for your bid.",
};

export default PriceDetails;
