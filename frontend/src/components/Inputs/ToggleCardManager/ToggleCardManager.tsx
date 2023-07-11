import { useEffect, useState } from 'react';
import styles from './ToggleCardManager.module.scss'


function Card({ card, isToggled, onClick}: ToggleCardProps) {
  const toggledStyle = isToggled ? 'toggled' : '';

  const { header, description, Icon } = card;

  return (
    <div className={`${styles.ToggleCard} ${styles[toggledStyle]}`} onClick={onClick}>
      <div className={styles.leftSection}>
        <p className={styles.header}>{header}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Icon />
    </div>
  )
}



export default function ToggleCardManager({ cards, toggleSwitch, toggled }: ToggleCardManagerProps) {
  const [toggledCard, setToggledCard] = useState(toggled);

  useEffect(() => {
    if (toggledCard !== '')
      toggleSwitch(toggledCard)

  }, [toggledCard, toggleSwitch])


  return (
    <div className={styles.ToggleCardManager}>
      {cards.map((card, index) => (
        <Card
          card={card}
          key={index}
          isToggled={toggledCard === card.state}
          onClick={() => setToggledCard(card.state)}
        />
      ))}
    </div>
  );

}

export interface ToggleCard {
  state: string;
  header: string;
  description: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

interface ToggleCardManagerProps {
  cards: ToggleCard[],
  toggleSwitch: (state: string) => void;
  toggled: string;
}

interface ToggleCardProps {
  card: ToggleCard;
  isToggled?: boolean;
  onClick: () => void;
}