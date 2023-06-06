import React, { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./Nav.module.css";
import { UserType } from "../../types";

interface NavProps {
    landing?: boolean;
}


function Nav({ landing=false }: NavProps) {
    const [navType, setNavType] = useState<NavLinks | undefined>(landingNav)
    const [auth, setAuth] = useState<UserType | undefined>();
    try {
        const auth = useAuth();
        setAuth(auth.user.userType);
    } catch {
        setNavType(auth === UserType.CONTRACTOR ? contractorNav : homeownerNav)
        
    }

    useEffect(() => {
        if (!auth) {
            
        } else {
            
        }

    }, [auth])

    return (
        <nav>
            <div>
                <img alt="logo" />
                <h3>Estimax</h3>
            </div>

            <div>
                {navType && navType.links.map((link, index) => (
                    <a href={link.url} key={index}>{link.text}</a>
                ))}
                <div></div>
                <div>
                {navType && navType.buttons.map((element, _) => (
                    element
                ))}
                </div>
            </div>
        </nav>
    );
}

const contractorNav : NavLinks = {
    links: [
        {
            text: "contractor",
            url: "#howitworks"
        },

    ],
    buttons: [
        <button value="hi">Sign Up</button>
    ]
}

const homeownerNav : NavLinks = {
    links: [
        {
            text: "homeowner",
            url: "#howitworks"
        },

    ],
    buttons: [
        <button value="hi">Sign Up</button>
    ]
}

const landingNav : NavLinks = {
    links: [
        {
            text: "landing",
            url: "#howitworks"
        },
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "FAQ",
            url: "#faq"
        }
    ],
    buttons: [
        <button value="hi">Sign Up</button>
    ]
}

interface Link {
    text: string;
    url: string;
}

interface NavLinks {
    links: Link[];
    buttons: JSX.Element[];
}


export default Nav;