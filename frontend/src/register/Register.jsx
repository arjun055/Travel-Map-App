import './register.css';
import RoomIcon from '@mui/icons-material/Room';

function Register() {
  return (
    <div className='registerContainer'>
        <div className="logo">
            <RoomIcon />
            Travel Map
        </div>
        <form>
            <input type="text" placeholder='username'/>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <button className='registerBtn'>Register</button>
            <span className='success'>Successfull. You can Login now!</span>
            <span className='failure'>Something went wrong!</span>
        </form>
    </div>
  )
}

export default Register