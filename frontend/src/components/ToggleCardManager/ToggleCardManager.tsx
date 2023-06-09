

import styles from './ToggleCardManager.module.scss'

interface ToggleCardProps {
  header: string;
  description: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isToggled?: boolean;
}


function ToggleCard({ header, description, Icon, isToggled=false }: ToggleCardProps) {
  const toggledStyle = isToggled ? 'toggled' : '';

  return (
    <div className={`${styles.ToggleCard} ${styles[toggledStyle]}`}>
      <div className={styles.leftSection}>
        <p className={styles.header}>{header}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <Icon />
    </div>
  )
}

export default function ToggleCardManager() {

}