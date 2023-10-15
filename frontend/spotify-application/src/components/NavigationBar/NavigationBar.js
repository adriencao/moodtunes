import React from "react";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <div>
            {/* <img src="NavBar.svg" className="folderTabs"/> */}
            {/* <header className="NavigationBar">
                
            </header> */}
            <nav className="NavigationBar">
                    <Link to="/" className="link home">
                        Home
                    </Link>
                    <Link to="/upload" className=" link upload">
                        Upload
                    </Link>
                    <Link to="/playlist" className="link moodboard">
                        Moodboard
                    </Link>
                </nav>
            <img src="NavBar.svg" className="folder"/>
        </div>

    )
};

export default NavigationBar;