import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function GetUser() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); 
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/getUser");
                if (!response.ok) {
                    throw new Error("Error getting current user");
                }
                const data = await response.json();
                setUser(data.username);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUser();
    }, []);


    async function onLogout(redirectTo = "/login") {
        try {
            const response = await fetch("/api/logout", { method: "POST" });
            if (!response.ok) {
                throw new Error("Error logging out");
            }
            setUser(null);
            navigate(redirectTo);
        } catch (err) {
            setError(err.message);
        }
    }

    return { user, onLogout, error };
}
