import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Webcam from "react-webcam";
import "./Upload.css";

const Upload = () => {

    const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', dataURItoBlob(image));

    try {
      const response = await fetch('https://c098-2610-148-1f00-1000-1c95-6cb7-c465-8386.ngrok-free.app/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
      />

      <button className="buttonCamera" onClick={capture}>
        <img
            className="buttonImage"
          src="Capture.png"
          alt="camera-icon"
        />
      </button>

      {image && <img src={image} alt="Captured Image" />}

      <form onSubmit={handleSubmit}>
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
};

export default Upload;