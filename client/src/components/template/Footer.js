import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer-basic">
            <footer>
                <div className="social">
                    <Link to="/instagram"><i className="icon ion-social-instagram"></i></Link>
                    <Link to="/snapchat"><i className="icon ion-social-snapchat"></i></Link>
                    <Link to="/twitter"><i className="icon ion-social-twitter"></i></Link>
                    <Link to="/facebook"><i className="icon ion-social-facebook"></i></Link>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/services">Services</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/about">About</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/terms">Terms</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                </ul>
                <p className="copyright">PrimalDevps © 2020</p>
            </footer>
        </div>
    );
}

export default Footer;