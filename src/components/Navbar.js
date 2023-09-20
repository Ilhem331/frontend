import React , {useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import Login from "./Login";
import UserContext from "./context/UserContext";
import './Navbar.css';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PremiumModal from "./PremiumModal";






const Navbar= () => {
    
    
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const handleShow = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const [pic,setPic] = useState("");
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const handleShowPremium = () => setShowPremiumModal(true);
    const handleClosePremium = () => setShowPremiumModal(false);
    const handleShowProfile = () => setOpen(true);
    const handleCloseProfile = () => setOpen(false);

    const [dropdownOpen, setOpenDrop] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const toggle = () => setOpenDrop(!dropdownOpen);
    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleModal2 = () => setModalOpen2(!modalOpen2);
    const [menuOpen, setMenuOpen] = useState(false);

  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }
    
    const [message, setMessage] = useState('');

    const handleMouseOver = () => {
      setMessage('Manage Billing');
    }
  
    const handleMouseOut = () => {
      setMessage('');
    }
    const initialState = {
      isAuthenticated: false,
      user: null,
    };

    const menuRef = useRef();
    const imgRef = useRef();
    const modalRef = useRef();
    const profileRef = useRef();
    const logoutRef = useRef();

    useEffect(() => {
      const loggedIn = localStorage.getItem('loggedIn');
  
      if (loggedIn === 'true') {
        toast.success('Successfully signed in', {
          position: toast.POSITION.TOP_RIGHT,
          className: 'toast-message',
        });
  
        // Clear the loggedIn flag from localStorage
        localStorage.removeItem('loggedIn');
      }
    }, []);

   
    const postDetails = (pics) => {
        
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "profile-picture");
        data.append("cloud_name", "dh0yeirqu");
       
        fetch("https://api.cloudinary.com/v1_1/dh0yeirqu/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(pic);
          })
          .catch((err) => {
            console.log(err);
          });
      } 
    };

    useEffect(() => {
      if (userData.user) {
        setPic(userData.user.pic);

        
      }
    }); 
    
  const handelSubmit = (e) => {
      e.preventDefault();
      
    axios.post('http://localhost:5000/updateUser',
                {
                    
                  
                    pic,
                    
                })
              
              .then(res => {
                  console.log(res.data)
                  if (res.data.code === 200) {
                   
                    toast.success('Update successful', {
                      position: toast.POSITION.TOP_RIGHT
                  });
              }

              })
          }


      
          useEffect(() => {
            const handleClickOutside = (event) => {
              if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !imgRef.current.contains(event.target) &&
                !modalRef.current.contains(event.target) &&
                !profileRef.current.contains(event.target) &&
                !modalOpen &&
                !logoutRef.current.contains(event.target) 
                
              ) {
                setOpen(false);
              }
            };
          
            document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modalOpen]);
    
    const handleToggle = () => setOpenModal(!openModal 
      );


   
    const[isAutheticated, setisAutheticated] = useState(false);
    const navigate = useNavigate ();
    const {userData, setUserData} = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const gotoProfilePage = () => navigate("/profile");
    const gotoLoginPage = () => navigate("/login");
    const gotoPremiumPage = () => navigate("/premium");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
       

    }
  
    const authLinks = () => {
      
    }
    
    const logout = () => {
     
        setUserData({
        token: undefined,
        user: undefined
        })
        localStorage.setItem("auth-token","");
        navigate('/');
        
        
        
       
        };

      
 const showToastMessage = () => 
 toast.success('signed out!', {
     position: toast.POSITION.TOP_RIGHT,
     className: 'toast-message'
 });



 

 const notify = () => toast("Wow so easy!");

    return (
         <>
     
        
        <nav className="nav" >
		<h1 className="app-name">My application</h1>
       
    <div className="avtar" >
  

    
{userData.user ? (
  
  <button className="bn" ref={imgRef} style={{ position: 'relative', padding: '0' }} onClick={ () => setOpen(!open)} onClose={handleCloseProfile}><Avatar src={pic} sx={{ width: 42, height: 42, marginLeft: '50px', border: 'solid 2px white' }}  >
    
 </Avatar> <ArrowDropDownIcon style={{fontSize: '30px'}}/> </button> 

) : 
  


            <button  className="bouton" onClick={handleShow}  
			>Login</button>
            
        
}

</div>  
<Login  className="blur-overlay" open={openModal}  
      onClose={handleClose} /> 
       
       {open && (
  <div ref={menuRef} className="card-text-start">
    <div className="card-body px-4 py-4">
      <p className="text-center mb-2 user-avatar" style={{ color: "#222", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
        {userData.user.username}
      </p>
      <hr />
      <hr className="mb-0" style={{ margin: "0 -24px 0" }} />
      <div className="list-group list-group-flush" style={{ background: "white", margin: "0 -24px 0" }} onClick={() => setOpen(false)}>
        <button
          className="custom-list-group-item-hover list-group-item list-group-item-action px-4" style={{fontWeight: "bold", fontSize: 18}}
          onClick={gotoProfilePage}
          ref={profileRef}
        >
          <small><PersonIcon style={{margin: '3px'}}/>Profile</small>
        </button>
        <button
          className="custom-list-group-item-hover list-group-item list-group-item-action px-4"
        >
          <small></small>
        </button>
        {userData.user && (
          <button
            className="custom-list-group-item-hover list-group-item list-group-item-action px-4" style={{fontWeight: "bold", fontSize: 18}}
            ref={logoutRef}
            onClick={() => {
              logout();
              showToastMessage();
            }}
          >
            <small><LogoutIcon style={{margin: '3px'}}/>Logout</small>
          </button>
        )}
        <ToastContainer />
      </div>
      <hr style={{ margin: "0 -24px 24px" }} />
      <div>
        <button className="premium" onClick={toggleModal} ref={modalRef}>
          Premium Plan
        </button>
        <PremiumModal isOpen={modalOpen} onClose={() => setModalOpen(false)} toggle={toggleModal} />
      </div>
    </div>
  </div>
)}

</nav>

      </>

            
        

)
}
export default Navbar