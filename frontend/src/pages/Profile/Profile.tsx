import { useEffect, useState } from 'react';
import styles from './Profile.module.scss'
import { useAuth } from '../../contexts/AuthContext';

import { ReactComponent as ProfileImage } from '../../assets/UserIcon.svg'
import { Contractor, Homeowner } from '../../types';
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import { ReactComponent as PencilIcon } from '../../assets/PencilIcon.svg';

export default function Profile() {
    const { useAuthReq, user } = useAuth()!;
    const authReq = useAuthReq();
    const [ fullUser, setFullUser ] = useState<Homeowner | Contractor>();

    useEffect(() => {
        console.log(user)

        authReq(`/user/${user.uid}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setFullUser(data))
    }, [])

    return (
        <div className={styles.Profile}>
            <h4>Your Account</h4>
            <div className={styles.header}>
                <div className={styles.profileInfoContainer}>
                    <div className={styles.profileImgContainer}>
                        <ProfileImage className={styles.profileIcon}/>
                    </div>
                    <div className={styles.profileHeaderInfo}>
                        <h5>John Smith</h5>
                        <p>Homeowner</p>
                    </div>
                </div>
                <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Edit'} Icon={PencilIcon}/>
            </div>

            <div className={styles.personalInfo}>
                <div className={styles.infoContainer}>
                    <p className={styles.personalInfoHeader}>Personal Information</p>

                    <div className={styles.info}>
                        <p>Email</p>
                        <p>homeowner@estimax.com</p>
                    </div>

                    <div className={styles.twoColumnContainer}>
                        <div className={styles.info}>
                            <p>Location</p>
                            <p>Brooklyn, NY</p>
                        </div>
                        <div className={styles.info}>
                            <p>Search Radius</p>
                            <p>5 miles</p>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <p>Bio</p>
                        <p>I am  a homeowner and blah blah blah</p>
                    </div>
                </div>
                <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Edit'} Icon={PencilIcon}/>
            </div>

            <div className={styles.personalInfo}>
                <div className={styles.infoContainer}>
                    <p className={styles.personalInfoHeader}>Business Info</p>

                    
                </div>
                <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Edit'} Icon={PencilIcon}/>
            </div>

        </div>
    )
}