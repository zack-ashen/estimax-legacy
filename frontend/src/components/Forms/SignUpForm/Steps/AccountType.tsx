import { Controller, useFormContext } from "react-hook-form";
import CardRadioGroup, {
  RadioOption,
} from "../../../Inputs/CardRadio/CardRadio";

const radioOptions: RadioOption[] = [
  {
    value: "property_manager",
    label: "Property Manager",
    // icon: <PropertyManagerIcon />, // Your icon components here
  },
  {
    value: "vendor",
    label: "Vendor",
    // icon: <VendorIcon />,
  },
];

function AccountTypeElement() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="userRole"
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
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
