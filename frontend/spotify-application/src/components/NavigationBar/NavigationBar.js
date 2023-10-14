import React from "react";
import { Link } from "react-router-dom";

import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <div align="center">
            {/* <img src="NavBar.svg" className="folderTabs"/> */}
            <header className="NavigationBar">
                <nav>
                    <ul>
                        <li>
                        <Link to="/" className="nav-item home">
                            Home
                        </Link>
                        </li>
                        <li>
                        <Link to="/upload" className="nav-item home">
                            Upload
                        </Link>
                        </li>
                        <li>
                        <Link to="/playlist" className="nav-item home">
                            Playlist
                        </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>

    )
};

export default NavigationBar;