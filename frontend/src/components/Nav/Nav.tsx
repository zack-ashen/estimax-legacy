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


interface NavLinkProps {
    route: string;
    text: string;
}

const NavLink = ({ route, text }: NavLinkProps) => {
    return (
        <div className={styles.NavLink}>
            <a href={route} className={styles.navLinkText}>{text}</a>
        </div>
    )
}

const NavLinks = () => {
    const auth = useAuth()
    const role = auth.user.role;

    return (
        <div className={styles.NavLinks}>
            {role === Roles.CONTRACTOR ?  
                <ContractorNav /> : <HomeownerNav />}
        </div>
    );
}

const ContractorNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button 
                buttonStyle={ButtonStyles.TERTIARY}
                onClick={() => navigate('/explore')}
                text={'Find Projects'} />
            <Button 
                buttonStyle={ButtonStyles.TERTIARY}
                onClick={() => navigate('/dashboard')}
                text={'Dashboard'} />
        </>
    )
}

const HomeownerNav = () => {
    const navigate = useNavigate();

    return (
        <>
        <Button 
                buttonStyle={ButtonStyles.TERTIARY}
                onClick={() => navigate('/explore')}
                text={'Find Contractors'} />
        <Button 
                buttonStyle={ButtonStyles.TERTIARY}
                onClick={() => navigate('/manage-projects')}
                text={'Manage Projects'} />
        <Button
            buttonStyle={ButtonStyles.PRIMARY}
            onClick={() => navigate('/post-project')}
            Icon={PlusIcon}
            text={'Create Project'} />
        </>
    );
}

function AuthNav() {
    const auth = useAuth()
    const role = auth.user.role;

    
    return (
        <div className={styles.authNav}>
            <NavLinks />
            <ProfileNav />
        </div>
    );
}

function NoAuthNav() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    if (location === '/') {
        return (
            <>
                <a href='#how-it-works'>How It Works</a>
                <a href='#features'>Features</a>
                <a href='#faq'>FAQ</a>
                {divider}
                <Button 
                    buttonStyle={ButtonStyles.SECONDARY}
                    onClick={() => navigate('/signin')}
                    text={'Sign In'} />
                <Button
                    buttonStyle={ButtonStyles.PRIMARY}
                    onClick={() => navigate('/signup')}
                    text={'Sign Up'} />
            </>
        );
    } else if (location === '/signin') {
        return (
            <Button 
                buttonStyle={ButtonStyles.SECONDARY}
                onClick={() => navigate('/signup')}
                text={'Sign Up'} />
        );
    }

    return (
        <Button 
            buttonStyle={ButtonStyles.SECONDARY}
            onClick={() => navigate('/signin')}
            text={'Sign In'} />
    );
}

function Nav({ auth=false }: NavProps) {
    const navigate = useNavigate();

    return (
        <nav className={styles.Nav}>
            <div className={styles.logoSection} onClick={() => navigate('/')}>
                <img alt='logo' src={Logo}/>
                <h5>Estimax</h5>
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