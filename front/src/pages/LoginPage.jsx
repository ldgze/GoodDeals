import { AppNavBar } from "../layout/AppNavBar"

export function LoginPage(){
    return (
        <>
        <div className="form-signin w-100 m-auto">
            <form ref={loginFormRef} action="/api/login/password" method="post">
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
                <button
                className="btn btn-secondary w-50 py-2"
                type="button"
                onClick={onSignUp}
                >
                Sign Up
                </button>
            </div>
            </form>
        </div>
        </>
    );
}

