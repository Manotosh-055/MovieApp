import React, { useEffect, useState } from "react";
import { HomeCard } from "./HomeCard";
import { useHistory } from 'react-router-dom';


export const Home = () => {
    const [results, setResults] = useState([]);

    const history = useHistory();
    const user = localStorage.getItem('userInfo');

    const func = () => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=a7b3791b53e16e00f5610e35c8958bcf&language=en-US&page=1&include_adult=false&query=B`
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

    useEffect(() => {
        if (user) {
            func();
        }
    }, [user]);

    return (
        <>
            {user ? (
                        <div className="home-container">
                            
                            {results.map((movie) => (
                                <div className="home-card-container" key={movie._id}>
                                    <HomeCard movie={movie}  />
                                </div>

                            ))}                            
                        </div>
            ) : (
                history.push("/")
            )}
        </>
    );
};



