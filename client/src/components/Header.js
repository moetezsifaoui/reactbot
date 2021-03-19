import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <nav>
            <ul>
                <li><link to={'/shop'}> Shop </link></li>
                <li><link to={'/about'}> About us </link></li>
            </ul>
        </nav>
    )
};

export default Header;