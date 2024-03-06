import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [details, setDetails] = useState({ email: "", password: "" });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: details.email, password: details.password }),
        });

        const json = await response.json();

        if (json.success) {
            // Set success message
            setSuccessMessage('Login successful');
            // Store user's JWT token in local storage
            localStorage.setItem('token', json.jwttoken);
        } else {
            // Set error message
            setErrorMessage('Login failed - Invalid credentials');
        }
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        // Check if there is a success message (indicating successful login)
        if (successMessage) {
            // Redirect to home page after a short delay to ensure the component is fully rendered
            const redirectTimeout = setTimeout(() => {
                navigate("/");
            }, 1000);

            return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
        }
    }, [successMessage, navigate]);

    return (
        <div className="container my-4" style={{'maxWidth':'60vw'}}>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
                <h3 className='text-center my-4'>Login page</h3>

            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={onChange}
                            className="form-control"
                            id="password"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
