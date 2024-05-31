import React from "react";
import { MovieControls } from "./MovieControls";

function truncateText(text, length) {
  if (text?.length <= length) {
    return text;
  }
  return text?.slice(0, length) + '...';
}

export const MovieCard = ({ movie, type }) => {
  //console.log(movie);
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      <img
        src={movie?.pic}
        alt={`${movie.title} Poster`}
      />
      <div className='d-flex gap-10 justify-content-between align-items-center px-3 mb-2 mt-2'>
        <h1 className='product-heading' style={{ color: 'gray', fontWeight: 'bold', fontSize: '1.1rem' }}>{movie.movie_name}</h1>
      </div>

      <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
        <h4 className='product-heading'>Popularity :</h4>
        <p className='product-heading'>{movie.popularity}</p>
      </div>
      <div className='d-flex gap-10 justify-content-between align-items-center px-3'>
        <h4 className='product-heading'>Release Date :</h4>
        <p className='product-heading'>{movie?.release_date?.slice(0, 10)}</p>
      </div>
      <div className='d-flex gap-10 justify-content-between px-3 mt-2'>
        <p className='product-heading'>{truncateText(movie?.description, 72)}</p>
      </div>

      <MovieControls type={type} movie={movie} />
    </div>
  );
};
