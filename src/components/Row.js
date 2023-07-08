import movieTrailer from "movie-trailer";
import React, { useState } from "react";
import { useEffect } from "react";
import YouTube from "react-youtube";
import BASE_URL from "./Axios";
import "./Row.css";


 const API_KEY = "9528f99e27080dc0b003b981a4f2c1ca";
 export const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
  fetchingNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${1}`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

const Row = ({ fetchUrl, title, largeBanner }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState('')
  const ImageBaseUrl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const fetchingData = async () => {
      const url = `${BASE_URL}${fetchUrl}`;
      const fetchedData = await fetch(url);
      const response = await fetchedData.json();
      // console.log(response)
      setMovies(response.results)
      // console.log(response.results)
      return response.results;
    };
    fetchingData();
  }, [fetchUrl]);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  function handleClick(poster){
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(poster?.name || poster?.title || poster?.original_name || "")
      .then((url)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
       setTrailerUrl(urlParams.get('v'));
      })
      .catch((error)=>console.log(error))
    }
  }

  
 const shownName=()=>{

  }
 const hideName=()=>{
  // console.log("u jest leave it")
 }
  return (
    <div className="row">
      <div className="upper">
        <h2>{title}</h2>
       {largeBanner && <button  className=" banner-button">Next Page &rarr;</button>}
      </div>
      
      <div className={largeBanner ? "posters banner" : "posters"}>
        {movies.map((poster) => (
          <img
          onMouseEnter={shownName()}
          onMouseLeave={hideName}
            key={poster.id}
            onClick={()=>handleClick(poster)}
            src={`${ImageBaseUrl}${
              largeBanner
                ? poster.poster_path
                : poster?.backdrop_path || poster.poster_path
            }`}
            alt={poster?.title || poster?.name}
          />
        ))}
      </div>
       {trailerUrl &&< YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
