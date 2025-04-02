import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {


  return (
<div className="App">
  <div className="container">
    <div className="sidebar">
      <div className="header">
        <h1>Title</h1>
      </div>
      <div className="navigation">
        <ul>
          <li>Dashboard</li>
          <li>Search</li>
          <li>About</li>
        </ul>
      </div>
    </div>
    <div className="data-container">
      <div className="card-container">
        <h1>card one</h1>
        <h1>card two</h1>
        <h1>card three</h1>
      </div>
      <div className="table-container">
        <div className="filter-bar"><h1>input bar here</h1></div>
        <div className="table-container"><h1>table goes here</h1></div>
      </div>
    </div>
  </div>
</div>
  );
};

export default App;
