import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {

    const userLogin = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    }

    const login = async (email, password) => {
        const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email, password: password
            })
        });
        const data = await response.json();
        console.log(data);
        message(data.status, data.message);
    }

    const message = (status, text) => {
        if(status === 0){
            Swal.fire({
                title: '¡Error!',
                text: text,
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }

    return (
        <div className="login-clean">
            <form method="post" id="loginForm">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"></i>
                </div>
                <div className="form-group">
                    <input className="form-control" id="email" type="email" name="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input className="form-control" id="password" type="password" name="password" placeholder="Password" autoComplete="false" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={userLogin} type="submit">Log In</button>
                </div>
                <Link to="/forgot-password" className="forgot">Forgot your email or password?</Link>
            </form>
        </div>
    );
}

export default Login;