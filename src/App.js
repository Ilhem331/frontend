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
  const tokenResponse = await axios.post('http://localhost:5000/tokenIsValid', null, {headers: {"x-auth-token": token}});
  if (tokenResponse.data) {
  const userRes = await axios.get("http://localhost:5000", {
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
