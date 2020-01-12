import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      transactions: null,
      formatter:new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
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
    try {
      const response = await axios.get("http://localhost:4000/transactions");
      const transactions = response.data;
      console.log("transactions are ", transactions);
      this.setState({ transactions });
    } catch (err) {
      console.log(err)
    }
  };

  renderBank = () => { 
    console.log(this.calculateTotalBalanace().toString().toLocaleString('en-US'))
    const totalBalance = this.calculateTotalBalanace()
    return (
      <>
        <Transactions transactions={this.state.transactions}  deleteTransaction={this.deleteTransaction}  formatter={this.state.formatter}/>
        <div id='total-balance'>Total Balance: {this.state.formatter.format(totalBalance)}</div>
      </>
    );
  };

  checkWhatComponentToRender = () => {
    if(!this.state.transactions) {
      return this.renderLoader()
    } else if(this.state.transactions.length === 0) {
      return this.renderNoTransactionsMessage()
    } else {
      return this.renderBank()
    }
  }

  renderLoader = () => <Loader type="TailSpin" color="lightblue" height={40} width={40} />

  renderNoTransactionsMessage = () => 
    <div id='no-transactions-msg'>
      No transactions were added yet.
      <br />
      You can add a new one in "Operations" tab above.
    </div>
    
  render() {
    return (
      <div id="container">
        <Router>
          <Header />
          <Route exact path="/" render={() => this.checkWhatComponentToRender()}/>
          <Route exact path="/transactions" render={() => <Transactions  deleteTransaction={this.deleteTransaction} transactions={this.state.transactions} formatter={this.state.formatter}/>}/>
          <Route exact path="/opreations" render={() => <Operations updateData={this.updateTransactions} />} />
          <Route exact path="/categories" render={() => ( <TransactionCategories transactions={this.state.transactions} calculateTotal={this.calculateTotalBalanace} formatter={this.state.formatter} /> )} />
        </Router>
      </div>
    );
  }
}

export default App;
