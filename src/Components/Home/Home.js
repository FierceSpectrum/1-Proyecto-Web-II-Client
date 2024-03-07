import React, {useState, useEffect} from "react";
import "./Home.scss";
import User from "../User/User";
import ReactPlayer from "react-player";

function Home() {
  const [playlist, setPlaylist] = useState();
  const [videos, setVideos] = useState([]);

  const user = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    Validar();
  }, []);

  const urllogin = `http://localhost:3001/api/playlists?iduser=${user.id}`;

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
