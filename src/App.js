import "./styles.css";
import React, { Component } from "react";
import "./App.css";
import MovieList from "./modules/sources/MovieList";
class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieList />
      </div>
    );
  }
}

export default App;
