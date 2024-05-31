import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { MovieCard } from "./MovieCard";
import axios from "axios";

export const Watched = () => {
  const [watched, setWatched] = useState([]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('userInfo')); 
  const id = user?._id;

  const allWatchedMovie = async () => {
    try {
      const { data } = await axios.get(`https://movie-app-phi-lac.vercel.app/api/user/all-watched/${id}`);
      setWatched(data); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      allWatchedMovie();
    } else {
      history.push("/");
    }
  });

 
  return (
    <>
    {user? (
     <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Movies</h1>

          <span className="count-pill">
            {watched?.length} {watched.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {watched?.length > 0 ? (
          <div className="movie-grid">
            {watched?.map((movie) => (
              <MovieCard movie={movie} key={movie._id} type="watched" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>) : (history.push("/"))
    }
    </>
   
  );
};
