import React, { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./Nav.module.css";

interface NavProps {
    landing?: boolean;
}


function Nav({ landing=false }: NavProps) {
    const auth = useAuth();
    const [navType, setNavType] = useState(landingNav)

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
                <ul>

                </ul>
                <div></div>
                <div>

                </div>
            </div>
        </nav>
    );
}

const contractorNav : NavLinks = {
    links: [
        {
            text: "How It Works",
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
            text: "How It Works",
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
            text: "How It Works",
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