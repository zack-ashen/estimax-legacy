
import styles from './HeroIllustration.module.scss'
import HeroImage from '../../assets/HeroImageKitchen.jpeg';

export default function HeroIllustration() {


    return (
        <div className={styles.HeroIllustration}>
            <div className={styles.projectTitleContainer}>
                <p className={styles.projectHeader}>
                    Project Name
                </p>
                <p className={styles.projectTitle}>
                    Kitchen Renovation (New Countertop, Cabinets, Backsplash, etc)
                </p>
            </div>
            <div className={styles.imgContainer}>
                <img src={HeroImage} alt={'kitchen in need of renovation'} />
            </div>
            <div className={styles.bidCTA}>
                <div className={styles.bidContainer}>
                    <p className={styles.bidPriceTitle}>Current Bid</p>
                    <div className={styles.bidPriceContainer}>
                        <h4 className={styles.bidPrice}>$1,205</h4>
                        <p className={styles.priceIncrease}>+ $347</p>
                    </div>
                </div>
            </div>
        </div>
    )
}