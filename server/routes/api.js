const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    // console.log(transactions)
    if (transactions.length === 0) {
      throw "No transactions were found";
    }

    res.status(200).send(transactions);
  } catch (err) {
    {
      res.status(400).send(err);
    }
  }
});

router.post("/transaction", async (req, res) => {
  let transaction = req.body;
  console.log(transaction)
  const transactionToAdd = new Transaction(transaction);

  try {
    await transactionToAdd.save();
    console.log(transactionToAdd);
    const transactions = await Transaction.find({});
    res.status(200).send(transactions);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`id to delete is ${id}`)
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete({ _id: id });
    console.log(`deletedTransaction is ${deletedTransaction}`)
    const transactions = await Transaction.find({})
    res.status(200).send(transactions)
  } catch(err) {
    res.status(400).send(err)
  }

  // res.end()
  
});

// const insert = () => {
//     const transactions = [
//       { amount: 3200, vendor: "Elevation", category: "Salary" },
//       { amount: -7, vendor: "Runescape", category: "Entertainment" },
//       { amount: -20, vendor: "Subway", category: "Food" },
//       { amount: -98, vendor: "La Baguetterie", category: "Food" }
//     ];

//     transactions.forEach(transaction => {
//       const newTransaction = new Transaction(transaction);
//       newTransaction.save();
//     });
// };

// router.get('/', (req,res) => {
//     insert()
//     res.status(200).send('all ok')
// })

module.exports = router;
