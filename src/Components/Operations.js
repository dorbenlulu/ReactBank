import React, { Component } from "react";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: '',
      vendor: '',
      category: ''
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({[name]: value});
  };

  handleClick = operation => {
    const newTransaction = {
      amount: parseInt(this.state.amount),
      vendor: this.state.vendor,
      category: this.state.category
    };

    newTransaction.amount =
      operation === "withdraw"
        ? newTransaction.amount * -1
        : newTransaction.amount;
    this.props.updateData(newTransaction);
    this.setState({amount:'', vendor:'', category:''})
  };

  render() {
    return (
      <div>
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="vendor"
          value={this.state.vendor}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="category"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <button onClick={() => this.handleClick("deposit")}>Deposit</button>
        <button onClick={() => this.handleClick("withdraw")}>Withdraw</button>
      </div>
    );
  }
}

export default Operations;
