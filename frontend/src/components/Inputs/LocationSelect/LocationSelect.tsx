import { useState } from "react";
import { OptionType } from "../../../types";
import Select from "../Select/Select";
import { locationSearch } from "../../../services/map";

interface LocationSelectProps {
  id: string;
  label?: string;
  type: "cities" | "address";
}

export default function LocationSelect({
  id,
  label,
  type,
}: LocationSelectProps) {
  const fetchLocations = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const response = await locationSearch(inputValue, type);

      return response.locations.map((location: any) => ({
        value: location.place_id, // or any unique identifier
        label: location.description, // the name to display
      }));
    } catch (error) {
      return [];
    }
  };

  return (
    <Select
      id={id}
      label={label ? label : undefined}
      isAsync
      defaultOptions
      loadOptions={fetchLocations}
    />
  );
}
