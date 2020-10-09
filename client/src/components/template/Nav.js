import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ setToggleButton, toggleButton }) => {

    const toggle = () => {
        if (toggleButton == 'active') {
            setToggleButton('');
        } else {
            setToggleButton('active');
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={toggle}>
                    <i className="fas fa-align-left"></i>
                    <span>Menu</span>
                </button>
                <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-align-justify"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Page</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Page</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Nav;