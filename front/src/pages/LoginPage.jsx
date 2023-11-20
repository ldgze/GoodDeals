import React, { useRef, useState } from "react";

export function LoginPage(){

    const loginFormRef = useRef(null);
    const [message, setMessage] = useState("");

    async function onSignIn(event) {
        event.preventDefault();
        const formData = new FormData(loginFormRef.current);

        const res = await fetch("/api/login/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        if (!res.ok) {
            const errorData = await res.json();
            setMessage("Sign in failed: " + errorData.msg);
            return;
        }
        setMessage("Sign in successful!");
        // Implement redirection or further actions after successful sign-in
    }

  
    async function onSignUp(event) {
        event.preventDefault();
        const formData = new FormData(loginFormRef.current);

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData.entries())),
        });

        if (!res.ok) {
            const errorData = await res.json();
            setMessage("Signup failed: " + errorData.msg);
            return;
        }
        setMessage("Signup successful, please log in.");
        // Implement further actions after successful sign-up, like clearing the form
    }

    return (
        <>
            <div className="form-signin w-100 m-auto">
                <form ref={loginFormRef} onSubmit={onSignIn}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in or sign up</h1>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="username"
                            name="username"
                        />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-primary w-50 py-2" type="submit">
                            Sign in
                        </button>
                        <button className="btn btn-secondary w-50 py-2" type="button" onClick={onSignUp}>
                            Sign Up
                        </button>
                    </div>
                    {message && <div className="alert alert-info">{message}</div>}
                </form>
            </div>
        </>
    );
}