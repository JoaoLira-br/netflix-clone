import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useParams } from "react-router-dom";
const Player = () => {
  const {id} = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDQ0YTY2YTk5YzgzZDk4ZWU0YjJlNGQ3NjYyZjRlNyIsIm5iZiI6MTcyOTc3NzM5Ny4wMTc4OTgsInN1YiI6IjY3MTkwOWIxNzY5MTA3ZDc3YjQ3NWY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HvmJriOhUk8ZzyCqftZR8o4fOQbPE3uBRdr6801QU5Y'
    }
  };
  
  
  useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));

    }, [])

  return (
    <div className="player">
      <Link to={'/'}>
      
      <img src={back_arrow_icon} alt="" />
      </Link>
      {/* this iframe for videos */}
      <iframe
        width={"90%"}
        height={"90%"}
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder={"0"}
        allowFullScreen
      >


      </iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
