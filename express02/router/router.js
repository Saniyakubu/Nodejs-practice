const express = require('express');
const router = express.Router();
// const ideas = require('../ideas');
const Ideas = require('../models/Idea');

router.get('/', async (req, res) => {
  try {
    const ideas = await Ideas.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: true, error: 'Something Went Wrong' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const singleIdea = await Ideas.findById(req.params.userId);
    res.json({ success: true, data: singleIdea });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: 'Something Went Wrong' });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const updateIdea = await Ideas.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          idea: req.body.idea,
          category: req.body.category,
        },
      },
      {
        new: true,
      }
    );
    res.json({ success: true, data: updateIdea });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: 'Something Went Wrong' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    await Ideas.findByIdAndDelete(req.params.userId);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: 'Something Went Wrong' });
  }
});

router.post('/', async (req, res) => {
  const idea = new Ideas({
    idea: req.body.idea,
    category: req.body.category,
    author: req.body.author,
  });

  try {
    const newIdea = await idea.save();
    res.json({ success: true, data: newIdea });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Something Went Wrong' });
  }
});

module.exports = router;
