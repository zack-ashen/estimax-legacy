import { SearchIcon } from "../../../../assets/icons";
import {
  FilterComponentProps,
  FilterObject,
} from "../../../../components/FilterColumn/types";
import Select, {
  OptionType,
} from "../../../../components/Inputs/Select/Select";
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

const SearchRadius: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <TextInput
    Icon={SearchIcon}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value)
    }
    placeholder="Search radius in miles"
  />
);

const numberOfBidOptions = [
  { value: 0, label: "None" },
  { value: 5, label: "< 3" },
  { value: 5, label: "< 10" },
];

const NumberOfBids: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e: OptionType | undefined) => {
      onChange(e ? e.value : "");
    }}
    options={numberOfBidOptions}
    placeholder="Number of bids"
  />
);

const timeLefToBid = [
  { value: 3600000, label: "< 1 Hour" },
  { value: 86400000, label: "< 1 Day" },
  { value: 432000000, label: "< 5 Days" },
  { value: 604800000, label: "< 1 Week" },
  { value: 2592000000, label: "< 1 Month" },
  { value: -2592000000, label: "≥ 1 Month" },
];

const TimeLeftToBid: React.FC<FilterComponentProps> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e: OptionType | undefined) => {
      onChange(e ? e.value : "");
    }}
    options={timeLefToBid}
    placeholder="Time left to bid"
    isClearable
  />
);

const projectExploreFilters: FilterObject = {
  name: {
    name: "Name",
    component: NameSearch,
  },
  searchRadius: {
    name: "Search Radius",
    component: SearchRadius,
  },
  timeLeftToBid: {
    name: "Time Left to Bid",
    component: TimeLeftToBid,
  },
  numberOfBids: {
    name: "Number of Bids",
    component: NumberOfBids,
  },
};

export default projectExploreFilters;
