import React, { Component } from "react";

class Transaction extends Component {
  handleClick = () => {
    console.log(`id to delete is ${this.props.transaction._id}`)
    this.props.deleteTransaction(this.props.transaction._id)
  }
  render() {
    //{ amount: 3200, vendor: "Elevation", category: "Salary" },
    const { amount, vendor, category } = this.props.transaction;
    return (
      <div>
        <span>Amount: {amount}, </span>
        <span>Vendor: {vendor}, </span>
        <span>Category: {category}</span>
        <button onClick={this.handleClick}>Delete</button>
      </div>
    );
  }
}

export default Transaction;
