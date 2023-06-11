import { useLocation, useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from "../../contexts/AuthContext";
import { Roles } from "../../types";
import Logo from '../../assets/Logo.svg';

import styles from "./Nav.module.scss";
import Button, { ButtonStyles } from "../Button/Button";


const ContractorNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.navLinks}>
                <Button
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/explore')}>
                        Explore
                </Button>
                <Button
                    buttonStyle={ButtonStyles.TERTIARY}
                    onClick={() => navigate('/Dashboard')}>
                        Dashboard
                </Button>
            </div>
            {divider}
        </>
    )
}

const HomeownerNav = (
    <>
    homeowner
    </>
);

function AuthNav() {
    const auth = useAuth()
    const role = auth.user.role;

    return (
        <div className={styles.authNav}>
            {role === Roles.CONTRACTOR ?  
            <ContractorNav /> : HomeownerNav}
            <Button 
                buttonStyle={ButtonStyles.SECONDARY}
                onClick={() => auth.signOut()}>
                    Sign Out
            </Button>
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
                    onClick={() => navigate('/signin')}>Sign In</Button>
                <Button
                    buttonStyle={ButtonStyles.PRIMARY}
                    onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
        );
    } else if (location === '/signin') {
        return (
            <Button 
                buttonStyle={ButtonStyles.SECONDARY}
                onClick={() => navigate('/signup')}>Sign Up</Button>
        );
    }

    return (
        <Button 
            buttonStyle={ButtonStyles.SECONDARY}
            onClick={() => navigate('/signin')}>Sign In</Button>
    );
}

function Nav({ auth=false }: NavProps) {
    const navigate = useNavigate();

    return (
        <nav className={styles.Nav}>
            <div className={styles.logoSection} onClick={() => navigate('/')}>
                <img alt='logo' src={Logo}/>
                <h4>Estimax</h4>
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