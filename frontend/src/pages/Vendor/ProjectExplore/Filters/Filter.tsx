import {
  FilterComponentProps,
  FilterObject,
} from "../../../../components/FilterColumn/types";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";

const InputFilter: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <TextInput
    value={value}
    onChange={onChange}
    placeholder="Show me your penis"
  />
);

const projectExploreFilters: FilterObject = {
  locations: {
    name: "Locations",
    component: InputFilter,
  },
  propertyManager: {
    name: "Property Manager",
    component: InputFilter,
  },
  timeLeftToBid: {
    name: "Time Left to Bid",
    component: InputFilter,
  },
  numberOfBids: {
    name: "Number of Bids",
    component: InputFilter,
  },
};

export default projectExploreFilters;
