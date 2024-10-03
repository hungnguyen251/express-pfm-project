const mongoose = require("mongoose");
const baseSchema = require("./baseSchema");
const Schema = mongoose.Schema;
const { TRANSACTION_TYPES } = require("../config/constants");

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  type: {
    type: String,
    enum: TRANSACTION_TYPES,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: { type: String },
  ...baseSchema,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
