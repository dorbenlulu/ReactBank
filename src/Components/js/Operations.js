import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    this.setState({ amount: "", vendor: "", category: "" });
  };

  render() {
    const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
    const operationsStyle = {
      position: "relative",
      top: "15vh",
      left: "30vw"
    };
    
    const operationsStyleSmallScreen = {
      position: "relative",
      top: "15vh",
      left: "20vw"
    };

    const textFieldsStyle = {
      backgroundColor: "white",
      borderRadius: "5px",
      width: "40vw"
    };

    const textFieldsStyleSmalScreen = {
      backgroundColor: "white",
      borderRadius: "5px"
    };

    return (
      <div style={isSmallScreen ? operationsStyleSmallScreen : operationsStyle}>
        <h2>Choose your operation</h2>
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="number"
          name="amount"
          placeholder="Amount"
          value={this.state.amount}
          style={isSmallScreen ? textFieldsStyleSmalScreen : textFieldsStyle}
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="vendor"
          placeholder="Vendor"
          value={this.state.vendor}
          style={isSmallScreen ? textFieldsStyleSmalScreen : textFieldsStyle}
          onChange={this.handleChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          name="category"
          placeholder="Category"
          value={this.state.category}
          style={isSmallScreen ? textFieldsStyleSmalScreen : textFieldsStyle}
          onChange={this.handleChange}
        />
        <div>
          <Link to="/transactions">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleClick("deposit")}
            >
              Deposit
            </Button>
          </Link>

          <Link to="/transactions">
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleClick("withdraw")}
              style={{ marginLeft: "0.5vw" }}
            >
              Withdraw
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Operations;
