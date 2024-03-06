import React from 'react'
import { Link } from "react-router-dom";
import NoteContext from '../contexts/notes/noteContext';
import { useEffect,useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const items = useContext(NoteContext);
    const { userDetails,getuserdetails} = items;
    const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Perform client-side validation if needed

    try {
      const response = await fetch('http://localhost:3000/api/auth/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "given-auth-token" : localStorage.getItem('token')
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Password reset was successful, handle success scenario
        alert('Password reset successful');
        setCurrentPassword(null);
        setNewPassword(null);
      } else {
        // Handle error scenario
        alert(data.error);
      }
    } catch (error) {
      console.error('An error occurred during password reset:', error.message);
    }
  };
    
  let navigate = useNavigate();

      useEffect(() => {
    const fetchUserDetails = async () => {
      if (localStorage.getItem('token')) {
        await getuserdetails();
      } else {
        navigate('/login'); // redirect to login page if not login
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="d-flex flex-column justify-content-spacearound align-items-center vh-100">
      <div className="card text-center my-5" style={{ width: '300px', height: '180px' }}>
        <div className="card-body">
          <h5 className="card-title my-3">Name: {userDetails.name}</h5>
          <h6 className="card-text my-3">Email: {userDetails.email}</h6>
          <Link to="/" className="btn btn-primary">
            Go back
          </Link>
        </div>
      </div>
      <div className="container my-3">
        <h5 className="text-center">Reset Password</h5>
        <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Old Password
              </label>
              <div className="input-group">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="input-group">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Reset password
            </button>
          </form>
</div>
    </div>
   
    </>
  );
}
