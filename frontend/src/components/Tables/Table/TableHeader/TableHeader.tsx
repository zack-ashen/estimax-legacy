import React from "react";
import Button, { ButtonStyles } from "../../../Button/Button";
import styles from "./TableHeader.module.scss";

interface TableHeaderProps {
  title: string;
  buttonLabel?: string;
  buttonIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onButtonClick?: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  buttonLabel,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className={styles.tableHeaderContainer}>
      <div className={styles.title}>{title}</div>
      {buttonLabel && (
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          RightIcon={buttonIcon}
          text={buttonLabel}
          onClick={onButtonClick}
        ></Button>
      )}
    </div>
  );
};

export default TableHeader;
