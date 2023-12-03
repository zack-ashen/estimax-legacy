import { Controller, useFormContext } from "react-hook-form";
import { PropertyTypeOptions } from "../../../../data/options";
import LocationSelect from "../../../Inputs/LocationSelect/LocationSelect";
import Select from "../../../Inputs/Select/Select";
import TextArea from "../../../Inputs/TextArea/TextArea";
import TextInput from "../../../Inputs/TextInput/TextInput";

const BasicInfoElement = () => {
  const { register, control } = useFormContext();

  return (
    <>
      <TextInput
        id="basic-info-property-name"
        placeholder="Enter your property name"
        label="Property Name"
        {...register("propertyName", { required: "Property name is required" })}
      />
      <Controller
        name="propertyType"
        control={control}
        render={({ field }) => (
          <Select
            label="Property Type"
            options={PropertyTypeOptions}
            currentOption={field.value}
            id="property-type"
            placeholder="Select property type"
            {...field}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <LocationSelect
            id={"address-search"}
            label={"Address"}
            currentOption={field.value}
            type="address"
            placeholder="Enter your property address"
            {...field}
          />
        )}
      />
      <TextArea
        id="basic-info-description"
        label="Description"
        rows={3}
        placeholder={"Enter a description for your property"}
        {...register("description")}
      />
    </>
  );
};

export const BasicInfo = {
  title: "Property Info",
  Element: BasicInfoElement,
  description: "Please enter some basic details about your property.",
};
