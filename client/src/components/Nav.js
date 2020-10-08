import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar navbar-light navbar-expand-md navigation-clean">
            <div className="container"><a className="navbar-brand" href="#">PrimalDevps</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse"
                    id="navcol-1">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Registro</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Nav;