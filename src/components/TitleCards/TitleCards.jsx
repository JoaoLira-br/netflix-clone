import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";


const TitleCards = ({ title, category }) => {
  
  const cardsRef = useRef([]);
  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDQ0YTY2YTk5YzgzZDk4ZWU0YjJlNGQ3NjYyZjRlNyIsIm5iZiI6MTcyOTY5NDQxNS41NDczODQsInN1YiI6IjY3MTkwOWIxNzY5MTA3ZDc3YjQ3NWY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VP8JvVI0T6J-yho0dxnajV8FOea5mdYn7kteZMB-nY4'
    }
  };
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  

  useEffect(() => {

    switch (category) {
      case "upcoming":
        const today = new Date().toISOString().split('T')[0];

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&primary_release_date.gte=${today}`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
        break;
      default:
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
        break;
    }
    
  
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  // this function will implement horizontal scroll when user scrolls vertically
  const handleWheel = (event) => {
    // this will prevent the default scroll and will make the cards scroll horizontally
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          card.adult === false &&
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p className="">{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
