import { forwardRef } from "react";
import { LocationService } from "../../../services/location";
import { OptionType } from "../../Inputs/Select/Select";
import Select from "../Select/Select";

interface LocationSelectProps {
  id: string;
  label?: string;
  type: "cities" | "address";
  onChange?: (...event: any[]) => void;
}

const LocationSelect = forwardRef(
  ({ id, label, type, onChange }: LocationSelectProps, ref: React.Ref<any>) => {
    const fetchLocations = async (
      inputValue: string
    ): Promise<OptionType[]> => {
      try {
        const response = await LocationService.search(inputValue, type, 5);

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
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export default LocationSelect;
