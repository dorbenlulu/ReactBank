import React, { Component } from "react";
import Transaction from "./Transaction";

class Transactions extends Component {
  render() {
    return (
      <div>
        {this.props.transactions.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} deleteTransaction={this.props.deleteTransaction} />
        ))}
      </div>
    );
  }
}

export default Transactions;
