import React, { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import ArtGeneration from './components/ArtGeneration';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import UserContext from './components/context/UserContext';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import PremiumModal from './components/PremiumModal';

const stripePromise = loadStripe('pk_test_51MqBW0DibfZFFh9BMGGX3KRkp2DzPckQVsXDCFDacETG7NXnOCSTXMDJgaBoixxkLqV7uQ0JHmkl2dm0UjCR1Om000QvFtxVq8')




function App() {
    useEffect(() => {
    let deferredPrompt;

    const beforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;

      // Show a custom toast notification with an "Install" button
      toast.info(
        <div>
          <p>Add this app to your home screen for easy access.</p>
          <button
            onClick={() => {
              // Show the browser's install prompt
              deferredPrompt.prompt();

              // Wait for the user to respond to the prompt
              deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                  console.log('User accepted the install prompt');
                } else {
                  console.log('User dismissed the install prompt');
                }
              });

              // Close the toast notification
              toast.dismiss();
            }}
          >
            Install
          </button>
        </div>,
        {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: false, // Do not auto-close the toast
        }
      );
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };
 
  const [modalOpen, setModalOpen] = useState(false);
  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
  
const [message, setMessage] = useState("");


const getWelcomeMessage = async() => {
  const requestOptions = {
    method: "GET", 
    headers: {
      "Content-Type": "application/json", 

    },
  };
  const response = await fetch("/api", requestOptions);
  const data = await response.json();

  if (!response.ok){
    console.log("something messed up");
  } else{
    setMessage(data.message);
  }
};

useEffect(() => {
  getWelcomeMessage();
}, []);
  
const [ userData, setUserData] = useState({
  token: undefined,
  user: undefined
  });
  useEffect(() => {
  const checkLoggedIn = async () => {
  let token = localStorage.getItem("auth-token");
  if(token === null){
  localStorage.setItem("auth-token", "");
  token = "";
  }
  const tokenResponse = await axios.post('https://react-nwgw.onrender.com/tokenIsValid', null, {headers: {"x-auth-token": token}});
  if (tokenResponse.data) {
  const userRes = await axios.get("https://react-nwgw.onrender.com", {
  headers: { "x-auth-token": token },
  });
  setUserData({
  token,
  user: userRes.data,
  email: userRes.data,
  });
  }
  }
  checkLoggedIn();
  }, []);




  return (
    
<>
<div className="App">
<UserContext.Provider value={{ userData, setUserData }}>
  <Navbar/>
      
  
            <Routes>
          
                <Route path='/' element={<Home />} />
                <Route path='/artgeneration' element={<ArtGeneration grid={{
                  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 3,
  xxl: 3,
}}/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />}  />
                <Route path='/userprofile' element={<UserProfile />}  />
                <Route path='/premiummodal' element={<PremiumModal />}  />
                <Route path="/premiumcomp" element={ <Elements stripe={stripePromise} options={options}>

  </Elements>
      
    
    }
     />  
                
                
            </Routes>
       <ToastContainer />
    
  </UserContext.Provider>          
</div>  

      
</> 
      
    
  );
  
}


export default App;
