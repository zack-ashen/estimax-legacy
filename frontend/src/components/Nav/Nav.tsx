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
import ProjectSearch from '../ProjectSearch/ProjectSearch';


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
                <ProjectSearch />
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
    const location = useLocation();

    const smallWidth = ['/project/', '/', '/signin', '/signup', '/post-project/'].includes(location.pathname);

    return (
        <div className={styles.navContainer}>
            <nav className={`${styles.Nav} ${styles[smallWidth ? 'smallWidthNav' : '']}`}>
                <div className={styles.logoSection} onClick={() => navigate('/')}>
                    <img alt='logo' src={Logo}/>
                    <h5 className={styles.logoText}>Estimax <span className={styles.betaTag}>BETA</span></h5>
                </div>

                <div className={styles.navItems}>
                    {auth ? <AuthNav /> : <NoAuthNav />}
                </div>
            </nav>
        </div>
    );
}

const divider = (
    <div className={styles.divider}></div>
)

interface NavProps {
    auth?: boolean;
}



export default Nav;