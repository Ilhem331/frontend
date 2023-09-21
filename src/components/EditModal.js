import React, {useState} from 'react';
import "./EditModal.css";
import axios from 'axios';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
const EditModal = ({ isOpen, onClose, imageUrl }) => {
    const [modifiedText, setModifiedText] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [displayedImageUrl, setDisplayedImageUrl] = useState(imageUrl);
    // Modal styles
   
  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow: 'hidden',
    
 
  };

const modalContentStyles = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'transparent',
  backdropFilter: isOpen ? 'blur(8px)' : 'none',
  overflow: 'hidden',
 
};



  
    const closeModal = () => {
      onClose();
    };
  
    const handleTextChange = (event) => {
        setModifiedText(event.target.value);
      };
    
     
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
   
    axios
      .post('https://react-nwgw.onrender.com/pix-pix', {
        prompt: modifiedText,
        init_image: imageUrl,
      })
      .then((response) => {
       
        console.log(response.data);
        setEditedImageUrl(response.data.output);
      })
      .catch((error) => {
        console.error('Error editing image with text:', error);
        setIsLoading(false);
      });

    
  };
  const downloadImage = (imageUrl) => {
    if (!imageUrl) {
      console.error('Image URL is missing');
      return;
    }
  
    const downloadUrl = `https://react-nwgw.onrender.com/api/download-image`;
  
    fetch(downloadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.png';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

    return (
      

<div className="modal" style={modalStyles}>
  <div className="modal-content" style={modalContentStyles}>
    <p className="close-Btn-modal" onClick={closeModal}>
      X
    </p>
    <div className="edit-modal-result">
          {editedImageUrl ? (
            <>
              <img src={editedImageUrl} className="img-edit" alt="Modal Image" />
              <div className="modal_download_container">
                <FileDownloadSharpIcon className="modal-download" onClick={() => downloadImage(editedImageUrl)} />
              </div>
            </>
          ) : (
            <>
              <img src={displayedImageUrl} className="img-edit" alt="Modal Image" />
              {isLoading && <CircularProgress className='loading-modal' style={{color: 'white'}}/>} 
            </>
          )}
   
    </div>
    <div className="input-container">
      <label className="input-label">Describe a change you would like to see in your image</label>
      <input
        className="edit-prompt-modal"
        type="text"
        value={modifiedText}
        onChange={handleTextChange}
        placeholder="Eg. Add fire to everything"
      />
      <button onClick={handleSubmit} className="send-icon-button" type="submit">
        <SendIcon />
      </button>
    </div>
  </div>
</div>

    );
  };
export default EditModal;
