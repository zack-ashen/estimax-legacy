import Button, { ButtonStyles } from "../../../../components/Button/Button";
import { Copy } from "../copy";
import styles from "./Faq.module.scss";
import FaqItem from "./FaqItem";

export default function Faq() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h3>FAQ</h3>
        <div className={styles.contactUsText}>
          Can't find the answer you're looking for?
        </div>
        <Button
          buttonStyle={ButtonStyles.SECONDARY}
          text="Get in touch"
          onClick={() => {}}
        />
      </div>
      <div className={styles.faqContainer}>
        {Copy.faq.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <FaqItem {...faq} />
          </div>
        ))}
      </div>
    </div>
  );
}
