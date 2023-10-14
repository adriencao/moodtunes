import React, { useEffect } from "react";
import axios from "axios";
import "./Playlist.css";

const Playlist = () => {

    return (
      <div class="playlist" align="center">
        <div class="item">
          <iframe
            src="https://open.spotify.com/embed/playlist/2TNcnKxd2rMSR42jVbqrS9?si=1959ebe021b049b1"
            width="60%"
            height="500px"
            frameborder="{0}"
            allowfullscreen
            allow="autoplay;
            clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          
        </div>
      </div>
    );
};

export default Playlist;