import { useState } from "react";

import Movies from "./routes/movies";

import "./styles/App.css";

function App() {
  return <>
    <h1>MovieVault</h1>
    <Movies />
  </>;
}

export default App;
