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

  const userType = watch("role");

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
        {...register("businessName", { required: "Business name is required" })}
      />
      <TextInput id="phone" label="Phone" {...register("phone")} />
      <Controller
        name="location"
        control={control}
        rules={{ required: "Location is required" }}
        render={({ field, fieldState: { error } }) => (
          <LocationSelect
            id={"location-search"}
            label={"Location"}
            currentOption={field.value}
            type="cities"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="services"
        control={control}
        rules={{ required: "Services Offered is required" }}
        render={({ field, fieldState: { error } }) => (
          <Select
            label="Services Offered"
            options={ServicesOptions}
            id="business-type"
            currentOption={field.value}
            error={error?.message}
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
        {...register("businessName", { required: "Business name is required" })}
      />
    </>
  );
};

export const YourBusiness = {
  title: "Business Info",
  Element: YourBusinessElement,
  description: "Enter your business information",
};
