import React, { useState, useRef } from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import art1 from "./images/realism.png";
import art4 from "./images/pencilsk.png";
import artColor from "./images/art-color.png";
import art2 from "./images/starrynight.png";
import art3 from "./images/colorPainting.png";
import anime3 from "./images/anime.png";
import resolution from "./images/resolution.png";
import hyperreal from "./images/hyperreal.png";
import artstation from "./images/artstation.png"
import CircularProgress from '@mui/material/CircularProgress';
import CasinoIcon from '@mui/icons-material/Casino'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import EditModal from './EditModal';
import cubism from "./images/cubism.png";
import surrealism from "./images/surrealism.png";
import popArt from "./images/popArt.png";
import impressionism from "./images/impressionism.png";
import { toast } from 'react-toastify';
import "./ArtGeneration.css"
import 'react-toastify/dist/ReactToastify.css';
const options = ['8k resolution',
'Hyperreal',
'Realistic', 'Anime',]

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 20, itemsToShow: 2 },
  { width: 20, itemsToShow: 3 },
  { width: 20, itemsToShow: 4 },
  { width: 20, itemsToShow: 5 },
  { width: 20, itemsToShow: 6 },

];

const API_TOKEN = "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";
const artStyles = [
  {
    id: 1,
    src: resolution,
    alt: 'Art style 1',
    name: '8k resolution',
    
  },
  {
    id: 8,
    src: hyperreal,
    alt: 'Art style 8',
    name: 'Hyperreal',
    
  },
  {
    id: 5,
    src: art1,
    alt: 'Art style 5',
    name: 'Realistic',
   
  },
 
  {
    id: 3,
    src: anime3,
    alt: 'Art style 3',
    name: 'Anime',
    
  },
  {
    id: 4,
    src: artColor,
    alt: 'Art style 4',
    name: 'Color Painting',
   
  },

  {
    id: 2,
    src: art2,
    alt: 'Art style 2',
    name: 'Van Gogh',
   
  },
  {
    id: 6,
    src: cubism,
    alt: 'Art style 6',
    name: 'Cubism',
    
  },
  {
    id: 7,
    src: art4,
    alt: 'Art style 7',
    name: 'Pencil Sketch',
    
  },
  {
    id: 10,
    src: surrealism,
    alt: 'Art style 10',
    name: 'Surrealism',
    
  },
  {
    id: 9,
    src: artstation,
    alt: 'Art style 9',
    name: 'Artstation',
    
  },
  {
    id: 12,
    src: impressionism,
    alt: 'Art style 6',
    name: 'Impressionism',
    
  },

  {
    id: 11,
    src: popArt ,
    alt: 'Art style 11',
    name: 'Pop Art',
    
  },
 


]
const Home= () => {
 
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [selectedArtStyle, setSelectedArtStyle] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [artStyle, setArtStyle] = useState("");
  const fileInputRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatedImg, setGeneratedImg] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [imageName, setImageName] = useState('');
  const [editingText, setEditingText] = useState(false);
  const [modifiedText, setModifiedText] = useState('');
  const [editedImg, setEditedImg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalImgOpen, setIsModalImgOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedButton, setSelectedButton] = useState('Button 1');
  const [strength, setStrength]= useState(0.7);
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInpuValue] = useState(options[0]);
  const [showRandomSuggestion, setShowRandomSuggestion] = useState(false);
  const [isCubeRotated, setIsCubeRotated] = useState(false);
  const navigate = useNavigate ();
  const gotoHomePage = () => {
    window.location.reload();
  };

  
  const handleCubeClick = () => {
    setIsCubeRotated(!isCubeRotated);
  };
  const changeStrength = (event) => {
    const value = parseInt(event.target.value);
    let selectedStrength = 0.7;
  
    if (value === 0) {
      selectedStrength = 0.5;
    } else if (value === 2) {
      selectedStrength = 0.9;
    }
  
    setStrength(selectedStrength);
  };
  const [suggestions] = useState([
    "Sunset cliffs",
    "Beautiful Landscape Beach White Sand Ocean Boat Sunset",
    "A fantasy landscape",
    "Nature's symphony",
    "Underwater wonderland",
    "Enchanted Forest",
  ]);

  const handleRandomSuggestionClick = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const randomSuggestion = suggestions[randomIndex];
    setPrompt(randomSuggestion);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('prompt', prompt + artStyle);
    formData.append('image', imageFile);
    formData.append('strength', strength);
    try{
    if (imageFile) {
      setLoadingImg(true)
    

      // Send the request to the image-to-image API
      const response = await axios.post('https://react-nwgw.onrender.com/api/base64_crop', formData, );
      // Handle the response from the image-to-image API
      const result = response.data;
      // Handle the result from the backend API
      if (result.output && result.output.length > 0) {
        const generatedImageUrl = result.output[0];
        setGeneratedImg(generatedImageUrl);
        setLoadingImg(false);
        if (!generatedImageUrl) {
          throw new Error('Image not displayed.');
        }
      }
   
     

    } else {
      setLoading(true)
      // Send the request to the text-to-image API
      const response = await axios.post('https://react-nwgw.onrender.com/api/generate-images', { prompt: prompt + artStyle });
      // Handle the response from the text-to-image API
      const { output } = response.data;
      setGeneratedImage(output);
      setLoading(false);
      if (!output) {
        throw new Error('Network error occurred. Please try again!');
      }
    }
  } catch (error) {
    // Handle errors and display toast notifications
    toast.error('An error occurred: ' + error.message);
  }
  };
  

 
  const handleImageInputChange = (event) => {
    const image = event.target.files;
  
    if (image && image[0]) {
      setImageFile(image[0]);
      setImageName(image[0].name);
    }
  };
  
  const handleEditButtonClick = () => {
    setEditingText(true);
  };

  const handleTextChange = (event) => {
    setModifiedText(event.target.value);
  };

  const handleSubmitText = (event) => {
    event.preventDefault();
    setModifiedText('');
    setEditingText(false);
  };



const handleInputChange = (event) => {
  const { name, value } = event.target;


  if (name === "input") {
    setPrompt(value);
  if (value === "") {
    setSelectedSuggestion(null);
  }
  } else if (name === "artStyle") {
    setArtStyle(value);
  }
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


const handleSubmitEdit = (event) => {
  event.preventDefault();

  // Send the request to the backend server API
  axios.post('https://react-nwgw.onrender.com/pix-pix', {
    prompt: modifiedText,
    init_image:  selectedImage || generatedImg,
  })
    .then((response) => {
     
      console.log(response.data);
      setEditedImg(response.data.output);
    })
    .catch((error) => {
      console.error('Error editing image with text:', error);
     
    });
};
const handleEditImageClick = (imageURL) => {
  setSelectedImageUrl(imageURL);
  setIsModalOpen(true);
  setEditingText(true);
};
const handleEditImgClick = (generatedImg) => {
  setSelectedImageUrl(generatedImg);
  setIsModalImgOpen(true);
  setEditingText(true);
};
const handleImageClick = (selectedImage) => {
  setSelectedArtStyle(selectedImage.name);
};
const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const handleCreateImage = () => {
  // Implement your logic to generate images based on the current prompt value
  console.log(`Generating images for prompt: ${prompt}`);
};



    return (
     
      <div className="home-ct">
               
      <div className="input-placeholder">
<form className="cont-home" onSubmit={handleSubmit}>
  <div className="prompt-container">
  <div className="label-input-wrapper">
    <label id="la" htmlFor="prompt">
      Enter your text prompt
    </label>
    <div className="input-button-container"> 
    <input
      className="prom"
      value={prompt}
      onChange={handleInputChange} 
      type="text"
      name="input"
      placeholder="Enter your prompt to generate the image"
      autoComplete="off"
    />

     
         
  </div>
  <button className="random-button" type="button" onClick={handleRandomSuggestionClick}>
      Random <CasinoIcon style={{width:'16px', marginTop: '2px', marginLeft: '3px'}}/>
              </button>
  </div>
  </div>
 

<div className="label-art-wrapper">

<label id="art-st">Select style</label>
<div className="art-containerr-image">


<div className="art-contain">
<div className="art-sty-container">

    {artStyles.map((style) => (
      <div key={style.id} className="art-styl">
        <img
          src={style.src}
          alt={style.alt}
          onClick={() => setArtStyle(style.name)}
          className={artStyle === style.name ? "selected" : ""}
        />
        <p>{style.name}</p>
      </div>
    ))}

</div>
</div>

 
<div className="label-art-wrapper">
{imageFile && !generatedImg ? (
  <div className="result_image_container">
    <img src={URL.createObjectURL(imageFile)} className="result_img" alt="Image" />
    {loadingImg && (
                 <div className="loading-img">
                   <p>Creating...</p>
                   <CircularProgress style={{ color: 'white' }} />
                 </div>
               )}
    <div>
      
      {!loadingImg && !generatedImg &&(
        <div className="slider-values-range">
      <input
        type="range"
        min="0"
        max="2"
        step="1"
        onChange={changeStrength}
        className="slider"
      />
      <div className="slider-values">
        <span className={`slider-value ${strength === 0 ? 'active' : ''}`}>Weak</span>
        <span className={`slider-value ${strength === 1 ? 'active' : ''}`}>Normal</span>
        <span className={`slider-value ${strength === 2 ? 'active' : ''}`}>Strong</span>
      </div>
    </div>
      )}
    </div>  
  </div>

  ) : (
    <div>
      {!generatedImg && !generatedImage && !loading &&(
    <div className="inputt-file">
      <input
        type="file"
        id="img-upload"
        name="image"
        accept="image/*"
        onChange={handleImageInputChange}
        className="custom-file-input"
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <label htmlFor="img-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <CloudUploadIcon
          className="file-upload"
          style={{ fontSize: '30px', marginRight: '10px' }}
          onClick={() => fileInputRef.current.click()}
        />
        <div className="upload-img">Upload an image</div>
      </label>
    </div> 
      )}
        </div>    
  )}
  <div className="images-generation">
{!imageFile && !generatedImg && !loadingImg && (
      <div className="image-placeholder-contain">
        {!loading && generatedImage.length === 2 ? (
          generatedImage.map((imageURL, index) => (
            <div key={index} className="image-placehold">
              <img src={imageURL} alt="Generated Image" className="result_image" />
              <div className="icons">
                <FileDownloadSharpIcon
                  className="download-image"
                  onClick={() => downloadImage(imageURL)}
                />
                <EditIcon
                  className="edit-icon-image"
                  onClick={() => handleEditImageClick(imageURL)}
                />
              </div>
            </div>
          ))
        ) : (
          <>
            {!imageName && !generatedImg && loading && (
              <div className="image-placeholder-containn">
                <div className="image-placehold">
                  {loading && (
                    <div>
                      <p>Creating...</p>
                      <CircularProgress style={{ color: 'white' }} />
                    </div>
                  )}
                </div>
                <div className="image-placehold">
                  {loading && (
                    <div>
                      <p>Creating...</p>
                      <CircularProgress style={{ color: 'white' }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )}
    </div>
  {generatedImg && (
          <div className="result_image_container">
            <img src={generatedImg} className="result_img" alt="Generated Image" />
            <div className="iconss">
                 <FileDownloadSharpIcon
                   className="download-img"
                   onClick={() => downloadImage(generatedImg)}
                 />
                 <EditIcon
                   className="edit-icon-img"
                   onClick={() => handleEditImgClick(generatedImg)}
                 />
               </div>
          </div>
          
        )}
      
</div>
</div>


<button
  onClick={() => setSubmitted(true)}
  className={`button-generation ${prompt ? 'active' : ''} ${loading ? 'button-loading' : ''} ${generatedImage ? 'button-generated' : 'button-default'}${imageFile ? 'button-uploaded' : ''}`}
  type="submit"
>
  Generate
</button>

</div>

</form>





{editedImg &&(
  <div className="result_image_container">
    <img src={editedImg} className="result_img" alt="Edited Image" />
    <div className="download_container">
      <FileDownloadSharpIcon className="download-icon" onClick={() => downloadImage(editedImg)}/>
    </div>
  </div>

        )}
   

{isModalOpen && (
  <EditModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    imageUrl={selectedImageUrl}
  />
)}
{isModalImgOpen && (
  <EditModal
    isOpen={isModalImgOpen}
    onClose={() => setIsModalImgOpen(false)}
    imageUrl={selectedImageUrl}
  />
)}
</div>  
</div> 

        
    )
 
    }
   


    
export default Home;
