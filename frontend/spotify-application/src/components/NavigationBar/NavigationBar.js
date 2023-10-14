import React from "react";
import {Link} from "react-router-dom";

import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <header className="NavigationBar">
            <nav>
                <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/login">
                    <li>Login</li>
                </Link>
                </ul>
            </nav>
        </header>

    )
  }; 

export default NavigationBar;