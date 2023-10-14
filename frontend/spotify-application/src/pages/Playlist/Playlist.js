import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Playlist.css";



const Playlist = () => {
    const [mood, setMood] = useState(null); // Initialize the state variable
  
    useEffect(() => {
      // Make the GET request to obtain the mood data
      // For example, using the Fetch API
      fetch('https://471f-4-71-27-132.ngrok-free.app/mood')
        .then((response) => response.json())
        .then((data) => {
          // Set the mood data in the state
          setMood(data.mood);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to ensure the effect runs once

    return (
      <div className="wrapper" align="center">
        <div className="spotify">
          <iframe 
            src="https://open.spotify.com/embed/artist/6HvZYsbFfjnjFrWF950C9d?utm_source=generator" 
            width="100%" 
            height="500" 
            allowfullscreen="" 
            allowtransparency="true"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
        <div className="carousel">
          <h1>Today's mood:</h1>
          <h1>BOOM BADA BANG BOP..... POW{mood}</h1>
        </div>
      </div>
    );
};

export default Playlist;