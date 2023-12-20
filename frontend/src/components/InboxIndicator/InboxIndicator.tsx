import { useState } from "react";

import { InboxIcon } from "../../assets/icons";
import { ActionSheet } from "../ActionSheet/ActionSheet";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./InboxIndicator.module.scss";

export default function InboxIndicator() {
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
    <div className={styles.InboxIndicator}>
      <Button
        buttonStyle={ButtonStyles.LINK}
        onClick={() => setActionSheetOpen(true)}
        RightIcon={InboxIcon}
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
