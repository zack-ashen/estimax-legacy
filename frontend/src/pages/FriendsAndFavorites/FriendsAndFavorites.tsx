
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './FriendsAndFavorites.module.scss'
import { Contractor } from '../../types';
import { ReactComponent as PersonAdd } from '../../assets/PersonAddIcon.svg';
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';

export default function FriendsAndFavorites() {
    const { user, useAuthReq } = useAuth();
    const authReq = useAuthReq();
    const [ friendsAndFavorites, setFriendsAndFavorites ] = useState<Contractor[]>([])
    
    useEffect(() => {
        authReq(`/api/user/${user.uid}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => {
                const { preferredContractors } = data.user;
                authReq(`/api/contractor/multiple`, {
                    method: 'POST',
                    body: JSON.stringify({
                        contractors: preferredContractors
                    })
                })
                    .then(res => res?.json())
                    .then(data => setFriendsAndFavorites(data.contractors))
            })
    }, [])



    return (
        <div className={styles.FriendsAndFavorites}>
            <div className={styles.header}>
                <div className={styles.headerText}>
                    <h3 className={styles.title}>Your Friends and Favorites</h3>
                    <p className={styles.subtitle}>Save your favorite contractors here so you can invite them to bid on your projects again later.</p>
                </div>
                

                <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Invite'} Icon={PersonAdd} />
                
            </div>

            {friendsAndFavorites.length === 0 &&
                    <div className={styles.emptyFriendsAndFavorites}>
                        <h5>You have no saved contractors.</h5>
                        <p>Add your favorite contractors now to make it easy to invite them to bid on your projects.</p>
                    </div>
                }
        </div>
    )
}