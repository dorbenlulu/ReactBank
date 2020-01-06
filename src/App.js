import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Transactions from "./Components/Transactions";
import Operations from "./Components/Operations";
import Loader from 'react-loader-spinner'
import axios from 'axios'

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

  updateTransactions = async (newTransactionToAdd) => {
    // const newTransactions = [...this.state.transactions]
    try {
      const response = await axios.post('http://localhost:4000/transaction', newTransactionToAdd)
      const newTransactions = response.data
      this.setState({transactions: newTransactions})
      console.log(newTransactions)
    } catch(err) {
      console.log(err)
    }
  }

  deleteTransaction = async (id) => {
    try{
      const response = await axios.delete(`http://localhost:4000/transaction/${id}`)
      const newTransactions = response.data
      this.setState({transactions: newTransactions})
      console.log(newTransactions)
    } catch(err) {
      console.log(err)
    }
  }

  componentDidMount = async () => {
    const response = await axios.get('http://localhost:4000/transactions')
    const transactions = response.data
    console.log('transactions are ', transactions)
    this.setState({transactions})
  }

  renderBank = () => {
    return(
      <>
        <div>Total Balance: {this.calculateTotalBalanace()}</div>
        <Transactions transactions={this.state.transactions} deleteTransaction={this.deleteTransaction} />
        <Operations updateData={this.updateTransactions}/>
      </>
    )
  }

  render() {
    return (
      <Router>
        {this.state.transactions ? this.renderBank() : <Loader type="TailSpin" color="lightblue" height={40} width={40} />}
      </Router>
    );
  }
}

export default App;
