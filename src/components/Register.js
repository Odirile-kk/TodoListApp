import {useNavigate} from 'react'
import { Link} from 'react-router-dom';


const register = () => {
  return (
    
	  <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2>Register</h2>
                    <div class="inputbox">
                        <input type="email" required/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <input type="password" required/>
                        <label for="">Password</label>
                    </div>
                    
                    <Link to='/login' class="btn btn-secondary">Register</Link>
                    <div class="register">
                        <p>Already have an account?<a href="login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default register