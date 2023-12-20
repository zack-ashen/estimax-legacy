import React, { useEffect, useRef } from "react";

import styles from "./ActionSheet.module.scss";

interface ActionSheetProps {
  isOpen: boolean;
  options: { label: string; value: string | number }[];
  onSelect: (value: string | number) => void;
  onCancel: () => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  options,
  onSelect,
  onCancel,
}) => {
  const actionSheetRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string | number) => {
    onSelect(value);
  };

  // Close the action sheet when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionSheetRef.current &&
        !actionSheetRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.ActionSheet} ref={actionSheetRef}>
      {options.map((option) => (
        <div
          key={option.value}
          className={styles.actionSheetOption}
          onClick={() => handleOptionClick(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};
