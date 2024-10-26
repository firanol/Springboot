import {useNavigate} from "react-router-dom";
import {User} from "../App";
import './dashboard.css'

interface PropsType {
    user: User | null;
    logout: () => void;
}

export default function Dashboard({logout, user}:PropsType) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome, {user?.username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}