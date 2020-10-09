import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    // 
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>MERN-App</h3>
            </div>
            <ul className="list-unstyled components">
                <p>Menu</p>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Users</a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;