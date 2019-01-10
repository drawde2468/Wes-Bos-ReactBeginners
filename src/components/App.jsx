import React, { Component } from "react";
import Header from "./Header.jsx";
import Inventory from "./Inventory.jsx";
import Order from "./Order.jsx";
import Fish from "./Fish";
import samplesFishes from "../sample-fishes";
import base from "../base";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    //mounts the db from firebase using the name of the store in the url
    const { params } = this.props.match;
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      //checking if local storage matching the url as key exists, if so setting state with an obj because it will be coming as a string
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    console.log(localStorageRef);
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    //setting local storage to create obj, obj has url as key and the value is an obj.
    //json stringify is needed because the browser is expecting a string and will show [object Object] otherwise
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    //unmounts the ref to the current db to prevent a memory leak
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. Update that state
    fishes[key] = updatedFish;
    //3. Set to state
    this.setState({ fishes: fishes });
  };

  deleteFish = key => {
    //1. Take a copy of state
    const fishes = { ...this.state.fishes };
    //2. Update deleted fish to null
    fishes[key] = null;
    //3. Set the state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: samplesFishes
    });
  };

  addToOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Add or update our new fish to that fishes variable
    order[key] = order[key] + 1 || 1;
    // 3. Set the new fishes object to state
    this.setState({
      order: order
    });
  };

  deleteFromOrder = key => {
    //1. Copy state
    const order = { ...this.state.order };
    //2. Delete order key since value is on local storage and not firebase
    delete order[key];
    //3. Set State
    this.setState({
      order: order
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                //index is being passed because key is needed once again as a prop
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          deleteFromOrder={this.deleteFromOrder}
          order={this.state.order}
          fishes={
            this.state.fishes
          } /* {...this.state} Short way of send the way state*/
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          deleteFromOrder={this.deleteFromOrder}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
