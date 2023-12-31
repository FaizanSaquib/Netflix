import React from 'react'
import "./App.css";
import { request } from './components/Row';
import Row from "./components/Row";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
function App() {
  return <div className="App">
    <Navbar/>
    <Banner/>
    <Row largeBanner={true} title="NETFLIX ORIGINALS" fetchUrl={request.fetchingNetflixOriginals}/>
    <Row title="Trending Now" fetchUrl={request.fetchTrending} />
    <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
    <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
    <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
    <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
    <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
  </div>;
}

export default App;
