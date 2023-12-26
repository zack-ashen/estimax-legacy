import React, { PropsWithChildren, useEffect, useRef } from "react";
import { CloseIcon } from "../../assets/icons";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./Drawer.module.scss";

interface DrawerProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  header,
  children,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`${styles.drawer} ${styles[isOpen ? "open" : ""]}`}
      ref={drawerRef}
    >
      {header && (
        <>
          <div className={styles.headerContainer}>
            <p className={styles.header}>{header}</p>{" "}
            <Button
              buttonStyle={ButtonStyles.TERTIARY}
              onClick={() => onClose()}
              RightIcon={CloseIcon}
              iconOnly
            />
          </div>
          <div className={`${styles.divider} ${styles.drawerDivider}`} />
        </>
      )}
      {children}
    </div>
  );
};

export default Drawer;
