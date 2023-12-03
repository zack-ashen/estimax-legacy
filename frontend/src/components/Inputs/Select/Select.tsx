import React, { forwardRef, useEffect, useState } from "react";
import ReactSelect, {
  CSSObjectWithLabel,
  ControlProps,
  GroupBase,
  Props as ReactSelectProps,
} from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";

import styles from "./Select.module.scss";

export interface OptionType {
  value: string;
  label: string;
}

interface SelectProps
  extends ReactSelectProps<OptionType, boolean>,
    AsyncProps<OptionType, boolean, GroupBase<OptionType>> {
  id: string;
  onChange?: (...event: any[]) => void;
  label?: string;
  isAsync?: boolean;
  isMulti?: true;
  currentOption?: OptionType | OptionType[] | null;
  loadOptions?: (inputValue: string) => Promise<OptionType[]>;
}

const Select = forwardRef(
  (
    {
      isMulti,
      label,
      id,
      isAsync = false,
      loadOptions,
      onChange,
      currentOption,
      ...props
    }: SelectProps,
    ref: React.Ref<any>
  ) => {
    const [selectedOption, setSelectedOption] = useState<
      OptionType | OptionType[] | null
    >(null);

    useEffect(() => {
      if (currentOption) setSelectedOption(currentOption);
    }, []);

    const handleChange = (option: OptionType | OptionType[] | null) => {
      onChange && onChange(option);
      setSelectedOption(option);
    };

    return (
      <div className={styles.inputContainer}>
        {label && (
          <label htmlFor={id} className={styles.inputLabel}>
            {label}
          </label>
        )}
        {isAsync ? (
          <AsyncSelect
            loadOptions={loadOptions}
            styles={selectStyles}
            id={id}
            value={selectedOption as any}
            onChange={handleChange as any}
            isMulti={isMulti}
            ref={ref}
          />
        ) : (
          <ReactSelect
            {...props}
            id={id}
            isMulti={isMulti}
            value={selectedOption}
            onChange={handleChange as any}
            styles={selectStyles}
            ref={ref}
          />
        )}
      </div>
    );
  }
);

const selectStyles = {
  control: (
    provided: CSSObjectWithLabel,
    state: ControlProps<OptionType, true, GroupBase<OptionType>>
  ) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: "#D0D5DD", // colors depending on the focus state
    borderWidth: "1px", // Set a fixed border width
    borderRadius: "0.5rem",
    width: "100%",
    fontSize: "0.857rem",
    cursor: "text",
    color: "#1D2939",
    padding: "0",
    margin: "0px 0",
    outline: "none", // Removed outline
    "&:hover:not(:focus)": {
      borderColor: "#D0D5DD", // border color when hovered
    },
    "> :last-child": {
      color: "#98A2B3",

      "> :first-of-type, > :last-of-type": {
        cursor: "pointer",
      },
    },
  }),
  multiValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#F8F9FC",
    borderRadius: "0.4rem",
    color: "#1D2939",
    border: "1px solid #BBC8FB",
    fontWeight: "500",
    padding: "0.1rem 0rem 0.1rem 0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "> :last-child": {
      cursor: "pointer",
      width: "1.3rem",
      height: "1.3rem",
      display: "flex",
      alignItems: "center",
      borderRadius: "0.2rem",
      marginLeft: "0.4rem",
      "&:hover": {
        backgroundColor: "#F04438",
        color: "#FFFFFF",
      },
    },
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: "white",
    borderRadius: "0.5rem",
    marginTop: "0.7rem",
    border: "1px solid #D0D5DD",
    boxShadow:
      "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
    width: "75%",
    cursor: "pointer",
  }),

  option: (base: any, state: any) => ({
    ...base,
    // This will change the background when an option is being hovered or in focus
    backgroundColor: state.isFocused ? "#F2F4F7" : "#FFFFFF",
    color: "#344054",
    cursor: "pointer",
    width: "95%",
    margin: "0.7rem auto",
    borderRadius: "0.4rem",
    fontSize: "0.9rem",
    padding: "0.6rem 1.25rem",
    fontWeight: state.isFocused ? "600" : "500",
  }),
};

export default Select;
