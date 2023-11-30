import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from './userContext';

export function LoginLink() {
    const { user, logout } = useContext(UserContext);

    return (
        <div className="login">
            {user ? (
                <>
                    <button onClick={logout} className="btn btn-primary">Logout</button>
                </>
            ) : (
                <Link to="/login" className="btn btn-primary">Login</Link>
            )}
        </div>
    );
}