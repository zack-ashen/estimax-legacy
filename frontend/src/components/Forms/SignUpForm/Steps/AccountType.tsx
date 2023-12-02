import { Controller, useFormContext } from "react-hook-form";
import CardRadioGroup, {
  RadioOption,
} from "../../../Inputs/CardRadio/CardRadio";
import { Role } from "../../../../types";

const radioOptions: RadioOption[] = [
  {
    value: Role.PROPERTY_MANAGER,
    label: "Property Manager",
    // icon: <PropertyManagerIcon />, // Your icon components here
  },
  {
    value: Role.VENDOR,
    label: "Vendor",
    // icon: <VendorIcon />,
  },
];

function AccountTypeElement() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="role"
      render={({ field: { onChange, value, name } }) => (
        <CardRadioGroup
          name={name}
          onChange={onChange}
          value={value}
          options={radioOptions}
        />
      )}
    />
  );
}

export const AccountType = {
  title: "Account Type",
  Element: AccountTypeElement,
  description: "What kind of Estimax user are you?",
  altHeader: "Who are you?",
};
