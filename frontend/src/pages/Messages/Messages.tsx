
import { useEffect, useState } from 'react'
import styles from './Messages.module.scss'
import { useAuth } from '../../contexts/AuthContext';

export default function Messages() {
    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();

    const [ messageIds, setMessageIds ] = useState<string[]>([]);


    useEffect(() => {
        authReq(`/api/user/${user.uid}/messages`, {
            method: 'GET'
        })
            .then(res => res?.json())
            .then(data => setMessageIds(data.messages))
    }, [])

    return (
        <div className={styles.Messages}>
            {messageIds.length === 0 &&
                <div className={styles.noMessages}>
                    <h3>No Messages</h3>
                    <p>You currently have no messages.</p>
                </div>
            }

            {messageIds.length >= 0 &&
            <>
            <div className={styles.messagesSidebar}>

            </div>

            <div className={styles.messageSection}>

            </div>
            </>
            }
        </div>
    )
}