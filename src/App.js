import {React ,useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './contexts/notes/noteState';
import Profile from './components/Profile';
import News from './components/News';
import Logout from './components/Logout';

function App() {
   // Use state to track whether the user is logged in
   const [isLoggedIn, setIsLoggedIn] = useState(null);

   // Use useEffect to update the isLoggedIn state when the token changes
   useEffect(() => {
     setIsLoggedIn(!localStorage.getItem('token'));
     console.log("TOKEN CHANGEDDD use effect")
   }, [localStorage.getItem('token')]);
 

  return (
    <>
      {/* MUST WRAP ALL THESE COMPONENTS IN <NoteState></NoteState> TO USE ALL VARIABLES AND FUNCTIONS FROM ContextAPI */}
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/logout" element={<Logout />} />

            <Route
              exact
              path="/"
              element={
                isLoggedIn? (
                  <News key="general" pageSize={6} category="general" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              exact
              path="/sports"
              element={
                isLoggedIn ? (
                  <News key="sports" pageSize={6} category="sports" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              exact
              path="/science"
              element={
                isLoggedIn ? (
                  <News key="science" pageSize={6} category="science" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              exact
              path="/business"
              element={
                isLoggedIn ? (
                  <News key="business" pageSize={6} category="business" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              exact
              path="/entertainment"
              element={
                isLoggedIn ? (
                  <News key="entertainment" pageSize={6} category="entertainment" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
