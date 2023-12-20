import { useState } from "react";

import { NotificationIcon } from "../../assets/icons";
import { ActionSheet } from "../ActionSheet/ActionSheet";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./NotificationIndicator.module.scss";

export default function NotificationIndicator() {
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
    <div className={styles.NotificationIndicator}>
      <Button
        buttonStyle={ButtonStyles.LINK}
        onClick={() => setActionSheetOpen(true)}
        RightIcon={NotificationIcon}
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
