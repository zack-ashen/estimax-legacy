import { SearchIcon } from "../../../../assets/icons";
import {
  FilterComponentProps,
  FilterObject,
} from "../../../../components/FilterColumn/types";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";

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

const vendorSearchFilters: FilterObject = {
  name: {
    name: "Name",
    component: NameSearch,
  },
};

export default vendorSearchFilters;
