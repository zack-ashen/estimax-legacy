import styles from './Footer.module.scss'

export default function Footer() {

    return (
      <div className={styles.container}>
        <div className={styles.topContent}>
          <p>LOGO</p>
          <p>Some sort of nav thing here</p>
        </div>
        <div className={styles.copyrightContent}>
          <div className={styles.copyrightLeft}>
            Copyright © 2023 Estimax Inc. All rights reserved.
          </div>
          <div className={styles.copyrightRight}>
            Right side
          </div>
        </div>
      </div>
    )
}