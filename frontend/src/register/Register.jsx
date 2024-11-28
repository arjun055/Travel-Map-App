import { useRef, useState } from 'react';
import './register.css';
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

function Register({setShowRegister}) {
  
  const [success,setSuccess] = useState(false);
  const [failure,setFailure] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const newUser = {
        username: nameRef.current.value, 
        email: emailRef.current.value, 
        password: passwordRef.current.value, 
    }

    try{
        await axios.post('/users/register',newUser);
        setFailure(false);
        setSuccess(true);
    }catch(err){
        setFailure(true);
    }
  }

  return (
    <div className='registerContainer'>
        <div className="logo">
            <RoomIcon />
            Travel Map
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='username' ref={nameRef}/>
            <input type="email" placeholder='email' ref={emailRef}/>
            <input type="password" placeholder='password' ref={passwordRef}/>
            <button className='registerBtn'>Register</button>
            {success && 
            <span className='success'>Successfull. You can Login now!</span>
            }

            {failure &&
            <span className='failure'>Something went wrong!</span>
            }
        </form>
        <CancelIcon className='registerCancel' onClick={()=>setShowRegister(false)}/>
    </div>
  )
}

export default Register