import { useEffect, useRef, useState } from 'react';
import { ReactComponent as UserIcon } from '../../assets/UserIcon.svg';
import { ReactComponent as MessageIcon } from '../../assets/MessagesIcon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/LogoutIcon.svg';

import styles from './ProfileNav.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function ProfileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useAuth();

    const navigate = useNavigate();
    
    const toggle = () => setIsOpen(!isOpen);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.ProfileDropdown} ref={dropdownRef}>
            <div className={styles.ProfileButton} onClick={toggle}>
                <UserIcon className={styles.icon}/>
            </div>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    <button className={styles.dropdownButton} onClick={() => navigate('/profile')}><UserIcon className={styles.dropdownIcon} /> Profile</button>
                    <button className={styles.dropdownButton} onClick={() => navigate('/messages')}><MessageIcon className={styles.dropdownIcon} /> Messages</button>
                    <div className={styles.divider} />
                    <button className={styles.dropdownButton} onClick={() => signOut()}><LogoutIcon className={styles.dropdownIcon} /> Sign Out</button>
                </div>
            )}
        </div>
    )
}