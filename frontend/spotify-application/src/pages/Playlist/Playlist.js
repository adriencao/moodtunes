import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Playlist.css";



const Playlist = () => {
    const [mood, setMood] = useState(null); // Initialize the state variable
    const [playlist, setPlaylist] = useState(null);

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
        <div className="carousel">
          <h1>Today's mood:</h1>
          <h1>BOOM BADA BANG BOP..... POW{mood}</h1>
        </div>
      </div>
    );
};

export default Playlist;