import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const CLIENT_ID = "16ab7919b67d4085ba979a6ec8540a48";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/login";
const SPACE_DELIMETER = "%20";
const SCOPES = ["user-library-read", "user-top-read", "playlist-modify-public", "user-follow-read", "playlist-modify-private"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMETER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});
    return paramsSplitUp;
};

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.location.hash) {
            const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
            console.log({access_token});

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
            localStorage.setItem("tokenType", token_type);

            navigate('/upload');
        }
    });

    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    }
    return (
        <div className="containerLogin">
            <h1>hkjahskjhskjh</h1>
            <button className="button-27" role="button" onClick={handleLogin}>Login to Spotify</button>
            <img
                className="doodle1"
                src="doodle1.png"
            />
            <img
                className="stickynote1"
                src="stickynote1.png"
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

export default Login;