import { FC, useState } from "react";
import styles from './FaqItem.module.scss';
// import { ReactComponent as Chevron } from '../../../assets/icons/chevron-down.svg';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FaqItem: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.questionContainer}>
          <div className={styles.question}>{question}</div>
          <div className={styles.chevronContainer}>
            {/* <Chevron className={isOpen ? styles.chevronOpen : styles.chevronClosed} /> */}
          </div>
        </div>
      </div>
      <div className={isOpen ? styles.answerOpen : styles.answerClosed}>
        <div className={styles.answer}>
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
