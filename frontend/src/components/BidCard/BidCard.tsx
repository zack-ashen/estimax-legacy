import { useEffect, useState } from 'react';
import { Bid, Contractor, Roles } from '../../types';
import styles from './BidCard.module.scss'
import { useAuth } from '../../contexts/AuthContext';
import Button, { ButtonStyles } from '../Inputs/Button/Button';
import { ReactComponent as ChevronRight } from '../../assets/ChevronRightIcon.svg';
import { ReactComponent as ChevronDown } from '../../assets/ChevronDownIcon.svg';


interface BidCardProps {
    bid: Bid;
    lowestBid?: boolean;
}

function formatDate(date: Date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0'); // Month is 0-based so we add 1
    let day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
}

export default function BidCard({ bid, lowestBid = false}: BidCardProps) {
    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();
    const [ contractor, setContractor ] = useState<Contractor | undefined>()
    const [ showDescription, setShowDescription ] = useState(false);

    useEffect(() => {
        authReq(`/api/user/${bid.contractorId}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setContractor(data.user))
    }, [])

    return (
      <>
        {lowestBid && <p className={styles.lowestBidText}>Lowest Bid</p>}
        <div
            className={`${styles.BidCard} ${
                styles[lowestBid ? "lowestBidCard" : ""]
            } ${styles[user.role === Roles.HOMEOWNER ? "bidButton" : ""]}`}
        >
        <div className={styles.bidTitle}>
            <div className={styles.bidHeading}>
                <p className={styles.bidder}>{contractor && contractor.name}</p>
                {/* <p className={styles.date}>{formatDate(bid.time)}</p> */}
            </div>

            <div className={styles.bidCardRight}>
                <p className={styles.price}>${bid.amount}</p>
                {user.role === Roles.HOMEOWNER && (
                    <Button
                    buttonStyle={ButtonStyles.TERTIARY}
                    Icon={showDescription ? ChevronDown : ChevronRight}
                    onClick={() =>
                        setShowDescription((prevState) => !prevState)
                    }
                    />
                )}
            </div>
        </div>
        {showDescription && 
            <div className={styles.descriptionSection}>
                <p className={styles.titleText}>Description</p>
                <p className={styles.descriptionText}>{bid.description}</p>
            </div>
        }
        </div>
      </>
    );
}