import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

function TitleCards({ title, category }) {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjMzNzExMTAxZDEzOGJlYTE4MTI5OWFmNzA5ZDkxYiIsIm5iZiI6MTc3MTg5Mjg3OC4wNzQsInN1YiI6IjY5OWNmMDhlYzBiMTUwYWE2YWM1YWY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ockHIH6UteIu5LVy0XUyDEZ_o4HOlqDHaxF4-8AfF6M",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const el = cardsRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (el) {
        el.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          return (
            <Link key={card.id} to={`/player/${card.id}`} className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
