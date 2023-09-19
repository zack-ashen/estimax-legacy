import { Contractor } from '../../types'
import styles from './ContractorCard.module.scss'
import { ReactComponent as ProfileImage } from '../../assets/UserIcon.svg'
import { ReactComponent as PersonAdd } from '../../assets/PersonAddIcon.svg';
import { ReactComponent as Star } from '../../assets/StarIcon.svg';
import Button, { ButtonStyles } from '../Inputs/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';


interface ContractorCardProps {
    contractor: Contractor;
}

export default function ContractorCard({ contractor }: ContractorCardProps) {
    const { user, useAuthReq } = useAuth();
    const navigate = useNavigate();
    const authReq = useAuthReq();
    const [ isFavorite, setIsFavorite ] = useState(false)
    
    useEffect(() => {
        authReq(`/api/user/${user.uid}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => {
                const favorites : string[] = data.user.preferredContractors;
                favorites.forEach((favorite, index) => {
                    if (favorite === contractor.uid) {
                        setIsFavorite(true);
                    }

                    if (index === favorites.length-1) {
                        setIsFavorite(false);
                    }
                })
            })
    }, [])

    const favoriteContractor = () => {
        
    }

    return (
        <div className={styles.ContractorCard} /*onClick={() => navigate(`/project/${contractor.uid}`)}*/>
            <div className={styles.info}>
                <div className={styles.profileImgContainer}>
                    <ProfileImage className={styles.profileIcon}/>
                </div>
                <div className={styles.details}>
                    <p className={styles.header}>{contractor.businessName}</p>
                    <p className={styles.subtitle}>{contractor.securedProjects.length} Completed Projects</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button buttonStyle={ButtonStyles.TERTIARY} onClick={() => undefined} text={'Favorite'} Icon={Star} />
                <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Invite'} Icon={PersonAdd} />
            </div>
        </div>
    )
}