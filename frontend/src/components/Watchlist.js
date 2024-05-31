import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('userInfo')); 
  const id = user?._id;

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  useEffect(() => {
    const allList = async () => {
      try {
        const { data } = await axios.get(`https://movie-app-phi-lac.vercel.app/api/user/all-list/${id}`);
        setWatchlist(data); 
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      allList();
    }
  }, [id, user]);

  return (
    <>
      {user ? (
        <div className="movie-page">
          <div className="container">
            <div className="header">
              <h1 className="heading">My Watchlist</h1>

              <span className="count-pill">
                {watchlist?.length} {watchlist.length === 1 ? "Movie" : "Movies"}
              </span>
            </div>

            {watchlist.length > 0 ? (
              <div className="movie-grid">
                {watchlist?.map((movie) => (
                  <MovieCard movie={movie} key={movie._id} type="watchlist" />
                ))}
              </div>
            ) : (
              <h2 className="no-movies">No movies in your list! Add some!</h2>
            )}
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
}
