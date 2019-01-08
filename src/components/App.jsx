import React, { Component } from "react";
import Header from "./Header.jsx";
import Inventory from "./Inventory.jsx";
import Order from "./Order.jsx";

class App extends Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
