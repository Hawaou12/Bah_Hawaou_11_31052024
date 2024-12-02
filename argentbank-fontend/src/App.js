// src/App.js
import React from "react";
import Header from "./components/header/header";
import Routers from "./containers/Routers/routers";
import Footer from "./components/footer/footer";

 

import "./App.css";

function App() {
  //console.log("App component is rendering");
  return (
    <div className="App">
     
      <Header />
     
       <Routers />
       
       <Footer />
    
    </div>
  );
}

export default App;