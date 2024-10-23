import React, { useRef, useEffect } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";



const TitleCards = () => {
  const cardsRef = useRef([])
  useEffect(()=> {
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  // this function will implement horizontal scroll when user scrolls vertically
  const handleWheel = (event) => {
    // this will prevent the default scroll and will make the cards scroll horizontally
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  return (
    <div className="title-cards">
      <h2>Popular on Netflix</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.image} alt="" />
            <p className="">{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
