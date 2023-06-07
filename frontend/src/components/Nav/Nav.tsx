import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Roles } from "../../types";
import Logo from '../../assets/Logo.svg';

import styles from "./Nav.module.scss";


const ContractorNav = (
    <>
    contractor
    </>
)

const HomeownerNav = (
    <>
    homeowner
    </>
);

function AuthNav() {
    const auth = useAuth()
    const role = auth.user.role;

    return (
        <div>
            {role === Roles.CONTRACTOR ?  
            ContractorNav : HomeownerNav}
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    );
}

function NoAuthNav() {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    return location === '/' ? (
        <>
            <button 
                className='signInButton' 
                onClick={() => navigate("/signin")}>Sign In</button>
            <button 
                className='signUpButton' 
                onClick={() => navigate("/signup")}>Sign Up</button>
        </>
    ) : (<></>)
}

function Nav({ auth=false }: NavProps) {
    return (
        <nav className={styles.Nav}>
            <div>
                <img alt="logo" src={Logo}/>
                <h3>Estimax</h3>
            </div>

            <div>
                {auth ? <AuthNav /> : <NoAuthNav />}
            </div>
        </nav>
    );
}

interface NavProps {
    auth?: boolean;
}



export default Nav;