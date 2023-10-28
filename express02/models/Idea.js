const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  idea: {
    type: String,
    require: [true, 'please fill in the form'],
  },
  category: {
    type: String,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model('ideas', IdeaSchema);
