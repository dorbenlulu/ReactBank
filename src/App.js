import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Transactions from "./Components/js/TransactionsOld";
import Operations from "./Components/js/Operations";
import TransactionCategories from "./Components/js/TransactionCategories";
import Transactions from './Components/js/Transactions'
import Header from './Components/js/Header'
import Loader from "react-loader-spinner";
import axios from "axios";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: null
    };
  }

  calculateTotalBalanace = () => {
    let totalBalance = 0;
    this.state.transactions.forEach(
      transaction => (totalBalance += transaction.amount)
    );
    return totalBalance;
  };

  updateTransactions = async newTransactionToAdd => {
    // const newTransactions = [...this.state.transactions]
    try {
      const response = await axios.post(
        "http://localhost:4000/transaction",
        newTransactionToAdd
      );
      const newTransactions = response.data;
      this.setState({ transactions: newTransactions });
      console.log(newTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  deleteTransaction = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/transaction/${id}`
      );
      const newTransactions = response.data;
      this.setState({ transactions: newTransactions });
      console.log(newTransactions);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    const response = await axios.get("http://localhost:4000/transactions");
    const transactions = response.data;
    console.log("transactions are ", transactions);
    this.setState({ transactions });
  };

  renderBank = () => {
    return (
      <>
        <Transactions transactions={this.state.transactions}  deleteTransaction={this.deleteTransaction}  />
        <div id='total-balance'>Total Balance: {this.calculateTotalBalanace()}</div>
      </>
    );
  };

  render() {
    return (
      <div id="container">
        <Router>
          <Header />
          <Route exact path="/" render={() => this.state.transactions ? this.renderBank() : <Loader type="TailSpin" color="lightblue" height={40} width={40} /> }/>
          <Route exact path="/transactions" render={() => <Transactions  deleteTransaction={this.deleteTransaction} transactions={this.state.transactions} />}/>
          <Route exact path="/opreations" render={() => <Operations updateData={this.updateTransactions} />} />
          <Route exact path="/categories" render={() => ( <TransactionCategories transactions={this.state.transactions} /> )} />
        </Router>
      </div>
    );
  }
}

export default App;
