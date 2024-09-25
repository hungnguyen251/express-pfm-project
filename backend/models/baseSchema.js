const mongoose = require('mongoose');

const baseSchema = {
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

module.exports = baseSchema;