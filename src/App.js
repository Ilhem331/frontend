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
const installButton = document.getElementById('installButton'); // Reference the button

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();

  // Store the event to show the prompt later
  deferredPrompt = e;

  // Show a custom install prompt to the user
  // You can use a button or other UI element to trigger this
  // Example: Show a button with an "Add to Home Screen" label
  installButton.style.display = 'block';
});

// Add a click event listener to your install button
installButton.addEventListener('click', () => {
  // Show the browser's install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Reset the deferredPrompt variable
    deferredPrompt = null;

    // Hide the install button
    installButton.style.display = 'none';
  });
});
   
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

       <div>
    
      <button id="installButton" style={{ display: 'none' }}>
        Add to Home Screen
      </button>
    </div>
      
  
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
