
import { useState } from 'react';
import Button, { ButtonStyles } from '../Inputs/Button/Button';
import styles from './Filter.module.scss';
import { ReactComponent as ResetIcon } from '../../assets/ResetIcon.svg';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRightIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDownIcon.svg';


interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
  }
  
export const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div className={styles.filterItem}>
        <div className={styles.filterItemHeader}>
          <p className={styles.itemHeader}>{title}</p>
          <Button
            buttonStyle={ButtonStyles.LINK}
            onClick={() => setVisible((vis) => !vis)}
            Icon={visible ? ChevronDown : ChevronRight}
          />
        </div>
        <div className={`${styles[visible ? 'filterContent' : 'hidden']}`}>
          {children}
        </div>
      </div>
    );
  };

interface FilterProps extends React.PropsWithChildren {
    reset: () => void;
}

export default function Filter({ children, reset }: FilterProps) {

    return (
        <div className={styles.Filter}>
            <div className={styles.filterHeaderContainer}>
                <p className={styles.filterHeader}>Filter</p>
                <Button buttonStyle={ButtonStyles.TERTIARY} text='Reset' onClick={reset} Icon={ResetIcon} />
            </div>
            {children}
        </div>
    )
}