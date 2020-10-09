import React from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';

const NotFound = () => {
    let location = useLocation();
    return (
        <div className="mh-medium my-4 d-block"><img className="card-img w-100 d-block mh-medium o-25" src="assets/img/undraw_into_the_night_vumi.svg" />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
                <h1 className="text-center">Ah, damn.&nbsp;</h1>
                <p className="lead text-center">Looks like there's nothing here yet. Perhaps check back later?</p>
                <Link to="/" className="lead text-center">Home</Link>
                <p className="lead text-center text-danger">{location.pathname}</p>
            </div>
        </div>
    )
}

export default NotFound;