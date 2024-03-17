import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Home.scss";
import User from "../User/User";
import ReactPlayer from "react-player";

function Home() {
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState();
  const [videos, setVideos] = useState([]);

  const account = JSON.parse(localStorage.getItem("Account"));

  useEffect(() => {
    if (!account) {
      navigate("/Perfiles");
    }
  }, [account, navigate]);

  useEffect(() => {
    Validar();
  }, []);

  const urllogin = `http://localhost:3001/api/playlists?iduser=${account.user}`;

  const Validar = async () => {
    await fetch(urllogin, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const allVideos = data.reduce((acc, playlist) => {
          return [...acc, ...playlist.playlist];
        }, []);
        data.forEach((playlist) => {
          const data = {
            id: playlist._id,
            videos: allVideos,
            user: playlist.user,
          };
          setPlaylist(data);
          setVideos(allVideos);
          return;
        });
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  return (
    <>
      <div className='boddys'>
        <User></User>
        {videos.map((video, index) => (
          <div
            key={index}
            className='video-container'
          >
            <h2>{video.name}</h2>
            <ReactPlayer
              className='video'
              url={video.url}
              controls
              showRelated={false}
              autoPlay
              loop
              rel={0}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
