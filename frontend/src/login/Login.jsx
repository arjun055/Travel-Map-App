import { useRef, useState } from 'react';
import './login.css';
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

function Login({setShowLogin, myStorage, setCurrentUser}) {
  
  const [failure,setFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const user = {
        username: nameRef.current.value, 
        password: passwordRef.current.value, 
    }

    try{
      const res = await axios.post('/users/login',user);
      myStorage.setItem('user',res.data.username);
      setCurrentUser(res.data.username);
      setFailure(false);
      setShowLogin(false);
    }catch(err){
      setFailure(true);
    }
  }

  return (
    <div className='loginContainer'>
        <div className="logo">
            <RoomIcon />
            Travel Map
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='username' ref={nameRef}/>
            <input type="password" placeholder='password' ref={passwordRef}/>
            <button className='loginBtn'>Login</button>
          
            {failure &&
            <span className='failure'>Something went wrong!</span>
            }
        </form>
        <CancelIcon className='loginCancel' onClick={()=>setShowLogin(false)}/>
    </div>
  )
}

export default Login