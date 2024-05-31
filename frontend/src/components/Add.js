import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
import { useHistory } from 'react-router-dom';


export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const history = useHistory();
  const user = localStorage.getItem('userInfo');

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a7b3791b53e16e00f5610e35c8958bcf&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };
  return (
    <>
    {user?(<div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>

          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>):(history.push("/"))}
    </>
    
  );
};
