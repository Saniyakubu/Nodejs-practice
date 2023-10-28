const express = require('express');
const router = express.Router();
// const Data = require('../Data');
const ListData = require('../model/List');

// get all users
router.get('/', async (req, res) => {
  try {
    const list = await ListData.find();
    return res.json({ success: true, data: list });
  } catch (error) {
    return res.json({ success: false, data: 'Something Went Wrong' });
  }
});

router.get('/:listId', async (req, res) => {
  try {
    const singleList = await ListData.findById(req.params.listId);
    return res.json({ success: true, data: singleList });
  } catch (error) {
    return res.json({ success: false, data: 'Something Went Wrong' });
  }
});

router.put('/:listId', async (req, res) => {
  try {
    const singleList = await ListData.findByIdAndUpdate(
      req.params.listId,
      {
        $set: {
          task: req.body.task,
          completed: req.body.completed,
        },
      },
      {
        new: true,
      }
    );
    return res.json({ success: true, data: singleList });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: 'something went wrong' });
  }
});

router.delete('/:listId', async (req, res) => {
  try {
    await ListData.findByIdAndDelete(req.params.listId);
    return res.json({ success: true, data: {} });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: 'something went wrong' });
  }
});

router.post('/', async (req, res) => {
  const newList = new ListData({
    task: req.body.task,
    completed: req.body.completed,
  });

  try {
    const newListRes = await newList.save();
    return res.json({ success: true, data: newListRes });
  } catch (error) {
    return res.json({ success: false, data: 'Something went wrong' });
  }
});

// // get all users
// router.get('/', (req, res) => {
//   return res.json({ success: true, data: Data });
// });
// get single user by id
// router.get('/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const singleUser = Data.find((user) => user.id === +userId);
//   if (!singleUser) {
//     return res.status(500).json({ success: false, error: 'No User' });
//   }
//   return res.json({ success: true, data: singleUser });
// });
// // edit user info
// router.put('/:userId', (req, res) => {
//   const userId = req.params.userId;
//   let singleUser = Data.find((user) => user.id === +userId);
//   if (!singleUser) {
//     return res.status(500).json({ success: false, error: 'No User' });
//   }
//   singleUser.idea = req.body.idea || singleUser.idea;
//   singleUser.category = req.body.category || singleUser.category;
//   if (!singleUser.idea || singleUser.category) {
//     return res.status(500).json({
//       success: false,
//       error: 'You are not allowed to adit this',
//     });
//   }
//   return res.json({ success: true, data: singleUser });
// });
// // delete user
// router.delete('/:userId', (req, res) => {
//   const userId = req.params.userId;
//   const singleUser = Data.find((user) => user.id === +userId);
//   if (!singleUser) {
//     return res.status(500).json({ success: false, error: 'No User' });
//   }
//   let index = Data.indexOf(singleUser);
//   Data.splice(index, 1);
//   return res.json({ success: true, data: {} });
// });

// router.post('/', (req, res) => {
//   console.log(req.body);

//   const text = req.body.text;

//   if (!text) {
//     return res
//       .status(404)
//       .json({ success: false, error: 'something Went Wrong' });
//   }
//   return res.json({ success: true, name: text });
// });

module.exports = router;
