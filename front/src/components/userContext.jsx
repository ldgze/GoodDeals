import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/getUser");
                if (!response.ok) {
                    throw new Error("Error getting current user");
                }
                const data = await response.json();
                console.log("Fetched user data:", data);
                setUser({  id: data.id, email: data.email, username:data.username});
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        alert("You have been successfully logged in!");
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (!response.ok) {
                throw new Error("Error logging out");
            }
            setUser(null);
            localStorage.removeItem('userToken');
            alert("You have been logged out.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, error }}>
            {children}
        </UserContext.Provider>
    );
};
