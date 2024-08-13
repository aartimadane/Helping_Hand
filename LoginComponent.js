import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./Slice";

export default function LoginComponent() {
    const init = {
        username: "",
        password: ""
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val };
            case 'reset':
                return init;
            default:
                return state;
        }
    };

    const [info, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const reduxAction = useDispatch();
    const sendData = (e) => {
        e.preventDefault();
        const reqdata = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        };

        fetch("https://localhost:7031/api/Login/CheckLogin", reqdata)
            .then(resp => {
                if (resp.status === 401) {
                    return "";
                }
                return resp.text();
            })
            .then(text => text.length ? JSON.parse(text) : {})
            .then(obj => {
                if (Object.keys(obj).length === 0) {
                    setMsg("Wrong UID or Password");
                } else {
                    reduxAction(login());
                    localStorage.setItem("LoggedUser", JSON.stringify(obj));
                    
                    if (obj.user.roleId === 1) {
                        navigate("/admin");
                    } else if (obj.user.roleId === 2) {
                        navigate("/donor");
                    } else if (obj.user.roleId === 3) {
                        navigate("/seeker");
                    } else if (obj.user.roleId === 4) {
                        navigate("/ngo");
                    }
                }
            })
            .catch(error => {
                setMsg("An error occurred: " + error.message);
            });
    };

    return (
        <div className="login-card container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4 mb-5 bg-body rounded" style={{ maxWidth: "400px", backgroundColor: "#f7f9fc", border: "1px solid #e3e6f0" }}>
                <h1 className="login-title text-center mb-4" style={{ color: "#4e73df" }}>Login</h1>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label" style={{ color: "#5a5c69" }}>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={info.username}
                                onChange={(e) => dispatch({ type: 'update', fld: 'username', val: e.target.value })}
                                placeholder="Enter your username"
                                required
                                style={{ border: "1px solid #d1d3e2", borderRadius: "0.35rem" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: "#5a5c69" }}>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={info.password}
                                onChange={(e) => dispatch({ type: 'update', fld: 'password', val: e.target.value })}
                                placeholder="Enter your password"
                                required
                                style={{ border: "1px solid #d1d3e2", borderRadius: "0.35rem" }}
                            /> 
                        </div>
                        <div className="button-group d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#4e73df", borderColor: "#4e73df" }}>Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })} style={{ backgroundColor: "#858796", borderColor: "#858796" }}>Clear</button>
                        </div>
                    </form>
                    <div className="register-link-container mt-4 text-center">
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => navigate("/orgreg")}
                            style={{ color: "#4e73df" }}
                        >
                           Don't have an account? Create an account
                        </button>
                    </div>
                    {msg && <p className="text-danger text-center mt-3">{msg}</p>}
                </div>
            </div>
        </div>
    );
}
