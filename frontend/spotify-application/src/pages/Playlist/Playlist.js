import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Playlist.css";
import Carousel from "../../components/Carousel";
import data from "../../data/carouselData.json";
const Playlist = () => {
    // const {slides} = data;
    const [mood, setMood] = useState(null); // Initialize the state variable
    const [playlist, setPlaylist] = useState(null);
    const [imageData1, setImageData1] = useState(null);
    const [imageData2, setImageData2] = useState(null);
    const [imageData3, setImageData3] = useState(null);
    const [imageData4, setImageData4] = useState(null);
    const [imageData5, setImageData5] = useState(null);
    const [imageData6, setImageData6] = useState(null);
    const [imageData7, setImageData7] = useState(null);
    const image = [
          {
              "src": imageData1,
              "alt": "image 1 for carousel"
  
          },
          {
              "src": imageData2,
              "alt": "image 2 for carousel"
  
          },
          {
              "src": imageData3,
              "alt": "image 3 for carousel"
  
          },
          {
              "src": imageData4,
              "alt": "image 3 for carousel"
  
          },
          {
            "src": imageData5,
            "alt": "image 3 for carousel"

          },
          {
            "src": imageData6,
            "alt": "image 3 for carousel"

          },
          {
            "src": imageData7,
            "alt": "image 3 for carousel"

          }
      ]

    useEffect(() => {
      axios
    .get('https://471f-4-71-27-132.ngrok-free.app/get-data')
    .then(function (response) {
      console.log(response);
      // Perform action based on response

      setPlaylist(response["data"]["playlistLink"]);
      setMood(response["data"]["mood"])
      console.log(playlist);
      console.log(mood);
    })
    .catch(function (error) {
      console.log(error);
      // Perform action based on error
    });
    
    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data1')
      .then((response1) => response1.blob())
      .then((imageBlob1) => {
        const imageURL1 = URL.createObjectURL(imageBlob1);
        setImageData1(imageURL1);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(imageData1);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data2')
      .then((response2) => response2.blob())
      .then((imageBlob2) => {
        const imageURL2 = URL.createObjectURL(imageBlob2);
        setImageData2(imageURL2);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(imageData2);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data3')
      .then((response3) => response3.blob())
      .then((imageBlob3) => {
        const imageURL3 = URL.createObjectURL(imageBlob3);
        setImageData3(imageURL3);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(imageData3);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data4')
    .then((response4) => response4.blob())
    .then((imageBlob4) => {
      const imageURL4 = URL.createObjectURL(imageBlob4);
      setImageData4(imageURL4);
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(imageData4);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data5')
      .then((response5) => response5.blob())
      .then((imageBlob5) => {
        const imageURL5 = URL.createObjectURL(imageBlob5);
        setImageData5(imageURL5);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(imageData5);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data6')
      .then((response6) => response6.blob())
      .then((imageBlob6) => {
        const imageURL6 = URL.createObjectURL(imageBlob6);
        setImageData6(imageURL6);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(imageData6);

    fetch('https://471f-4-71-27-132.ngrok-free.app/get-image-data7')
    .then((response7) => response7.blob())
    .then((imageBlob7) => {
      const imageURL7 = URL.createObjectURL(imageBlob7);
      setImageData7(imageURL7);
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(imageData7);

    }, []);

    return (
      
      <div className="wrapper" align="center">
        <div className="spotify">
          <iframe 
            src={playlist} 
            width="100%" 
            height="500" 
            allowfullscreen="" 
            allowtransparency="true"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
        <div className="pics" align="center">
          <h1>Today's mood:</h1>
          <h2>{mood}</h2>
          <Carousel data = {image} />
        </div>
      </div>
    );
};

export default Playlist;