import { Controller, useFormContext } from "react-hook-form";
import { ServicesOptions } from "../../../../data/options";
import LocationSelect from "../../../Inputs/LocationSelect/LocationSelect";
import Select from "../../../Inputs/Select/Select";
import TextInput from "../../../Inputs/TextInput/TextInput";

const YourBusinessElement = () => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const userType = watch("userRole");

  return userType === "vendor" ? (
    <>
      <TextInput
        id="basic-info-name"
        type="text"
        placeholder="Full Name"
        label="Full Name"
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />
      <TextInput
        id="business-name"
        label="Business Name"
        {...register("businessName")}
      />
      <TextInput id="phone" label="Phone" {...register("phone")} />
      <Controller
        name="vendor.location"
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
        id="basic-info-name"
        type="text"
        placeholder="Full Name"
        label="Full Name"
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />
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
};
