import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from "../../contexts/AuthContext";
import { Roles } from "../../types";
import Logo from '../../assets/Logo.svg';

import styles from "./Nav.module.scss";
import Button, { ButtonStyles } from "../Inputs/Button/Button";
import ProfileNav from '../ProfileNav/ProfileNav';

import { ReactComponent as DashboardIcon } from '../../assets/DashboardIcon.svg'
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg'
import { ReactComponent as PlusIcon } from '../../assets/PlusIcon.svg'
import { ReactComponent as FriendsIcon } from '../../assets/FriendsIcon.svg'
import TextInput from '../Inputs/TextInput/TextInput';


const ContractorNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.navLinks}>
                <Button 
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/explore')}
                    text={'Find Projects'} 
                    Icon={SearchIcon} />
                <Button 
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/dashboard')}
                    text={'Dashboard'}
                    Icon={DashboardIcon} />
            </div>
            <div className={styles.navButtonContainer}>
                <TextInput name='Search' value={''} onChange={() => undefined} Icon={SearchIcon} noLabel/>
                <ProfileNav />
            </div>
        </>
    )
}

const HomeownerNav = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className={styles.navLinks}>
            <Button 
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/find-contractors')}
                    text={'Find Contractors'} 
                    Icon={SearchIcon} />
            <Button 
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/manage-projects')}
                    text={'Manage Projects'} 
                    Icon={DashboardIcon} />
            <Button 
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/friends-and-favorites')}
                    text={'Friends and Favorites'} 
                    Icon={FriendsIcon} />
        </div>
        <div className={styles.navButtonContainer}>
            <Button
                buttonStyle={ButtonStyles.PRIMARY}
                onClick={() => navigate('/post-project')}
                Icon={PlusIcon}
                text={'Create Project'} />
            <ProfileNav />
        </div>
        </>
    );
}

function AuthNav() {
    const auth = useAuth()
    const role = auth.user.role;

    
    return (
        <>
            {role === Roles.CONTRACTOR ?  
            <ContractorNav /> : <HomeownerNav />}
        </>
    );
}

function NoAuthNav() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    if (location === '/') {
        return (
            <> 
                <div>
                <a href='#how-it-works'>How It Works</a>
                <a href='#features'>Features</a>
                <a href='#faq'>FAQ</a>
                </div>

                <div className={styles.navButtonContainer}>
                    <Button 
                        buttonStyle={ButtonStyles.SECONDARY}
                        onClick={() => navigate('/signin')}
                        text={'Sign In'} />
                    <Button
                        buttonStyle={ButtonStyles.PRIMARY}
                        onClick={() => navigate('/signup')}
                        text={'Create an Account'} />
                </div>
            </>
        );
    } else if (location === '/signin') {
        return (
            <>
            <div></div>
            <div className={styles.navButtonContainer}>
                <Button 
                    buttonStyle={ButtonStyles.SECONDARY}
                    onClick={() => navigate('/signup')}
                    text={'Sign Up'} />
            </div>
            </>
        );
    }

    return (
        <>
        <div></div>
        <div className={styles.navButtonContainer}>
            <Button 
                buttonStyle={ButtonStyles.SECONDARY}
                onClick={() => navigate('/signin')}
                text={'Sign In'} />
        </div>
        </>
    );
}

function Nav({ auth=false }: NavProps) {
    const navigate = useNavigate();

    return (
        <nav className={styles.Nav}>
            <div className={styles.logoSection} onClick={() => navigate('/')}>
                <img alt='logo' src={Logo}/>
                <h5>Estimax <span className={styles.betaTag}>BETA</span></h5>
            </div>

            <div className={styles.navItems}>
                {auth ? <AuthNav /> : <NoAuthNav />}
            </div>
        </nav>
    );
}

const divider = (
    <div className={styles.divider}></div>
)

interface NavProps {
    auth?: boolean;
}



export default Nav;