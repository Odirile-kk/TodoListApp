import {useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";


const Register = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const nav = useNavigate();

  const handleRegistration = () => {
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
          // Check if user already exists
          const response = await axios.get(`http://localhost:3001/users?email=${email}`);
          if (response.data.length > 0) {
            alert('Email already registered');
            window.location.reload();
          } else {
            // Create new user
            const newUser = { email, password };
            await axios.post('http://localhost:3001/users', newUser);
            handleRegistration();
            alert('registered successfully');
            nav('/');
          }
        } else {
          setError('Please fill in all fields');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };




  return (
    
	  <section>
        <div class="form-box">
            <div class="form-value">
                <form onSubmit={handleFormSubmit}>
                    <h2>Register</h2>
                    <div class="inputbox">
                        <input type="email" required value={email} onChange={handleEmailChange}/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" required value={password} onChange={handlePasswordChange}/>
                        <label for="">Password</label>
                    </div>
                    
                    <button class="btn btn-secondary" type='submit'>Register</button>
                    <div class="register">
                        <p>Already have an account?<a href="login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register