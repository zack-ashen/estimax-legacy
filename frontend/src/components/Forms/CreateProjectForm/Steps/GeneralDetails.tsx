import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";
import { OrganizationService } from "../../../../services/organizationService";
import { PropertyService } from "../../../../services/propertyService";
import { Property } from "../../../../types";
import Select, { OptionType } from "../../../Inputs/Select/Select";
import TextArea from "../../../Inputs/TextArea/TextArea";
import TextInput from "../../../Inputs/TextInput/TextInput";

const GeneralDetailsElement = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const {
    userDetails: { organization },
  } = useAuth();
  const location = useLocation();
  const [propertyOptions, setPropertyOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    OrganizationService.getProperties(organization!).then((response) => {
      setPropertyOptions(
        response.properties.map((property: Property) => ({
          value: property.id,
          label: property.name,
        }))
      );
    });
  }, [organization]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get("property");
    if (propertyId) {
      PropertyService.get(propertyId).then((response) => {
        const property = response.property;
        setValue("property", {
          value: property.id,
          label: property.name,
        });
      });
    }
  }, [location.search, setValue]);

  return (
    <>
      <TextInput
        id="basic-info-project-name"
        placeholder="Enter your project name"
        label="Project Name"
        error={errors.propertyName?.message}
        {...register("name", { required: "Property name is required" })}
      />
      <Controller
        name="property"
        control={control}
        rules={{ required: "Property is required" }}
        render={({ field, fieldState: { error } }) => (
          <Select
            label="Property"
            options={propertyOptions}
            currentOption={field.value}
            isClearable
            id="property-name"
            placeholder="Select the property"
            error={error?.message}
            {...field}
          />
        )}
      />
      <TextArea
        id="basic-info-description"
        label="Description"
        rows={3}
        placeholder={"Enter a description for your project"}
        {...register("description")}
      />
    </>
  );
};

export const GeneralDetails = {
  title: "Project Info",
  Element: GeneralDetailsElement,
  description: "Please enter some basic details about your project.",
};
