import React, {useState} from 'react';
import "./PremiumModal.css";
import axios from 'axios';
import { MDBIcon} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
const PremiumModal = ({isOpen, onClose}) => {

    const modalStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        display: isOpen ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        backdropFilter: isOpen ? 'blur(5px)' : 'none',
        
        
     
      };
    
    const modalContentStyles = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      backdropFilter: isOpen ? 'blur(8px)' : 'none',
      overflow: 'hidden',

     
    };
    const [message, setMessage] = useState('');

    const handleMouseOver = () => {
      setMessage('Manage Billing');
    }
  
    const handleMouseOut = () => {
      setMessage('');
    }
    const closeModal = () => {
        onClose();
      };
    
    return (
      

        <div className="modal" style={modalStyles}>
          <div className="modal-contentt" style={modalContentStyles}>
            <p className="close-Btn-modal" onClick={closeModal}>
              X
            </p>
            <div className='prem-container'>
            <div className="premium-container">
                <div className='premium-plan-container'>
                <p className='premium-plan'><WorkspacePremiumIcon style={{fontSize:'32px', marginTop:'-9px', width: '50px'}}/>PREMIUM PLAN</p>
            <p className='prem-plan'>Create your craziest dreams and gain access<br /> to new AI models, special profiles and more.</p>
            </div>  
</div>
            <div className="titlee">
              
                <div className='button-container'>
            <form action="https://buy.stripe.com/test_9AQ5lv8ff3zcgus289" method="GET">
      <button className="premium-butt" type="submit">  
      ANNUAL<br />£89.99 per year</button>
    </form>
  
    <form action="https://buy.stripe.com/test_7sI4hreDD2v8guseUW" method="GET">
      <button className="premium-but" type="submit">  
      MONTHLY <br />£9.99 per month</button>
    </form>   
    <form method="GET" action="https://billing.stripe.com/p/login/test_8wM5nNdsc5ob5vaeUU

">
  {/*<div>
  
  <Button onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut} style={{height: '40px', overflow: 'visible', border: 'none', background: '#7747c8', borderRadius: '30px', marginLeft: '-100px', marginTop: '500px'}}><MDBIcon className="ic" fas icon="cog" />
                    
                  </Button>
                  <p  style={{ fontSize: "18px", marginLeft:"-100px"}}>{message}</p>
        </div>
    */}
</form>
</div>
           
           
          
            
            <div className="bodyy">
      
        </div>
        
        </div>
         
           
            </div>
      
       
            </div>
 </div>
          

        
            );
          };
        export default PremiumModal;    
