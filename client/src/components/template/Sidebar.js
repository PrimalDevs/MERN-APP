import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({toggleButton}) => {
    // 
    return (
        // className={`todo-item ${todo.completed ? "completed" : " "}`}>
        <nav id="sidebar" className={`sidebar ${toggleButton ? "active" : " "}`}>
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