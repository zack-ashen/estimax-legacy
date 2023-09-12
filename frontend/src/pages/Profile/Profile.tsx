import { useEffect, useState } from 'react';
import styles from './Profile.module.scss'
import { useAuth } from '../../contexts/AuthContext';

import { ReactComponent as ProfileImage } from '../../assets/UserIcon.svg'
import { Contractor, Homeowner, Roles } from '../../types';
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import { ReactComponent as PencilIcon } from '../../assets/PencilIcon.svg';

export default function Profile() {
    const { useAuthReq, user } = useAuth()!;
    const authReq = useAuthReq();
    const [ fullUser, setFullUser ] = useState<Homeowner | Contractor>();

    useEffect(() => {
        console.log(user)

        authReq(`/api/user/${user.uid}`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setFullUser(data.user))
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
                        <h5>{user && user.name}</h5>
                        <p>{user && user.role}</p>
                    </div>
                </div>
            </div>

            <div className={styles.personalInfo}>
                <div className={styles.infoContainer}>
                    <p className={styles.personalInfoHeader}>Personal Information</p>

                    <div className={styles.info}>
                        <p>Email</p>
                        <p>{user && user.email}</p>
                    </div>

                    <div className={styles.twoColumnContainer}>
                        <div className={styles.info}>
                            <p>Location</p>
                            <p>{fullUser && fullUser.location} {!(fullUser?.location) && 'No location specified'}</p>
                        </div>
                        <div className={styles.info}>
                            <p>Search Radius</p>
                            <p>{fullUser && fullUser.searchRadius} {!(fullUser?.searchRadius) && 'No search radius specified'}</p>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <p>Bio</p>
                        <p>{fullUser && fullUser.bio} {!(fullUser?.bio) && 'No bio given.'}</p>
                    </div>
                </div>
                {/* <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Edit'} Icon={PencilIcon}/> */}
            </div>

            {user && user.role === Roles.CONTRACTOR &&
                <div className={styles.personalInfo}>
                    <div className={styles.infoContainer}>
                        <p className={styles.personalInfoHeader}>Business Info</p>

                        <div className={styles.info}>
                            <p>Business Name</p>
                            <p>{fullUser && (fullUser as Contractor).businessName}</p>
                        </div>

                        <div className={styles.twoColumnContainer}>
                            <div className={styles.info}>
                                <p>Phone Number</p>
                                <p>{fullUser && (fullUser as Contractor).phoneNumber}</p>
                            </div>
                            <div className={styles.info}>
                                <p>Contractor Type</p>
                                <p>{fullUser && (fullUser as Contractor).contractorType}</p>
                            </div>
                        </div>
                    </div>


                    <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => undefined} text={'Edit'} Icon={PencilIcon}/>
                </div>
            }

        </div>
    )
}