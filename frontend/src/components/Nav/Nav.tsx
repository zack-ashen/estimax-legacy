import { useAuth } from "../../contexts/AuthContext";

import styles from "./Nav.module.css";
import { UserType } from "../../types";
import { useLocation } from "react-router-dom";

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
    const role = useAuth().user.userType;

    return (
        <nav>
            <div>
                <img alt="logo" />
                <h3>Estimax</h3>
            </div>

            <div>
                {role === UserType.CONTRACTOR ?  
                ContractorNav : HomeownerNav}
            </div>
        </nav>
    );
}

function NoAuthNav() {
    const location = useLocation().pathname;

    return location === '/' ? (
        <>
            Landing
        </>
    ) : (<></>)
}

function Nav({ auth=false }: NavProps) {
    return (
        <nav>
            <div>
                <img alt="logo" />
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