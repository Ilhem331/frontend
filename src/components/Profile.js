import React , { useContext, useState,useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import "./Profile.css";
import cover_pic from "./images/cover-image.png";
import UserProfile from "./UserProfile"
import UserContext from './context/UserContext';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
export default function Profile() {
  const {userData, setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [croppedCoverPic, setCroppedCoverPic] = useState(null);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [pic,setPic] = useState("");
  const [coverpic,setCoverPic] = useState("");
  const { id } = useParams();
  
  const gotoUserProfilePage = () => navigate("/userprofile");
 

  const [ userD, setUserD] = useState({
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
    setUserD({
    token,
    user: userRes.data,
    });
    }
   if (!token) {
    window.location.replace('/')
    
   }
   
    }
    checkLoggedIn();
  
    }, []);
    useEffect(() => {
      if (userData.user) {
        setPic(userData.user.pic);
        setCoverPic(userData.user.coverpic);

        
      }
    });  
    const handleCoverPictureUpdate = (croppedCoverPicData) => {
      // Update the profile component with the cropped cover picture data
      // You can store it in state or perform any necessary updates
      console.log("Cropped cover picture data:", croppedCoverPicData);
    };
  return (
    <div className="prof">
    <div className="cover-user-profile">
      <div
        className="cover-background"
        style={{
          backgroundImage: `url(${cover_pic})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="profile-content">
        <div className="avatar-username">
          <Avatar
            className="avatar-image"
            alt="profile-picture"
            src={pic}
           
          />
          {userData.user && (
            <p className="username-avatar">
              {userData.user.username}
            </p>
          )}
        </div>
        <div className="edit-button">
          <button className="profile-button" onClick={gotoUserProfilePage}>
            Edit profile
            <EditIcon className="edit-icon-profile"/>
          </button>
          {showModal && (
            <UserProfile
              setOpenModal={setShowModal}
              onCoverPictureUpdate={handleCoverPictureUpdate}
              croppedCoverPic={croppedCoverPic}
              setCroppedCoverPic={setCroppedCoverPic}
            />
          )}
        </div>
      </div>
    </div>
  </div>    
             
  );
}
