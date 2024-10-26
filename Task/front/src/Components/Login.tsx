import React, {FormEvent, useState} from 'react';
import '../App.css';
import {User} from "../App";
import NotificationBar from "./NotificationBar";
import {useNavigate} from "react-router-dom";
import {authAction} from "../api/service/taskService";

interface PropsType {
    login: (t: User) => void;
}

function Login({login}: PropsType) {
    const [action, setAction] = useState('Login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({message: "", type: ""});
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        try {
            const {data, status} = await authAction(action, {username, password});
            if (status === 200) {
                setNotification({message: "Login successful!", type: "success"});
                login((data as User));
                setTimeout(() => navigate('/dashboard'), 500);
            } else {
                setNotification({message: "Invalid credentials!", type: "error"});
            }
        } catch (e) {
            setNotification({message: "Invalid credentials!", type: "error"});
        } finally {
            setLoading(false);
        }
    }

    const clearNotification = () => {
        setNotification({message: "", type: ""});
    };


    function switchType() {
        if (action === 'Login') {
            setAction('Register');
        } else {
            setAction('Login');
        }
    }

    return (
        <>
            <div className="login-container">
                <h2>{action}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" placeholder="Enter your username" required value={username}
                           onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" disabled={loading}>{loading ? 'Loading...' : action}</button>
                </form>
                <div className="register-option">
                    <p><a href="#" onClick={switchType}>{action === 'Login' ? 'Register' : 'Login'}</a></p>
                </div>
            </div>
            <NotificationBar
                message={notification.message}
                type={notification.type}
                clearNotification={clearNotification}
            />
        </>
    );
}

export default Login;
