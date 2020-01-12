import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  withdraw: {
      color: "red"
  },
  deposit: {
      color: "green"
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const tableStyle = {
    position: "relative",
    width: "50%",
    top: "25%", 
    left: "25%"
  }

  const tableSizeSmallScreen = {
    position: "relative",
    width: "99vw",
    top: "25vh",
    left: "1vw"
  }

  return (
    <TableContainer component={Paper} style={isSmallScreen ? tableSizeSmallScreen : tableStyle}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="left">Vendor</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map((transaction, index) => (
            <TableRow key={index} className={transaction.amount < 0 ? classes.withdraw : classes.deposit}>
              <TableCell  className={transaction.amount < 0 ? classes.withdraw : classes.deposit} >{transaction.vendor}</TableCell>
              <TableCell align="center" className={transaction.amount < 0 ? classes.withdraw : classes.deposit}>{props.formatter.format(transaction.amount)}</TableCell>
              <TableCell align="center" className={transaction.amount < 0 ? classes.withdraw : classes.deposit}>{transaction.category}</TableCell>
              <TableCell align="center" ><DeleteIcon onClick={() => {console.log(props); props.deleteTransaction(transaction._id)}} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}