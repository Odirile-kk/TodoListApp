import React from 'react'
import {useNavigate} from 'react'
import { Link } from 'react-router-dom';

const login = () => {
  return (
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>Login</h2>
                    <div class="inputbox">
                        <input type="email" required/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" required/>
                        <label for="">Password</label>
                    </div>
                    <Link to='/todolist' class="btn btn-secondary">Login</Link>
                   
                    <div class="register">
                        <p >Don't have a account? <a href="Register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default login