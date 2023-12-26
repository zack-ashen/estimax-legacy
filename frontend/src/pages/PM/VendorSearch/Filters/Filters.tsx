import { SearchIcon } from "../../../../assets/icons";
import {
  FilterComponentProps,
  FilterObject,
} from "../../../../components/FilterColumn/types";
import LocationSelect from "../../../../components/Inputs/LocationSelect/LocationSelect";
import Select, {
  OptionType,
} from "../../../../components/Inputs/Select/Select";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";
import { ServicesOptions } from "../../../../data/options";

const NameSearch: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <TextInput
    Icon={SearchIcon}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value)
    }
    placeholder="Search for projects by name"
  />
);

const Location: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <LocationSelect
    onChange={(e: OptionType) => onChange(e.value)}
    placeholder="Vendor location"
    id={"vendor-location"}
    type={"cities"}
  />
);

const Services: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <Select
    options={ServicesOptions}
    value={value}
    onChange={(e: OptionType[]) => onChange(e.map((o) => o.value).join(","))}
    isMulti
    placeholder="Vendor services"
  />
);

const vendorSearchFilters: FilterObject = {
  name: {
    name: "Name",
    component: NameSearch,
  },
  location: {
    name: "Location",
    component: Location,
  },
  services: {
    name: "Services",
    component: Services,
  },
};

export default vendorSearchFilters;
