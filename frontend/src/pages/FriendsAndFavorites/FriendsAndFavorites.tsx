
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './FriendsAndFavorites.module.scss'
import { Contractor } from '../../types';
import { ReactComponent as PersonAdd } from '../../assets/PersonAddIcon.svg';
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import Toggles from '../../components/Inputs/Toggle/Toggle';
import InviteModal from '../../components/InviteModal/InviteModal';
import AppLayout, { PageSizes } from '../../components/AppLayout/AppLayout';


enum fnfToggles {
    CONTRACTORS = 'Contractors',
    HOMEOWNERS = 'Homeowners'
};

export default function FriendsAndFavorites() {
    const { user, useAuthReq } = useAuth();
    const authReq = useAuthReq();
    const [ friendsAndFavorites, setFriendsAndFavorites ] = useState<Contractor[]>([])
    const [ fnfType, setFnfType ] = useState(fnfToggles.CONTRACTORS);
    const [ showInviteModal, setShowInviteModal ] = useState(false);
    
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
        <AppLayout maxWidth={PageSizes.LARGE}>
        <div className={styles.FriendsAndFavorites}>
            <div className={styles.header}>
                <div className={styles.headerText}>
                    <h3 className={styles.title}>Your Friend's</h3>
                    <p className={styles.subtitle}>
                        {fnfType === fnfToggles.CONTRACTORS && 'Save your favorite contractors here so you can invite them to bid on your projects again later.'}
                        {fnfType === fnfToggles.HOMEOWNERS && 'Add family and neighbors as friends to see their favorite pros.'}
                    </p>
                </div>
                
                <div className={styles.config}>
                    <Toggles toggleStates={fnfToggles} onChange={(toggleItem) => setFnfType(toggleItem)} />
                    <Button buttonStyle={ButtonStyles.SECONDARY} onClick={() => setShowInviteModal(true)} text={'Invite'} Icon={PersonAdd} />
                </div>
            </div>

            {friendsAndFavorites.length === 0 &&
                <div className={styles.emptyFriendsAndFavorites}>
                    <h5>You have no saved {fnfType === fnfToggles.CONTRACTORS ? 'contractors.' : 'friends.'}</h5>
                    <p>
                        {fnfType === fnfToggles.CONTRACTORS && 'Add your favorite contractors now to make it easy to invite them to bid on your projects.'}
                        {fnfType === fnfToggles.HOMEOWNERS && 'Add family and neighbors as friends to see their favorite pros.'}
                    </p>
                </div>
            }
        </div>

        <InviteModal showModal={showInviteModal} setShowModal={setShowInviteModal} />
        </AppLayout>
    )
}