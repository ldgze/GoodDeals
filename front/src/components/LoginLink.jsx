import { Link } from "react-router-dom";
import { GetUser } from "./GetUser";

export function LoginLink() {
    const { user, onLogout, error } = GetUser();

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            {user ? (
                <div>
                    Welcome {user}{" "}
                    <button className="nav-link" onClick={onLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            )}
        </>
    );
}