import React, { useState, useRef} from "react"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";




export default function Login ({open, onClose}) {
  let [authMode, setAuthMode] = useState("login")
  const modalRef = useRef();
  const [error,setError]=useState(false)
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [username, setUsername] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [ user, setUser ] = useState([]);
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  if (!open) return null;





  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
    


    const emailValidation = () => {
      const regEx = /^\S+@\S+\.\S+$/;
      if (!regEx.test(email) && email !== "") {
        setMessage("Invalid email");
      } else {
        setMessage("");
      }
    };
    
    const changeAuthMode = () => {
      setAuthMode(authMode === "login" ? "signup" : "login")
    }
    
 

const handelSubmit = (e) => {
  e.preventDefault();
  if(username.length==0||email.length==0 ||password.length==0 ){
    setError(true)
}
axios.post('https://react-app-gubf.onrender.com/register',
            {
                username: username,
                email: email,
                password: password,
                pic: pic,
            })
            .then(res => {
                console.log(res.data)
                if (res.data.code === 400) {
                  toast.error('Please provide a valid email address.', {
                    position: toast.POSITION.TOP_RIGHT
                });
              }
              if (res.data.code === 402) {
                toast.error('An account with this email already exists.', {
                  position: toast.POSITION.TOP_RIGHT
              });
            }

            if (res.data.code === 200) {
              toast.success('Successfully signed up', {
                position: toast.POSITION.TOP_RIGHT,
              });
             
              setAuthMode("login");
            } 
            }).catch(err => {
                console.log(err)
            })
    

}





const submit = async (e) => {
  e.preventDefault();
  if (email.length === 0 || password.length === 0) {
    setError(true);
    return;
  }

  axios
    .post('https://react-app-gubf.onrender.com/login-user', {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res.data);

      if (res.data.code === 400) {
        toast.error('Invalid email or password', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (res.data.code === 200) {
        window.localStorage.setItem('auth-token', res.data.token);
        onClose(); // Hide the login modal

        // Reset the form fields
        setEmail('');
        setPassword('');

        // Set a flag in localStorage to indicate successful login
        localStorage.setItem('loggedIn', 'true');

        // Refresh the page
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


  if (authMode === "login") {  
    return (
  
        <div  onClick={onClose} className='overlay blur-background'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer '
      >
       <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
        
        <div className="auth-form-container">
            <p style={{fontSize: '40px', fontWeight: '700', color: '#484848', marginTop: '-60px'}}>Sign In</p>
            
        <form className="login-form" onSubmit={submit}>
            <label htmlFor ="email" style={{color: '#484848', fontSize: '18px',
            fontWeight: '600'}}>Enter Email</label>
            <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"  name="email" id="in" autocomplete="new-password"/>
            {error&&email.length<=0&&
             <div className="notification">Please enter your email</div>}
            <label htmlFor ="password" style={{color: '#484848', fontSize: '18px',
            fontWeight: '600'}}>Enter Password</label>
            <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="in"  name="password"/>
            {error&&password.length<=0 &&
             <div className="notification">Please enter your password</div>}
            <button className="butn1" >Log In</button> 
            <p className="message">{message}</p>
        
        </form> 

        
                    
        <button className="link-btn" onClick={changeAuthMode}>Don't have an account? Sign up here.</button>
        </div>
        
        </div>
        
        </div>
        </div>
       
        )}
        

        return (
        <div  onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
       <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
        
        <div className="auth-form-container">
        <p style={{fontSize: '40px', fontWeight: '700', color: '#484848', marginTop: '-60px'}}>Sign Up</p>
       <form className="register-form" onSubmit={handelSubmit}>
            <label style={{color: '#484848', fontSize: '18px',
            fontWeight: '600'}} htmlFor ="username">Full name</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="in" placeholder="Full Name" autocomplete="new-password"/>
            {error&&username.length<=0&&
             <div className="notification">Please enter  username</div>}
            <label style={{color: '#484848', fontSize: '18px',
            fontWeight: '600'}} for ="email">Enter email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="in" name="email" autocomplete="new-password"/>
            {error&&email.length<=0&&
             <div className="notification">Please enter email</div>}
            <label style={{color: '#484848', fontSize: '18px',
            fontWeight: '600'}} for ="password">Enter password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="in" name="password"/>
            {error&&password.length<=0&&
                <div className="notification">Please enter password</div>}
            <button ref={modalRef} className="butn1" onClick={emailValidation}
            >Sign Up </button>
            <p className="message">{message}</p>
        </form> 
        <button className="link-btn" onClick={changeAuthMode}>Already have an account? Login here.</button>
       </div>
       </div>
       </div>
       </div>
       
        
        
  
    );
          
  }

  
