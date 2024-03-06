

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to track confirm password visibility

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }

    // Check if password and confirm password are the same
    if (details.password !== details.cpassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // API CALLS
    const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: details.name, email: details.email, password: details.password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.jwttoken);
      setSuccessMessage('Welcome email sent !..  Signup successfull .. Redirecting to home page...');
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect to home page after 2 seconds
    } else {
      alert(json.error);
    }
  };

  const onnnChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='container' style={{'maxWidth':'60vw'}}>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      <h3 className='text-center my-4'>Signup page</h3>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name="name" value={details.name} onChange={onnnChange} className="form-control" id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" name="email" value={details.email} onChange={onnnChange} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={details.password}
              onChange={onnnChange}
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
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="cpassword"
              value={details.cpassword}
              onChange={onnnChange}
              className="form-control"
              id="cpassword"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsCheckbox"
            checked={termsAccepted}
            onChange={handleTermsChange}
          />
          <label className="form-check-label" htmlFor="termsCheckbox">
            I accept the terms and conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
