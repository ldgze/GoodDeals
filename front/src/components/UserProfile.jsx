import React, { useContext } from "react";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";

export function UserProfile() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h1>User Profile: {user.username}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}