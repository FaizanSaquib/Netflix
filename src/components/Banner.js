import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BASE_URL from "./Axios";
import { request } from "./Row";
import "./Banner.css";
const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [URL,setURL]=useState(`${BASE_URL}${request.fetchingNetflixOriginals}`)
  useEffect(() => {
    const fetchData = async () => {
      let page=1
      setInterval( ()=>{
        page ++
        setURL(`${BASE_URL}${request.fetchingNetflixOriginals}&page=${page}`);
      },15000)
      const fetching = await fetch(URL);
        const jsonData = await fetching.json();
        setMovie(
          jsonData.results[
            Math.floor(Math.random() * jsonData.results.length - 1)
          ]
        );
    };
    fetchData();
  }, [URL]);
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  return (
    <>
      <header
        className="banner-head"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="banner-content">
          <div className="BannerTitleName">
            <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
          </div>
          <div className="button-container">
            <button className="banner-button">Play</button>
            <button className="banner-button">My List</button>
          </div>
          <div className="banner-description">
            <h2>{truncate(movie?.overview, 150)}</h2>
          </div>
        </div>
        <div className="fadding-container"></div>
      </header>
    </>
  );
};

export default Banner;
