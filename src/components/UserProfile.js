import React, {useContext, useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'react-image-crop/dist/ReactCrop.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AvatarEditor from 'react-avatar-editor';
import axios from "axios";
import "./UserProfile.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import { 
    Button,
  } from '@mui/material';
import UserContext from './context/UserContext';
import {MDBIcon} from 'mdb-react-ui-kit';
import CircularProgress from "@mui/material/CircularProgress";

function UserProfile({ setOpenModal, onCoverPictureUpdate }) {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState ('');
    const {userData, setUserData} = useContext(UserContext);
    const [username, setUsername] = useState ('');
    const [pic,setPic] = useState("");
    const [coverpic,setCoverPic] = useState("");
    const [bio, setBio] = useState ('');
    const { id } = useParams();
    const [coverPicLoading, setCoverPicLoading] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(false);
    const [croppedCoverPic, setCroppedCoverPic] = useState(null);

    const [avatarEditor, setAvatarEditor] = useState(null);
const [coverEditor, setCoverEditor] = useState(null);
const [avatarImage, setAvatarImage] = useState(null);
const [coverImage, setCoverImage] = useState(null);
const gotoProfilePage = () => {

 navigate("/profile");
 window.location.reload();
}


    const hiddenFileInput = useRef(null);
    const hiddenFile = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
      };

      const handleClickInput = event => {
        hiddenFile.current.click();
      };

     

    const postDetails = (pics) => {
      setAvatarLoading(true);
        
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
      const postDetailsCover = (pics) => {
        setCoverPicLoading(true);
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
    
              setCoverPic(data.url.toString());
              console.log(coverpic);
              onCoverPictureUpdate(data.url.toString(), croppedCoverPic);
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      };

    useEffect(() => {
        
        if (userData.user) {
          setUsername(userData.user.username);
          setEmail(userData.user.email);
          setPic(userData.user.pic);
          setCoverPic(userData.user.coverpic);
          setBio(userData.user.bio);
          


          
        }
      }, [userData.user]); 

     
 

    
      
        const handelSubmit = (e) => {
            e.preventDefault();
            
  if (avatarEditor && coverEditor) {
    const avatarCanvas = avatarEditor.getImageScaledToCanvas();
    const coverCanvas = coverEditor.getImageScaledToCanvas();
    const avatarDataURL = avatarCanvas.toDataURL();
    const coverDataURL = coverCanvas.toDataURL();
        // Perform actions with the cropped avatar and cover data URLs
        console.log(avatarDataURL);
        console.log(coverDataURL);
      }
            const token = localStorage.getItem('auth-token');
          

            const dataa = {
                username,
                email,
                pic,
                coverpic,
                bio,}
                
            
          axios.post('https://react-nwgw.onrender.com/updateById', dataa,
          {
            headers: {"x-auth-token": token},
                        
        })
                    
                    .then(res => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                         
                     
                        toast.success('User updated successfully!', {
                            position: toast.POSITION.TOP_RIGHT, 
                            className: 'toast-message'
                        });
    
                        
                    } else {
                        console.log("user not found")
                    }
    
                    })
                }
    
    
                const showToastMessage = () => 
                toast.success('update successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message'
                });

            
      
      
   


            
           
     

    
        
      
            const updateuser = async(e)=>{
                e.preventDefault();
        
                 axios.put(`https://react-nwgw.onrender.com/${id}`,
                {
                    
                    username,
                    email,
                    pic,
                    coverpic,
                    bio,
                   
                })
             
                .then(res => {
                    console.log(res.data)
                    if (res.data.status === 200) {
      
                        toast.success('User updated successfully!', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                }else{
                    console.log("user not found")
                    
                }
            })
            }

          


  return (

<div className="userprofile">
        <div className="title">
          <p className="user-name">User profile</p>
        </div>
        <form className="profile-form" onSubmit={handelSubmit}>
        
        <div className="body">
        <div>
      <button className="arrow-back-button" onClick={gotoProfilePage}><ArrowBackIcon style={{width: '60px', fontSize: '32px'}}/>Go Back</button>
      </div>
        <div className="prof-user">
            <div className="cover">
                <Button onClick={handleClick} id="icon"><Avatar  alt="" src={pic} sx={{ width: 140, height: 140,  border: 'solid 3px white'}} onLoad={() => setAvatarLoading(false)}></Avatar>
                {avatarLoading ? ( // Show spinner if avatar is loading
                <div className="loading-spinner">
                <CircularProgress style={{ color: 'white'}} />
                </div>
                ) : null}
               
                <MDBIcon style={{marginTop: '140px', fontSize:'18px'}} far icon="edit mb-5"/>
               
                </Button>
                
                <input type="file" ref={hiddenFileInput} style={{display: 'none'}} onChange={(e)=> postDetails(e.target.files[0])}></input>
       
                </div>
             
              
              </div>
              
  
 
    </div>
    <div className="user-input">
      <div className="user-information">
      <div className="input-group">
    <label id="lbel" htmlFor ="uname">Username</label>
    {userData.user ? ( <input value={username} id="inpt"  onChange={(e) => setUsername(e.target.value)}></input> ): '' }
   
            <label id="lbel" htmlFor ="email">Email</label>
            {userData.user ? ( <input value={email} id="inpt" onChange={(e) => setEmail(e.target.value)} ></input> ): '' }
            <label id="lbel" htmlFor ="bio">About Me</label>
            <input value={bio}  id="int" placeholder="Add Bio" onChange={(e) => setBio(e.target.value)}/>
            </div>
        <div className="footer">
          <button
            
           className="save-button" type="submit" 
          >
            Save
          </button>
         
          </div>  
            </div>
        </div>
      
       </form>
       </div>
      

  );
}

export default UserProfile;
