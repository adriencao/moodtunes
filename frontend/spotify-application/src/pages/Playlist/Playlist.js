import React, { useEffect } from "react";
import axios from "axios";
import "./Playlist.css";
import Carousel from "../../components/Carousel";
import data from "../../data/carouselData.json";
const Playlist = () => {
    const {slides} = data;
    return (
      <Carousel data = {slides} />
    );
};

export default Playlist;