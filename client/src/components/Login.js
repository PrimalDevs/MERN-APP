import React from 'react';

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
                </div><a className="forgot" href="#">Forgot your email or password?</a>
            </form>
        </div>
    );
}

export default Login;