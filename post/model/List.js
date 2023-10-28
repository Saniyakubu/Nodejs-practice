const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model('list', ListSchema);
