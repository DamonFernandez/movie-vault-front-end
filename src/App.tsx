import { useState } from "react";
import MovieCard from "./components/MoiveCard";
import "./styles/App.css";

function App() {
  return <>
    <h1>MovieVault</h1>
    <MovieCard movie={{ id: 1, title: "Batman v Superman: Dawn of Justice", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg" }} />
    <MovieCard movie={{ id: 1, title: "Batman v Superman: Dawn of Justice", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg" }} />
    <MovieCard movie={{ id: 1, title: "Batman v Superman: Dawn of Justice", year: 2016, poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UX190_CR0,0,190,281_.jpg" }} />
  </>;
}

export default App;
