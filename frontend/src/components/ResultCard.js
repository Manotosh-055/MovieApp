import axios from "axios";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";

export const ResultCard = ({ movie }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistDisabled, setWatchlistDisabled] = useState(false);
  const [watchedDisabled, setWatchedDisabled] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data } = await axios.get(`https://movie-app-phi-lac.vercel.app/api/user/all-list/${user._id}`);
        setWatchlist(data);

        if (data.some(item => item.movie_name === movie.title)) {
          setWatchlistDisabled(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWatched = async () => {
      try {
        const { data } = await axios.get(`https://movie-app-phi-lac.vercel.app/api/user/all-watched/${user._id}`);
        console.log(data);
        if (data.some(item => item.movie_name === movie.title)) {
          setWatchlistDisabled(true); 
          setWatchedDisabled(true); 
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchlist();
    fetchWatched();
  });

  const addMovieToWatched = async(movie) => {
    console.log(movie);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/add-watch",
        {
          pic: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          moviename: movie.title,
          popularity: movie.popularity,
          rdate: movie.release_date,
          des: movie.overview,
          id: user._id,
        },
        config
      );
      console.log(data);
      setWatchlistDisabled(true);
      setWatchedDisabled(true); 
    } catch (error) {
      console.log(error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/add-movie",
        {
          pic: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          moviename: movie.title,
          popularity: movie.popularity,
          rdate: movie.release_date,
          des: movie.overview,
          id: user._id,
        },
        config
      );
      console.log(data);
      setWatchlistDisabled(true); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            <Moment format="YYYY">{movie.release_date}</Moment>
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn"
            disabled={watchlistDisabled}
            onClick={() => addToWatchlist(movie)}
          >
            Add to Watchlist
          </button>

          <button
            className="btn"
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
};
