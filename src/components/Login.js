import React from 'react'
import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
      };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        // Validate user input
        if (email && password) {
          // Check if user exists and credentials are correct
          const response = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
          if (response.data.length > 0) {
            handleLogin();
            alert('login successful');
            nav('/todolist');
          } else {
            alert('Invalid email or password');
            window.location.reload();
          }
        } else {
          alert('Please enter both email and password');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };


  return (
    <section>
        <div class="form-box">
            <div class="form-value">
                <form onSubmit={handleFormSubmit}>
                    <h2>Login</h2>
                    <div class="inputbox">
                        <input type="email" required value={email} onChange={handleEmailChange} />
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" required value={password} onChange={handlePasswordChange}/>
                        <label for="">Password</label>
                    </div>
                    <button type="submit" class="btn btn-secondary">Login</button>
                   
                    <div class="register">
                        <p >Don't have a account? <a href="Register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login