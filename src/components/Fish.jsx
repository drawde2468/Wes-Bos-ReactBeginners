import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Fish extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
    // Can be done inline see comment below
  };

  render() {
    const { name, price, status, desc, image } = this.props.details;
    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {/* Alternative inline function */}
        {/* <button disabled={!isAvailable}onClick={() => this.props.addToOrder(this.props.index)}> */}
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add to Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
