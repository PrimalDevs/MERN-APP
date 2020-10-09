import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-clean">
            <form method="post">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">Log In</button>
                </div>
                <Link to="/forgot-password"className="forgot">Forgot your email or password?</Link>
            </form>
        </div>
    );
}

export default Login;