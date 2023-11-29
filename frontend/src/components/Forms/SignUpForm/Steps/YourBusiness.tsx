import { Controller, useFormContext } from "react-hook-form";
import TextInput from "../../../Inputs/TextInput/TextInput";
import Select from "../../../Inputs/Select/Select";
import LocationSelect from "../../../Inputs/LocationSelect/LocationSelect";
import { ServicesOptions } from "../../../../data/options";

const YourBusinessElement = () => {
  const { register, watch, control } = useFormContext();

  const userType = watch("userRole");

  return userType === "vendor" ? (
    <>
      <TextInput
        id="business-name"
        label="Business Name"
        {...register("businessName")}
      />
      <TextInput id="phone" label="Phone" {...register("phone")} />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <LocationSelect
            id={"location-search"}
            label={"Location"}
            type="cities"
            {...field}
          />
        )}
      />
      <Controller
        name="services"
        control={control}
        render={({ field }) => (
          <Select
            label="Services Offered"
            options={ServicesOptions}
            id="business-type"
            {...field}
            isMulti
          />
        )}
      />
      <TextInput
        id="business-description"
        label="Business Description"
        {...register("businessDescription")}
      />
    </>
  ) : (
    <>
      <TextInput
        id="business-name"
        label="Business Name"
        {...register("businessName")}
      />
    </>
  );
};

export const YourBusiness = {
  title: "Business Info",
  Element: YourBusinessElement,
  description: "Enter your business information",
  defaultValues: {},
};
