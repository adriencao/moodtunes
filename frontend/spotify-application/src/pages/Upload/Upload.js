import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Webcam from "react-webcam";
import "./Upload.css";

const Upload = () => {

  useEffect(() => {
    handlePostQuery(localStorage.getItem("accessToken"));
  }, []);

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
      const response = await fetch('https://471f-4-71-27-132.ngrok-free.app/upload-image', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
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
    <div className="wrapper" align="center">
      <h1>Snap your picture for the day</h1>
      <div className="item">
        <div className="polaroid">
            <Webcam
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              mirrored={true}
              minScreenshotHeight={480}
              minScreenshotWidth={640}
              videoConstraints={{
                height: 480,
                width: 640
              }}
            />
        </div>
        <div class="capture">
          <button className="buttonContainer" onClick={capture}>
            <img
              className="buttonImage"
              src="capture3.png"
              alt="camera-icon"
            />
          </button>
        </div>
      </div>

      <div className="item">
        <div className="polaroid">
          {/* {image && <img src={image} className="capturedImage"/>} */}
          {image ? (<img src={image} className="capturedImage"/>
          ) : (
            <img src="placeholder.jpg" alt="Placeholder" className="capturedImage"/>
          )}
        </div>
        <div class="capture">
          <form onSubmit={handleSubmit}>
            <button type="submit" className="buttonContainer">
              <img
                className="buttonImage"
                src="submit.png"
                alt="camera-icon"
              />
            </button>
          </form>
        </div>
      </div>
      <img
        className="tape1-1"
        src="tape1.png"
      />
      <img
        className="doodle3"
        src="doodle3.png"
      />
      <img
        className="doodle4"
        src="doodle4.png"
      />
      <img
        className="doodle5"
        src="doodle5.png"
      />
      <img
        className="doodle6"
        src="doodle6.png"
      />
      <img
        className="square1"
        src="square1.png"
      />
            <img
        className="doodle3-1"
        src="doodle3.png"
      />
      <img
        className="tape1"
        src="tape1.png"
      />
    </div>
  );
  
};

function handlePostQuery(query){

  var myParams = {
      data: query
  }

  if (query != "") {
      axios.post('https://471f-4-71-27-132.ngrok-free.app/login', myParams)
          .then(function(response){
              console.log(response);
     //Perform action based on response
      })
      .catch(function(error){
          console.log(error);
     //Perform action based on error
      });
  } else {
      alert("The search query cannot be empty")
  }
}

export default Upload;

// {/* <button className="buttonContainer" onClick={capture}>
//         <img
//           className="buttonImage"
//           src="Capture.png"
//           alt="camera-icon"
//         />
//       </button> */}

//       <form onSubmit={handleSubmit}>
//         <button type="submit">Upload Image</button>
//       </form>