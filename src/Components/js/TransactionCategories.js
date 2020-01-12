import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  withdraw: {
    textcolor: "red"
  },
  deposit: {
    textcolor: "green"
  }
});

const TransactionCategories = (props) => {
  const classes = useStyles();

  const tableStyle = {
    position: "relative",
    width: "50%",
    top: "25%", 
    left: "25%"
  }
  const categories = {};
    props.transactions.forEach(transaction => {
      if (categories[transaction.category]) {
        categories[transaction.category] += transaction.amount;
      } else {
        categories[transaction.category] = transaction.amount;
      }
    });

    const categoriesKeys = Object.keys(categories);
  
    
    console.log("cateogries are ", categories);
    return (
          <TableContainer component={Paper} style={tableStyle}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="left">Category</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesKeys.map((key, index) => (
                <TableRow key={index} >
                  <TableCell  className={categories[key] < 0 ? classes.withdraw : classes.deposit} >
                  {key}
                  </TableCell>
                  <TableCell align="center" className={categories[key] < 0 ? classes.withdraw : classes.deposit}>{categories[key]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
  
}

export default TransactionCategories;
