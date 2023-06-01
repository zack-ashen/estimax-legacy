import React from "react";


interface NavProps {
    children: React.ReactElement<{}>;
}


function Nav({ children }: NavProps) {
    

    return (
        <nav>
            <div>
                <img alt="logo" />
                <h3>Estimax</h3>
            </div>

            <div>
                <ul>

                </ul>
            </div>
        </nav>
    );

}

export default Nav;