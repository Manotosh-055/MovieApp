import axios from "axios";
import React from "react";

export const MovieControls = ({ type, movie }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const addMovieToWatched = async (movie) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/add-to-watch",
        {
          movieid: movie._id,
          pic: movie.pic,
          moviename: movie.movie_name,
          popularity: movie.popularity,
          rdate: movie.release_date,
          des: movie.description,
          userid: user._id
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovieFromWatchlist = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/remove-from-watchlist",
        {
          movieid: id,
          userid: user._id
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatched = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/remove-from-watched",
        {
          movieid: id,
          userid: user._id
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const moveToWatchlist = async(movie) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://movie-app-phi-lac.vercel.app/api/user/move-to-watch",
        {
          movieid: movie._id,
          pic: movie.pic,
          moviename: movie.movie_name,
          popularity: movie.popularity,
          rdate: movie.release_date,
          des: movie.description,
          userid: user._id
        },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            <i className="fa-fw far fa-eye"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie._id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}

      {type === "watched" && (
        <>
          <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
            <i className="fa-fw far fa-eye-slash"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeFromWatched(movie._id)}
          >
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};
