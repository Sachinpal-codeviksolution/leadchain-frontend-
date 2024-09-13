import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const postData = async (e) => {
        e.preventDefault();
        try {
            console.log("API hit ");
            let response = await fetch(`http://localhost:8080/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            response = await response.json();
            console.log("Response", response);

            if (response.success === true) {
                const token = response.token;
                Cookies.set("token", token, { expires: 7, secure: true });
                navigate("/");
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={postData}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
