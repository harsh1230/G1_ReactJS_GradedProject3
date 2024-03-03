import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Movie from "./components/Movie";

function App() {

  const el = (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:title" element={<Movie />} />
      </Routes>
    </Router>

  );

  return el;

};

export default App;
