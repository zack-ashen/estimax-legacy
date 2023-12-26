import CheckboxInput from "../../../Inputs/CheckboxInput/CheckboxInput";

const TermsElement = () => {
  return (
    <>
      <CheckboxInput
        label="Accepted Payment Method(s)"
        options={[
          {
            label: "Bank Transfer",
            value: "bankTransfer",
          },
          {
            label: "Check",
            value: "check",
          },
          {
            label: "Credit Card",
            value: "credit",
          },
        ]}
      />
    </>
  );
};

const Terms = {
  title: "Terms",
  Element: TermsElement,
  description: "Enter the terms and stipulations for your bid.",
};

export default Terms;
