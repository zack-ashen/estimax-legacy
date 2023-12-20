import { useState } from "react";
import { MoreDetailsIcon } from "../../assets/icons";
import { ActionSheet } from "../ActionSheet/ActionSheet";
import Button, { ButtonStyles } from "../Button/Button";

import styles from "./MoreOptions.module.scss";

export default function MoreOptions() {
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    // ...other options
  ];

  const handleSelect = (value: string | number) => {
    setSelectedValue(value);
    setActionSheetOpen(false); // Close the ActionSheet after selection
  };

  const handleCancel = () => {
    setActionSheetOpen(false);
  };

  return (
    <div className={styles.MoreOptions}>
      <Button
        buttonStyle={ButtonStyles.TERTIARY}
        onClick={() => setActionSheetOpen(true)}
        RightIcon={MoreDetailsIcon}
        iconOnly
      />
      <ActionSheet
        isOpen={actionSheetOpen}
        options={options}
        onSelect={handleSelect}
        onCancel={handleCancel}
      />
    </div>
  );
}
