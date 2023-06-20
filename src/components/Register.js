import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './userSlice';
import {Link} from 'react-router-dom';
import { setEmail, setPassword, setValidate } from './userSlice';


const Register = () => {

    const nav = useNavigate();

    const {email, password, validate} = useSelector((state) => state.user);
    const dispatch = useDispatch();
 
    const handleEmailChange = (event) => {
      dispatch(setEmail(event.target.value));
    };
  
    const handlePasswordChange = (event) => {
      dispatch(setPassword(event.target.value));
    };
  
    const handleFormSubmit = () => {
        dispatch(registerUser());
        dispatch(setValidate())
        if(validate){
            nav('/login')
        }
        else {
            console.log("value of validate is : " +  validate)
           
        }
    };

  return (
    
	  <section>
        <div className="form-box">
            <div className="form-value">
                <div >
                    <h2>Register</h2>
                    <div className="inputbox">
                        <input type="email" required value={email} onChange={handleEmailChange}/>
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputbox">
                        <input type="password" required value={password} onChange={handlePasswordChange}/>
                        <label htmlFor="">Password</label>
                    </div>
                    
                    <button className="btn btn-secondary" onClick={handleFormSubmit} type='submit'>Register</button>
                    <div className="register">
                        <p>Already have an account?<Link to={'/login'}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register