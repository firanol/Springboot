import React, {FormEvent} from 'react';
import '../App.css';

function Register() {
    function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('Form submitted');
    }

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="username" id="username" placeholder="Enter your username" required/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required/>

                <button type="submit">Register</button>

                {/*<a href="#" className="forgot-password">Forgot password?</a>*/}
            </form>
            <div className="register-option">
                <p><a href="#">Login</a></p>
            </div>
        </div>
    );
}

export default Register;
