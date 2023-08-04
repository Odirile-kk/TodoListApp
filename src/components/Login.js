import { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './userSlice';
import { setEmail, setPassword, setValidate } from './userSlice';

const Login = () => {

  const nav = useNavigate()
    
    const {email, password, validate} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log("this is validate before " + validate)
    const handleEmailChange = (event) => {
      dispatch(setEmail(event.target.value));
    };
  
    const handlePasswordChange = (event) => {
      dispatch(setPassword(event.target.value));
    };

    const handleFormSubmit = () => {
      dispatch(loginUser());
      dispatch(setValidate())
      if(validate === true){
          nav('/todolist')
      }
      else {
          console.log("value of validate is : " +  validate)
          window.location.reload()
      }
    };

  return (
    <section>
        <div className="form-box">
            <div className="form-value">
                <div >
                    <h2>Login</h2>
                    
                    <div className="inputbox">
                        <input type="email" required value={email} onChange={handleEmailChange} />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputbox">
                        <input type="password" required value={password} onChange={handlePasswordChange}/>
                        <label htmlFor="">Password</label>
                    </div>
                    <button className="btn btn-secondary" onClick={handleFormSubmit}>Login</button>
                   
                    <div className="register">
                        <p >Don't have a account? <Link to={'/'}>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login