import React, {useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import UserContext from "./context/UserContext";
import { FaChevronDown } from 'react-icons/fa';
import house from "./images/house.png";
import art1 from "./images/realism.png";
import art4 from "./images/man-moon.png";
import art2 from "./images/fantasm.png";
import art3 from "./images/colorPainting.png";
import anime3 from "./images/anime.png";
import lune from "./images/lune.png";
import cat from "./images/cat.png"
import hdr from "./images/hdr3.jpg";
import resolution from "./images/resolution.png";
import hyperreal from "./images/hyperreal.png";
import artstation from "./images/artstation.png";
import sd1 from "./images/sd1.png";
import girl from "./images/girl.png";
import artColor from "./images/art-color.png";
import sd2 from "./images/sd2.png";
import sd3 from "./images/sd3.png";
import sd4 from "./images/sd4.png";
import cubism from "./images/cubism.png";
import nature from "./images/nature.png";
import surrealism from "./images/surrealism.png";
import popArt from "./images/popArt.png";
import impressionism from "./images/impressionism.png";
import artistique1 from "./images/artistique-image1.png";
import artistique2 from "./images/beach.png";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import "./Home.css";
const Page= () => {
  const [openModal, setOpenModal] = useState(false);
    const handleShow = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const navigate = useNavigate ();
    const {userData} = useContext(UserContext);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const handleScroll = () => {
        const scrollText = document.querySelector('.scroll-text');
        if (scrollText) {
          const scrollPosition = window.innerHeight + window.scrollY;
          const elementPosition = scrollText.offsetTop + scrollText.offsetHeight;
    
          if (scrollPosition >= elementPosition) {
            scrollText.classList.add('hide-scroll');
          } else {
            scrollText.classList.remove('hide-scroll');
          }
        }
      };
    return (
      <div className="page">
      <div className="page-one">
        <div className="img-gallery">
          <div className="img-styles">
            {/* Your images */}
            <img className="img1" src={art4} alt="image1"/>
    <img className="img1" src={lune} alt="image2"/>
    <img className="img1" src={sd3} alt="image3"/>
    <img className="img1" src={nature} alt="image4"/>
    <img className="img1" src={girl} alt="image5"/>
   
    <img className="img2" src={impressionism } alt="image6"/>
    <img className="img2" src={artistique1} alt="image1"/>
    <img className="img2" src={sd2} alt="image2"/>
    <img className="img2" src={artColor} alt="image3"/>
    <img className="img2" src={house} alt="image4"/>
    <img className="img3" src={surrealism} alt="image5"/>
    <img className="img3" src={cat} alt="image1"/>
    <img className="img3" src={artistique2} alt="image2"/>
    <img className="img3" src={art2} alt="image3"/>
    <img className="img3" src={art1} alt="image4"/>
      
          </div>
        </div>
        <div className="content">
      <p className="create">CREATE ART WITH AI</p>
      {userData.user ? (
        <button id="boutt" onClick={() => navigate('/artgeneration')}>
        GENERATE ART 
        <AutoFixHighIcon style={{marginLeft: '10px'}}/>
      </button>
         
    
      ):(
        <button id="boutt" onClick={handleShow} >
        GENERATE ART 
        <AutoFixHighIcon style={{marginLeft: '10px'}}/>
        <Login  className="blur-overlay" open={openModal}  
      onClose={handleClose} /> 
      </button>
      )}
    </div>
  </div>
</div>
            
    )
            }

export default Page